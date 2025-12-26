import { Zap, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { DailyStreakTrackerProps } from "@/types/rewardHub";
const DailyStreakTracker = ({
  streak,
  daysOfWeek,
  onClaimPoints,
  isLoading,
  canClaim,
}: DailyStreakTrackerProps) => {
  return (
    <Card className="w-full overflow-hidden rounded-xl border-0 p-0">
      <div className="bg-paleBlue px-6 pt-4 pb-5">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-blue-400" />
          <span className="font-semibold text-gray-700">Daily Streak</span>
        </div>
      </div>

      <div className="bg-white px-6 pt-5 pb-6 space-y-5">
        <div className="text-start">
          <div className="text-4xl font-bold text-blueViolet">
            {streak} {streak === 1 ? "day" : "day"}
          </div>
        </div>

        <div className="flex justify-between gap-2">
          {daysOfWeek.map((day, index) => (
            <div
              key={index}
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                day.completed
                  ? "bg-blueViolet text-white"
                  : day.isToday
                  ? "bg-white border-2 border-blueViolet text-blueViolet"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {day.label}
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-gray-600">
          Check in daily to earn +5 points
        </p>

        <Button
          className="w-full bg-blueViolet hover:bg-purpleBlue text-white rounded-full cursor-pointer disabled:opacity-50 py-6 font-semibold"
          onClick={onClaimPoints}
          disabled={!canClaim || isLoading}
        >
          <Zap className="h-5 w-5 mr-2 fill-white" />
          {isLoading
            ? "Claiming..."
            : canClaim
            ? "Claim Today's Points"
            : "Claimed Today"}
        </Button>
      </div>
    </Card>
  );
};

export default DailyStreakTracker;
