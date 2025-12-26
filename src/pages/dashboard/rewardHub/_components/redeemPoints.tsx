import { Gift, CreditCard, Banknote } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

interface Reward {
  id: string;
  title: string;
  description: string;
  points_required: number;
  reward_type: string;
  status: "locked" | "unlocked" | "coming-soon";
  icon_emoji?: string;
}

interface RedeemPointsProps {
  rewards: Reward[];
  userPoints: number;
  userRedemptions: string[];
  onRedeem: (rewardId: string) => void;
  isRedeeming: boolean;
}

const RedeemPoints = ({
  rewards,
  userPoints,
  userRedemptions,
  onRedeem,
  isRedeeming,
}: RedeemPointsProps) => {
  const [activeTab, setActiveTab] = useState<string>("all");

  const getRewardDisplayStatus = (reward: Reward) => {
    if (userRedemptions.includes(reward.id)) return "redeemed";

    if (reward.status === "coming-soon") return "coming-soon";
    if (reward.status === "locked") return "locked";

    if (userPoints >= reward.points_required) return "can-redeem";
    return "insufficient-points";
  };

  const enrichedRewards = rewards.map((reward) => ({
    ...reward,
    displayStatus: getRewardDisplayStatus(reward),
  }));

  // Filter counts based on catalog status
  const allRewardsCount = enrichedRewards.length;
  const unlockedCount = enrichedRewards.filter(
    (r) => r.status === "unlocked" && r.displayStatus === "can-redeem"
  ).length;
  const lockedCount = enrichedRewards.filter(
    (r) => r.status === "locked"
  ).length;
  const comingSoonCount = enrichedRewards.filter(
    (r) => r.status === "coming-soon"
  ).length;

  const getIcon = (rewardType: string) => {
    const iconMap: Record<string, any> = {
      bank_transfer: Banknote,
      paypal: CreditCard,
      virtual_card: Gift,
      gift_card: Gift,
    };
    const Icon = iconMap[rewardType] || Gift;
    return <Icon className="h-6 w-6 text-blueViolet" />;
  };

  const filteredRewards = enrichedRewards.filter((reward) => {
    if (activeTab === "all") return true;
    if (activeTab === "unlocked") {
      return (
        reward.status === "unlocked" && reward.displayStatus === "can-redeem"
      );
    }
    if (activeTab === "locked") return reward.status === "locked";
    if (activeTab === "coming-soon") return reward.status === "coming-soon";
    return true;
  });

  return (
    <section className="px-4">
      <h2 className="text-lg sm:text-xl font-bold mb-4 text-gray-900 border-l-4 border-blueViolet pl-3">
        Redeem Your Points
      </h2>

      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value)}
        className="mb-6"
      >
        <TabsList className="bg-transparent border-b border-gray-200 rounded-none inline-flex justify-start h-auto p-0 w-fit">
          <TabsTrigger
            value="all"
            className="border-0 border-b-2 data-[state=active]:border-b-blueViolet data-[state=active]:text-blueViolet rounded-t-md rounded-b-none bg-transparent px-4 py-2 data-[state=active]:bg-purple-100 focus-visible:ring-0"
          >
            All Rewards
            <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-purple-100 text-blueViolet">
              {allRewardsCount}
            </span>
          </TabsTrigger>

          <TabsTrigger
            value="unlocked"
            className="border-0 border-b-2 data-[state=active]:border-b-blueViolet data-[state=active]:text-blueViolet rounded-t-md rounded-b-none bg-transparent px-4 py-2 data-[state=active]:bg-purple-100 focus-visible:ring-0"
          >
            Unlocked
            <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600">
              {unlockedCount}
            </span>
          </TabsTrigger>

          <TabsTrigger
            value="locked"
            className="border-0 border-b-2 data-[state=active]:border-b-blueViolet data-[state=active]:text-blueViolet rounded-t-md rounded-b-none bg-transparent px-4 py-2 data-[state=active]:bg-purple-100 focus-visible:ring-0"
          >
            Locked
            <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600">
              {lockedCount}
            </span>
          </TabsTrigger>

          <TabsTrigger
            value="coming-soon"
            className="border-0 border-b-2 data-[state=active]:border-b-blueViolet data-[state=active]:text-blueViolet rounded-t-md rounded-b-none bg-transparent px-4 py-2 data-[state=active]:bg-purple-100 focus-visible:ring-0"
          >
            Coming Soon
            <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600">
              {comingSoonCount}
            </span>
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {filteredRewards.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No rewards in this category</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRewards.map((reward) => (
            <Card
              key={reward.id}
              className="overflow-hidden rounded-xl border border-gray-200 p-0"
            >
              <div className="bg-white px-6 py-8 text-center space-y-4">
                <div className="flex justify-center">
                  <div className="h-16 w-16 rounded-2xl bg-purple-100 flex items-center justify-center">
                    {getIcon(reward.reward_type)}
                  </div>
                </div>

                <h3 className="font-semibold text-base text-gray-900">
                  {reward.title}
                </h3>

                <p className="text-sm text-gray-600 leading-relaxed">
                  {reward.description}
                </p>

                <div className="flex items-center justify-center gap-1 text-blueViolet font-semibold">
                  <span className="text-yellow-500">⭐</span>
                  <span>{reward.points_required.toLocaleString()} pts</span>
                </div>

                {reward.displayStatus === "redeemed" ? (
                  <Button
                    disabled
                    className="w-full bg-green-100 text-green-700 rounded-lg py-5 cursor-not-allowed hover:bg-green-100"
                  >
                    ✓ Redeemed
                  </Button>
                ) : reward.status === "locked" ? (
                  <Button
                    disabled
                    className="w-full bg-gray-200 text-gray-400 rounded-lg py-5 cursor-not-allowed hover:bg-gray-200"
                  >
                    🔒 Locked
                  </Button>
                ) : reward.status === "coming-soon" ? (
                  <Button
                    disabled
                    className="w-full bg-gray-200 text-gray-400 rounded-lg py-5 cursor-not-allowed hover:bg-gray-200"
                  >
                    Coming Soon
                  </Button>
                ) : reward.displayStatus === "can-redeem" ? (
                  <Button
                    onClick={() => onRedeem(reward.id)}
                    disabled={isRedeeming}
                    className="w-full bg-blueViolet hover:bg-purple-700 text-white rounded-lg py-5 disabled:opacity-50"
                  >
                    {isRedeeming ? "Redeeming..." : "Redeem Now"}
                  </Button>
                ) : (
                  <div className="space-y-2">
                    <Button
                      disabled
                      className="w-full bg-gray-300 text-gray-500 rounded-lg py-5 cursor-not-allowed hover:bg-gray-300"
                    >
                      Insufficient Points
                    </Button>
                    <p className="text-xs text-gray-500">
                      Need{" "}
                      {(reward.points_required - userPoints).toLocaleString()}{" "}
                      more points
                    </p>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
};

export default RedeemPoints;
