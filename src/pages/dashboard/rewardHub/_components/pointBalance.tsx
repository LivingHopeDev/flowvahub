import { Award } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import type { PointsBalanceProps } from "@/types/rewardHub";

const PointsBalance = ({ points, target, nextReward }: PointsBalanceProps) => {
  const progress = Math.min((points / target) * 100, 100);

  return (
    <Card className="w-full overflow-hidden rounded-xl border-0 p-0">
      <div className="bg-paleBlue px-6 pt-4 pb-5">
        <div className="flex items-center gap-2">
          <Award className="h-6 w-6 text-purple-600" />
          <span className="font-semibold text-gray-700">Points Balance</span>
        </div>
      </div>

      <div className="bg-white px-6 pt-5 pb-6 space-y-5">
        <div className="flex items-end gap-2">
          <div className="text-5xl font-bold text-purple-600">
            {points.toLocaleString()}
          </div>
          <div className="h-10 w-10 rounded-full bg-yellow-400 mb-1" />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Progress to {nextReward}</span>
            <span className="font-medium text-gray-700">
              {points.toLocaleString()}/{target.toLocaleString()}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <p className="text-sm text-gray-600 flex items-center gap-1">
          {points === 0
            ? "Just getting started — keep earning points!"
            : points >= target
            ? " You've reached your goal!"
            : "Keep going — you're making progress!"}
        </p>
      </div>
    </Card>
  );
};

export default PointsBalance;
