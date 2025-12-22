import { Star } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import type { PointsBalanceProps } from "@/types/rewardHub";

const PointsBalance = ({ points, target, nextReward }: PointsBalanceProps) => {
  const progress = (points / target) * 100;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Star className="h-5 w-5 text-purple-500" />
        <span className="font-medium">Points Balance</span>
      </div>

      <div className="flex items-end gap-2">
        <div className="text-5xl font-bold text-foreground">{points}</div>
        <div className="h-10 w-10 rounded-full bg-yellow-400 mb-1" />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">
            Progress to {nextReward}
          </span>
          <span className="font-medium">
            {points}/{target}
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <p className="text-sm text-muted-foreground flex items-center gap-1">
        <span className="text-purple-500">✓</span>
        Just getting started — keep earning points
      </p>
    </div>
  );
};

export default PointsBalance;
