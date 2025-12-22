import { Star, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { DailyStreakTrackerProps } from "@/types/rewardHub";
const DailyStreakTracker = ({
  streak,
  daysOfWeek,
}: DailyStreakTrackerProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-blue-500" />
          <span className="font-medium">Daily Streak</span>
        </div>
      </div>

      <div className="text-center">
        <div className="text-4xl font-bold text-blue-500">{streak} days</div>
      </div>

      <div className="flex justify-center gap-2">
        {daysOfWeek.map((day, index) => (
          <div
            key={index}
            className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-medium
              ${
                day.completed
                  ? "bg-blue-500 text-white"
                  : "bg-muted text-muted-foreground"
              }
            `}
          >
            {day.label}
          </div>
        ))}
      </div>

      <p className="text-center text-sm text-muted-foreground">
        Check in daily to earn +5 points
      </p>

      <Button className="w-full bg-purple-600 hover:bg-purple-700">
        <Star className="h-4 w-4 mr-2" />
        Claim Today's Points
      </Button>
    </div>
  );
};

export default DailyStreakTracker;
