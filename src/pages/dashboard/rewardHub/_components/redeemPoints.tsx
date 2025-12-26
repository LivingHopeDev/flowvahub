import { Gift, CreditCard, Banknote } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Reward {
  id: string;
  icon: "bank" | "paypal" | "visa";
  title: string;
  description: string;
  points_required: number;
  status: "locked" | "unlocked" | "coming-soon";
}

interface RedeemPointsProps {
  rewards: Reward[];
  onRedeem: (rewardId: string) => void;
}

const RedeemPoints = ({ rewards, onRedeem }: RedeemPointsProps) => {
  const getIcon = (iconType: string) => {
    const iconMap = {
      bank: Banknote,
      paypal: CreditCard,
      visa: Gift,
    };
    const Icon = iconMap[iconType as keyof typeof iconMap] || Gift;
    return <Icon className="h-6 w-6 text-purple-600" />;
  };

  const allRewardsCount = rewards.length;
  const unlockedCount = rewards.filter((r) => r.status === "unlocked").length;
  const lockedCount = rewards.filter((r) => r.status === "locked").length;
  const comingSoonCount = rewards.filter(
    (r) => r.status === "coming-soon"
  ).length;

  return (
    <section>
      <h2 className="text-lg sm:text-xl font-bold mb-4 text-gray-900 border-l-4 border-purple-600 pl-3">
        Redeem Your Points
      </h2>

      {/* Tabs */}
      <Tabs defaultValue="all" className="mb-6">
        <TabsList className="bg-transparent border-b border-gray-200 rounded-none w-full justify-start h-auto p-0">
          <TabsTrigger
            value="all"
            className="data-[state=active]:border-b-2 data-[state=active]:border-purple-600 data-[state=active]:text-purple-600 rounded-none bg-transparent px-4 py-2 data-[state=active]:bg-transparent"
          >
            All Rewards
            <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-purple-100 text-purple-600">
              {allRewardsCount}
            </span>
          </TabsTrigger>
          <TabsTrigger
            value="unlocked"
            className="data-[state=active]:border-b-2 data-[state=active]:border-purple-600 data-[state=active]:text-purple-600 rounded-none bg-transparent px-4 py-2 data-[state=active]:bg-transparent"
          >
            Unlocked
            <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600">
              {unlockedCount}
            </span>
          </TabsTrigger>
          <TabsTrigger
            value="locked"
            className="data-[state=active]:border-b-2 data-[state=active]:border-purple-600 data-[state=active]:text-purple-600 rounded-none bg-transparent px-4 py-2 data-[state=active]:bg-transparent"
          >
            Locked
            <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600">
              {lockedCount}
            </span>
          </TabsTrigger>
          <TabsTrigger
            value="coming-soon"
            className="data-[state=active]:border-b-2 data-[state=active]:border-purple-600 data-[state=active]:text-purple-600 rounded-none bg-transparent px-4 py-2 data-[state=active]:bg-transparent"
          >
            Coming Soon
            <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600">
              {comingSoonCount}
            </span>
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Rewards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rewards.map((reward) => (
          <Card
            key={reward.id}
            className="overflow-hidden rounded-xl border border-gray-200 p-0"
          >
            <div className="bg-white px-6 py-8 text-center space-y-4">
              {/* Icon */}
              <div className="flex justify-center">
                <div className="h-16 w-16 rounded-2xl bg-purple-100 flex items-center justify-center">
                  {getIcon(reward.icon)}
                </div>
              </div>

              {/* Title */}
              <h3 className="font-semibold text-base text-gray-900">
                {reward.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-600 leading-relaxed">
                {reward.description}
              </p>

              {/* Points */}
              <div className="flex items-center justify-center gap-1 text-purple-600 font-semibold">
                <span className="text-yellow-500">⭐</span>
                <span>{reward.points_required} pts</span>
              </div>

              {/* Action Button */}
              {reward.status === "locked" ? (
                <Button
                  disabled
                  className="w-full bg-gray-200 text-gray-400 rounded-lg py-5 cursor-not-allowed hover:bg-gray-200"
                >
                  Locked
                </Button>
              ) : reward.status === "unlocked" ? (
                <Button
                  onClick={() => onRedeem(reward.id)}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-lg py-5"
                >
                  Redeem
                </Button>
              ) : (
                <Button
                  disabled
                  className="w-full bg-gray-200 text-gray-400 rounded-lg py-5 cursor-not-allowed hover:bg-gray-200"
                >
                  Coming Soon
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default RedeemPoints;
