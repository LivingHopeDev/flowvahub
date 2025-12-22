import { Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
const SpotlightCard = () => {
  return (
    <Card className="bg-linear-to-br from-purple-500 to-blue-500 text-white border-0">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <span className="text-xs font-semibold bg-white/20 px-2 py-1 rounded">
              Featured
            </span>
            <h3 className="text-xl font-bold mt-2">Top Tool Spotlight</h3>
            <p className="text-sm mt-1">Reclaim</p>
          </div>
          <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center">
            <Calendar className="h-6 w-6" />
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-4">
          <p className="text-sm">
            Reclaim is an AI-powered calendar assistant that automatically
            schedules your tasks, meetings, and breaks to boost productivity.
            Free to try!
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="secondary"
            className="flex-1 bg-white text-purple-600 hover:bg-white/90"
          >
            Sign up
          </Button>
          <Button
            variant="outline"
            className="flex-1 border-white text-white hover:bg-white/10"
          >
            Claim 50 pts
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SpotlightCard;
