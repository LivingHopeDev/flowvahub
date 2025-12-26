import { create } from "zustand";
import { supabase } from "@/config/client";
import type {
  ReferralStats,
  RedemptionFilters,
  Rewards,
  RewardsStore,
} from "@/types/rewardHub";

const useRewardsStore = create<RewardsStore>((set, get) => ({
  rewardsCatalog: [],
  userRedemptions: [],
  redemptionFilters: {
    all: 0,
    unlocked: 0,
    locked: 0,
    comingSoon: 0,
  },
  rewards: null,
  referralStats: { count: 0, pointsEarned: 0 },
  recentTransactions: [],
  loading: false,
  error: null,

  fetchRewardsData: async (userId) => {
    set({ loading: true, error: null });

    try {
      const { data: rewards, error: rewardsError } = await supabase
        .from("rewards")
        .select("*")
        .eq("user_id", userId)
        .single();

      if (rewardsError && rewardsError.code !== "PGRST116") {
        throw rewardsError;
      }

      if (!rewards) {
        const { data: newRewards, error: createError } = await supabase
          .from("rewards")
          .insert([{ user_id: userId }])
          .select()
          .single();

        if (createError) throw createError;

        set({ rewards: newRewards, loading: false });
        return;
      }

      const { data: referrals, error: referralsError } = await supabase
        .from("referrals")
        .select("*")
        .eq("referrer_id", userId);

      if (referralsError) throw referralsError;

      const referralStats: ReferralStats = {
        count: referrals?.length ?? 0,
        pointsEarned:
          (referrals?.filter((r) => r.points_awarded).length ?? 0) * 25,
      };

      const { data: transactions, error: transactionsError } = await supabase
        .from("point_transactions")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(10);

      if (transactionsError) throw transactionsError;

      set({
        rewards,
        referralStats,
        recentTransactions: transactions ?? [],
        loading: false,
      });
    } catch (error: unknown) {
      console.error("Error fetching rewards:", error);
      set({
        error: error instanceof Error ? error.message : "Unknown error",
        loading: false,
      });
    }
  },
  fetchUserProfile: async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error fetching profile:", error);
      return null;
    }
  },
  handleDailyCheckIn: async (userId) => {
    set({ loading: true, error: null });

    try {
      const { data, error } = await supabase.rpc("handle_daily_checkin", {
        p_user_id: userId,
      });

      if (error) throw error;

      if (data?.success) {
        await get().fetchRewardsData(userId);
        return { success: true, message: data.message };
      }

      return { success: false, message: data?.message };
    } catch (error: unknown) {
      console.error("Error with daily check-in:", error);
      set({
        error: error instanceof Error ? error.message : "Unknown error",
        loading: false,
      });
      return { success: false, message: "Check-in failed" };
    }
  },

  handleShareStack: async (userId) => {
    set({ loading: true, error: null });

    try {
      const pointsToAward = 25;
      const currentPoints = get().rewards?.total_points ?? 0;

      const { error: shareError } = await supabase
        .from("user_shares")
        .insert([{ user_id: userId, share_type: "tool_stack" }]);

      if (shareError) throw shareError;

      const { error: updateError } = await supabase
        .from("rewards")
        .update({ total_points: currentPoints + pointsToAward })
        .eq("user_id", userId);

      if (updateError) throw updateError;

      const { error: transactionError } = await supabase
        .from("point_transactions")
        .insert([
          {
            user_id: userId,
            points: pointsToAward,
            transaction_type: "share_stack",
            description: "Shared tool stack",
          },
        ]);

      if (transactionError) throw transactionError;

      await get().fetchRewardsData(userId);

      return { success: true, pointsEarned: pointsToAward };
    } catch (error: unknown) {
      console.error("Error sharing stack:", error);
      set({
        error: error instanceof Error ? error.message : "Unknown error",
        loading: false,
      });
      return { success: false, message: "Share failed" };
    }
  },

  subscribeToRewards: (userId) => {
    const channel = supabase
      .channel("rewards_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "rewards",
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          set({ rewards: payload.new as Rewards });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  },

  fetchRewardsCatalog: async () => {
    try {
      const { data: catalog, error } = await supabase
        .from("rewards_catalog")
        .select("*")
        .order("points_required", { ascending: true });

      if (error) throw error;

      const currentPoints = get().rewards?.total_points ?? 0;

      const filters: RedemptionFilters = {
        all: catalog.length,
        unlocked: catalog.filter(
          (r) => r.status === "unlocked" && r.points_required <= currentPoints
        ).length,
        locked: catalog.filter((r) => r.status === "locked").length,
        comingSoon: catalog.filter((r) => r.status === "coming-soon").length,
      };

      set({
        rewardsCatalog: catalog,
        redemptionFilters: filters,
      });
    } catch (error) {
      console.error("Error fetching rewards catalog:", error);
    }
  },

  fetchUserRedemptions: async (userId) => {
    try {
      const { data, error } = await supabase
        .from("reward_redemptions")
        .select(`*, reward:rewards_catalog(*)`)
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) throw error;

      set({ userRedemptions: data ?? [] });
    } catch (error) {
      console.error("Error fetching redemptions:", error);
    }
  },

  redeemReward: async (userId, rewardId, redemptionDetails = {}) => {
    set({ loading: true, error: null });

    try {
      const { data, error } = await supabase.rpc("redeem_reward", {
        p_user_id: userId,
        p_reward_id: rewardId,
        p_redemption_details: redemptionDetails,
      });

      if (error) throw error;

      if (!data?.success) {
        return { success: false, message: data?.message };
      }

      await get().fetchRewardsData(userId);
      await get().fetchRewardsCatalog();
      await get().fetchUserRedemptions(userId);

      set({ loading: false });
      return { success: true, message: "Reward redeemed successfully!" };
    } catch (error: unknown) {
      set({
        error: error instanceof Error ? error.message : "Unknown error",
        loading: false,
      });
      return { success: false, message: "Redemption failed" };
    }
  },

  reset: () =>
    set({
      rewards: null,
      referralStats: { count: 0, pointsEarned: 0 },
      recentTransactions: [],
      loading: false,
      error: null,
    }),
}));

export default useRewardsStore;
