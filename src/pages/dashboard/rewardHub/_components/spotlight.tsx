import { Calendar, UserRoundPlus, Gift } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

const SpotlightCard = () => {
  return (
    <Card className="border-0 overflow-hidden p-0">
      <div className="bg-linear-to-br from-blueViolet to-blue-400 text-white pt-6 px-2 pb-6">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-xs font-semibold bg-white/30 px-3 py-1 rounded-full inline-block">
              Featured
            </span>
            <h3 className="text-2xl font-bold mt-3">Top Tool Spotlight</h3>
            <p className="text-lg font-semibold mt-1">Reclaim</p>
          </div>
          <div className="h-14 w-14 rounded-full bg-white/30 flex items-center justify-center shrink-0">
            <div className="relative">
              <div className="flex gap-1">
                <div className="h-3 w-3 rounded-full bg-red-400"></div>
                <div className="h-3 w-3 rounded-full bg-blue-500"></div>
              </div>
              <div className="flex gap-1 mt-1">
                <div className="h-3 w-3 rounded-full bg-white"></div>
                <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-2 bg-white">
        <div className="mb-6">
          <div className="flex items-start gap-3">
            <Calendar className="h-6 w-6 text-blueViolet shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold text-base mb-2 text-gray-900">
                Automate and Optimize Your Schedule
              </h4>
              <p className="text-sm leading-relaxed text-gray-600">
                Reclaim.ai is an AI-powered calendar assistant that
                automatically schedules your tasks, meetings, and breaks to
                boost productivity. Free to try — earn Flowva Points when you
                sign up!
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-3 border-t pt-2">
          <Link to="https://go.reclaim.ai/ur9i6g5eznps">
            <Button className="flex-1 bg-blueViolet hover:bg-purpleBlue text-white rounded-full font-semibold py-5 border-0">
              <UserRoundPlus className="h-4 w-4" />
              Sign up
            </Button>
          </Link>
          <Button className="flex-1 bg-linear-to-r from-blueViolet to-pink-500  hover:bg-pink-600 text-white rounded-full font-semibold py-5 border-0">
            <Gift className="h-4 w-4" />
            Claim 50 pts
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default SpotlightCard;
