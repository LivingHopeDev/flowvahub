import { useState, useEffect } from "react";
import { Star, Share2, Copy, Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useAuthStore } from "@/store/auth.store";
import useRewardsStore from "@/store/reward.store";
import PointsBalance from "./_components/pointBalance";
import DailyStreakTracker from "./_components/dailyStreakTracker";
import SpotlightCard from "./_components/spotlight";
import { getLast7Days, canClaimToday } from "@/lib/utils";
import type { Profile } from "@/types/rewardHub";
import { LevelUpModal } from "./levelUpModal";
import RedeemPoints from "./_components/redeemPoints";
const RewardsPage = () => {
  const [copied, setCopied] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState("earn");
  const [profile, setProfile] = useState<Profile | null>(null);
  const [redeeming, setRedeeming] = useState(false);
  const [claiming, setClaiming] = useState<boolean>(false);
  const [openLevelUpModal, setOpenLevelUpModal] = useState<boolean>(false);
  const { user } = useAuthStore();
  const {
    rewards,
    referralStats,
    loading,
    fetchRewardsData,
    fetchUserProfile,
    handleDailyCheckIn,
    subscribeToRewards,
    fetchRewardsCatalog,
    rewardsCatalog,
    fetchUserRedemptions,
    userRedemptions,
    redeemReward,
  } = useRewardsStore();
  useEffect(() => {
    if (!user) return;

    const loadData = async () => {
      await fetchRewardsData(user.id);
      await fetchRewardsCatalog();
      await fetchUserRedemptions(user.id);
      const userProfile = await fetchUserProfile(user.id);
      setProfile(userProfile);
    };

    loadData();
    const unsubscribe = subscribeToRewards(user.id);
    return () => unsubscribe();
  }, [user]);
  const handleClaimPoints = async () => {
    if (!user || claiming) return;

    setClaiming(true);
    try {
      const result = await handleDailyCheckIn(user.id);

      if (result.success) {
        setOpenLevelUpModal(true);
      } else {
        toast.info(result.message || "Already claimed today");
      }
    } catch (error) {
      toast.error("Failed to claim points", {
        description: "Please try again later",
      });
    } finally {
      setClaiming(false);
    }
  };

  const handleCopyLink = () => {
    if (!profile?.referral_code) return;

    const referralLink = `${window.location.origin}/signup?ref=${profile.referral_code}`;
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    toast.success("Link copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };
  const handleRedeemReward = async (rewardId: string) => {
    if (!user || redeeming) return;

    setRedeeming(true);
    try {
      const result = await redeemReward(user.id, rewardId);

      if (result.success) {
        toast.success(" Reward Redeemed!");
        await fetchRewardsData(user.id);
        await fetchRewardsCatalog();
        await fetchUserRedemptions(user.id);
      } else {
        toast.error("Redemption Failed");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setRedeeming(false);
    }
  };

  const daysOfWeek = getLast7Days(rewards?.last_check_in || null);
  const canClaim = canClaimToday(rewards?.last_check_in || null);
  const referralLink = profile?.referral_code
    ? `${window.location.origin}/signup?ref=${profile.referral_code}`
    : "";
  const handleSocialShare = (socialMedia: string) => {
    console.log(socialMedia);
  };

  if (loading && !rewards) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blueViolet"></div>
      </div>
    );
  }
  return (
    <div className="w-full min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex border-b justify-start gap-2 px-4 mb-6">
          <button
            onClick={() => setActiveTab("earn")}
            className={`px-4 sm:px-6 py-3 rounded-t-xl  sm:py-4 text-sm sm:text-base font-medium transition-colors whitespace-nowrap ${
              activeTab === "earn"
                ? "text-blueViolet border-b-2 border-blueViolet bg-purple-50"
                : "text-gray-600 hover:text-gray-900 hover:bg-paleBlue"
            }`}
          >
            Earn Points
          </button>

          <button
            onClick={() => setActiveTab("redeem")}
            className={`px-4 sm:px-6 py-3 rounded-t-xl sm:py-4 text-sm sm:text-base font-medium transition-colors whitespace-nowrap ${
              activeTab === "redeem"
                ? "text-blueViolet border-b-2 border-blueViolet bg-purple-50"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            }`}
          >
            Redeem Rewards
          </button>
        </div>

        {activeTab === "earn" ? (
          <div className="space-y-6 sm:space-y-8 px-4">
            <section>
              <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-900 border-l-4 border-blueViolet pl-3">
                Your Rewards Journey
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <PointsBalance
                  points={rewards?.total_points || 0}
                  target={5000}
                  nextReward="$5 Gift Card"
                />
                <DailyStreakTracker
                  streak={rewards?.current_streak || 0}
                  daysOfWeek={daysOfWeek}
                  onClaimPoints={handleClaimPoints}
                  isLoading={claiming}
                  canClaim={canClaim}
                />
                <SpotlightCard />
              </div>
            </section>
            <section>
              <h2 className="text-lg sm:text-xl font-bold mb-4 text-gray-900 border-l-4 border-blueViolet pl-3">
                Earn More Points
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <Card className="overflow-hidden rounded-xl border border-gray-200 p-0">
                  <div className="bg-white px-6 pt-4 pb-3">
                    <div className="flex items-start gap-3">
                      <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center shrink-0">
                        <Star className="h-6 w-6 text-blueViolet" />
                      </div>
                      <h3 className="font-semibold text-base leading-tight pt-1">
                        Refer and win 10,000 points!
                      </h3>
                    </div>
                  </div>

                  <div className="bg-gray-50 px-6 py-4">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Invite 3 friends by Nov 20 and earn a chance to be one of
                      5 winners of{" "}
                      <span className="text-blueViolet font-semibold">
                        10,000 points
                      </span>
                      . Friends must complete onboarding to qualify.
                    </p>
                  </div>
                </Card>

                <Card className="overflow-hidden rounded-xl border border-gray-200 p-0">
                  <div className="bg-white px-6 pt-4 pb-3">
                    <div className="flex items-start gap-3">
                      <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center shrink-0">
                        <Share2 className="h-6 w-6 text-blueViolet" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-base">
                          Share Your Stack
                        </h3>
                        <span className="text-sm text-gray-600">
                          Earn +25 pts
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 px-6 py-4">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm text-gray-700">
                        Share your tool stack
                      </p>

                      <Button className="rounded-full bg-white border border-purple-200 text-blueViolet hover:bg-blueViolet hover:text-white transition-colors px-4 py-2">
                        <Share2 className="h-4 w-4 mr-2" />
                        Share
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            </section>
            <section>
              <h2 className="text-lg sm:text-xl font-bold mb-4 text-gray-900 border-l-4 border-purple-600 pl-3">
                Refer & Earn
              </h2>

              <Card className="overflow-hidden rounded-xl border border-gray-200 p-0">
                <div className="bg-paleBlue px-6 py-4">
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-lg bg-white flex items-center justify-center shrink-0">
                      <Share2 className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-base">
                        Share Your Link
                      </h3>
                      <p className="text-sm text-gray-600">
                        Invite friends and earn 25 points when they join!
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white px-6 py-6">
                  <div className="grid grid-cols-2 gap-8 mb-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-purple-600">
                        {referralStats.count}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        Referrals
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-purple-600">
                        {referralStats.pointsEarned}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        Points Earned
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-medium text-gray-700">
                      Your personal referral link:
                    </label>
                    <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-4 py-3 bg-white">
                      <div className="flex-1 text-sm text-gray-700 truncate">
                        {referralLink || "Loading..."}
                      </div>
                      <Button
                        onClick={handleCopyLink}
                        variant="ghost"
                        size="sm"
                        disabled={!referralLink}
                        className="shrink-0 hover:bg-purple-50"
                      >
                        {copied ? (
                          <Check className="h-5 w-5 text-green-600" />
                        ) : (
                          <Copy className="h-5 w-5 text-purple-600" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-3 mt-6">
                    <button
                      onClick={() => handleSocialShare("facebook")}
                      className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center hover:bg-blue-700 transition-colors"
                      aria-label="Share on Facebook"
                    >
                      <svg
                        className="h-5 w-5 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleSocialShare("twitter")}
                      className="h-10 w-10 rounded-full bg-black flex items-center justify-center hover:bg-gray-800 transition-colors"
                      aria-label="Share on X"
                    >
                      <svg
                        className="h-5 w-5 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleSocialShare("linkedin")}
                      className="h-10 w-10 rounded-full bg-blue-700 flex items-center justify-center hover:bg-blue-800 transition-colors"
                      aria-label="Share on LinkedIn"
                    >
                      <svg
                        className="h-5 w-5 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleSocialShare("whatsapp")}
                      className="h-10 w-10 rounded-full bg-green-500 flex items-center justify-center hover:bg-green-600 transition-colors"
                      aria-label="Share on WhatsApp"
                    >
                      <svg
                        className="h-5 w-5 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </Card>
            </section>
          </div>
        ) : (
          <RedeemPoints
            rewards={rewardsCatalog}
            userPoints={rewards?.total_points || 0}
            userRedemptions={userRedemptions.map((r: any) => r.reward_id)}
            onRedeem={handleRedeemReward}
            isRedeeming={redeeming}
          />
        )}
      </div>
      <LevelUpModal
        open={openLevelUpModal}
        onOpenChange={() => setOpenLevelUpModal(false)}
      />
    </div>
  );
};

export default RewardsPage;
