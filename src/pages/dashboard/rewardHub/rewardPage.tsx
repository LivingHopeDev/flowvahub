import { useState } from "react";
import { Star, Share2, Gift, Copy, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PointsBalance from "./_components/pointBalance";
import DailyStreakTracker from "./_components/dailyStreakTracker";
import SpotlightCard from "./_components/spotlight";
const RewardsPage = () => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("earn");

  const daysOfWeek = [
    { label: "M", completed: true },
    { label: "T", completed: false },
    { label: "W", completed: false },
    { label: "T", completed: false },
    { label: "F", completed: true },
    { label: "S", completed: true },
  ];

  const handleCopyLink = () => {
    navigator.clipboard.writeText(
      "https://app.flowuin.com/signup?ref=sarah123"
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="earn" className="flex-1 sm:flex-initial">
            Earn Points
          </TabsTrigger>
          <TabsTrigger value="redeem" className="flex-1 sm:flex-initial">
            Redeem Rewards
          </TabsTrigger>
        </TabsList>

        <TabsContent value="earn" className="space-y-6 mt-6">
          <div>
            <h2 className="text-lg font-semibold mb-4">Your Rewards Journey</h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <PointsBalance
                    points={10}
                    target={5000}
                    nextReward="$5 Gift Card"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <DailyStreakTracker streak={2} daysOfWeek={daysOfWeek} />
                </CardContent>
              </Card>
              <SpotlightCard />
            </div>
          </div>

          {/* Earn More Points */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Earn More Points</h2>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
                    <Star className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold mb-1">
                      Refer and win 10,000 points!
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Invite 3 friends by Nov 20 and earn a chance to be one of
                      5 winners of{" "}
                      <span className="text-purple-600 font-medium">
                        10,000 points
                      </span>
                      . Friends must complete onboarding to qualify.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Refer & Earn */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Refer & Earn</h2>

            <Card>
              <CardContent className="pt-6 space-y-6">
                {/* Share Your Link */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Share2 className="h-5 w-5 text-purple-500" />
                    <h3 className="font-semibold">Share Your Link</h3>
                    <span className="text-sm text-muted-foreground ml-auto">
                      Earn +25 pts
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1 bg-muted rounded-lg p-3 text-sm font-mono break-all">
                      https://app.flowuin.com/signup?ref=sarah123
                    </div>
                    <Button
                      onClick={handleCopyLink}
                      variant="outline"
                      className="sm:w-auto"
                    >
                      {copied ? (
                        <>
                          <Check className="h-4 w-4 mr-2" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4 mr-2" />
                          Copy
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                {/* Share Your Stack */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Gift className="h-5 w-5 text-purple-500" />
                      <h3 className="font-semibold">Share Your Stack</h3>
                      <span className="text-sm text-muted-foreground">
                        Earn +10 pts
                      </span>
                    </div>
                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Share your tool stack
                  </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div className="text-center">
                    <div className="text-3xl font-bold">0</div>
                    <div className="text-sm text-muted-foreground">
                      Referrals
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold">0</div>
                    <div className="text-sm text-muted-foreground">
                      Points Earned
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="redeem" className="mt-6">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-12">
                <Gift className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">Redeem Rewards</h3>
                <p className="text-muted-foreground">
                  Start earning points to unlock amazing rewards!
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RewardsPage;
