import { Award } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import type { PointsBalanceProps } from "@/types/rewardHub";

const PointsBalance = ({ points, target, nextReward }: PointsBalanceProps) => {
  const progress = (points / target) * 100;

  return (
    <Card className="relative w-full overflow-hidden rounded-lg">
      <div className="absolute inset-0">
        <div className="h-[20%] w-full bg-paleBlue" />
        <div className="h-[80%] w-full" />
      </div>

      <CardContent className="relative z-10 pt-3 pb-4 px-4 space-y-4">
        <div className="flex items-center gap-2">
          <Award className="h-8 w-8 text-blueViolet" />
          <span className="font-Bold">Points Balance</span>
        </div>

        <div className="flex items-end gap-2">
          <div className="text-5xl font-bold text-blueViolet">{points}</div>
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
          Just getting started — keep earning points
        </p>
      </CardContent>
    </Card>
  );
};

export default PointsBalance;
