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
