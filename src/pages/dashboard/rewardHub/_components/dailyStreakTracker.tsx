import { Star, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { DailyStreakTrackerProps } from "@/types/rewardHub";

const DailyStreakTracker = ({
  streak,
  daysOfWeek,
}: DailyStreakTrackerProps) => {
  return (
    <Card className="relative w-full overflow-hidden rounded-lg">
      {/* Top 20% background */}
      <div className="absolute inset-0">
        <div className="h-[20%] w-full bg-paleBlue" />
        <div className="h-[80%] w-full" />
      </div>

      {/* Content */}
      <CardContent className="relative z-10 pt-3 pb-4 px-4 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-blue-500" />
            <span className="font-medium">Daily Streak</span>
          </div>
        </div>

        <div className="text-start">
          <div className="text-4xl font-bold text-blueViolet">
            {streak} days
          </div>
        </div>

        <div className="flex justify-center gap-2">
          {daysOfWeek.map((day, index) => (
            <div
              key={index}
              className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-medium ${
                day.completed
                  ? "bg-gray-200 text-white"
                  : "bg-gray-200 border border-blueViolet text-muted-foreground"
              }`}
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
      </CardContent>
    </Card>
  );
};

export default DailyStreakTracker;
