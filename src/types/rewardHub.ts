export interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  showNotification?: boolean;
}

export interface DayOfWeek {
  label: string;
  completed: boolean;
}

export interface DailyStreakTrackerProps {
  streak: number;
  daysOfWeek: DayOfWeek[];
}

export interface PointsBalanceProps {
  points: number;
  target: number;
  nextReward: string;
}

export type Rewards = {
  id: string;
  user_id: string;
  total_points: number;
  current_streak: number;
  last_check_in: string | null;
  created_at: string;
  updated_at: string;
};

export type ReferralStats = {
  count: number;
  pointsEarned: number;
};

export type RedemptionFilters = {
  all: number;
  unlocked: number;
  locked: number;
  comingSoon: number;
};

export type RewardsStore = {
  rewardsCatalog: any[];
  userRedemptions: any[];
  redemptionFilters: RedemptionFilters;
  rewards: Rewards | null;
  referralStats: ReferralStats;
  recentTransactions: any[];
  loading: boolean;
  error: string | null;

  fetchRewardsData: (userId: string) => Promise<void>;
  handleDailyCheckIn: (userId: string) => Promise<any>;
  handleShareStack: (userId: string) => Promise<any>;
  subscribeToRewards: (userId: string) => () => void;
  fetchRewardsCatalog: (userId: string) => Promise<void>;
  fetchUserRedemptions: (userId: string) => Promise<void>;
  fetchUserProfile: (userId: string) => Promise<any>;
  redeemReward: (
    userId: string,
    rewardId: string,
    redemptionDetails?: Record<string, any>
  ) => Promise<any>;
  reset: () => void;
};
export interface Profile {
  id: string;
  user_id: string;
  name: string | null;
  email: string;
  role: string;
  referral_code: string;
  created_at: string;
}

export interface DayOfWeek {
  label: string;
  completed: boolean;
  date: Date;
  isToday: boolean;
}

export interface DailyStreakTrackerProps {
  streak: number;
  daysOfWeek: DayOfWeek[];
  onClaimPoints: () => Promise<void>;
  isLoading: boolean;
  canClaim: boolean;
}
