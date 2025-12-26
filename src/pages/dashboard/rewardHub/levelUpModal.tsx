import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LevelUpModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const LevelUpModal = ({ open, onOpenChange }: LevelUpModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm rounded-2xl p-6">
        <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none">
          <X className="h-4 w-4" />
        </DialogClose>

        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border-4 border-green-500/20">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500">
            <Check className="h-6 w-6 text-white" strokeWidth={3} />
          </div>
        </div>

        <div className="text-center">
          <h2 className="mb-2 text-lg font-semibold text-purple-600">
            Level Up! 🎉
          </h2>

          <p className="mb-3 text-3xl font-bold text-purple-600">+5 Points</p>

          <div className="mb-4 flex justify-center gap-2 text-lg">
            <span>✨</span>
            <span>💎</span>
            <span>🎯</span>
          </div>

          <p className="text-sm leading-relaxed text-gray-600">
            You've claimed your daily points! Come back tomorrow for more!
          </p>
        </div>

        <div className="mt-6 flex justify-center">
          <Button
            className="rounded-full bg-purple-600 px-6 hover:bg-purple-700"
            onClick={() => onOpenChange(false)}
          >
            Awesome!
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
