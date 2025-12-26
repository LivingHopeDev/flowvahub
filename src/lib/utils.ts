import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { DayOfWeek } from "@/types/rewardHub";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getLast7Days = (lastCheckIn: string | null): DayOfWeek[] => {
  const days: DayOfWeek[] = [];
  const today = new Date();
  const dayLabels = ["S", "M", "T", "W", "T", "F", "S"];

  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    date.setHours(0, 0, 0, 0);

    const isToday = i === 0;
    const lastCheckInDate = lastCheckIn ? new Date(lastCheckIn) : null;

    let completed = false;
    if (lastCheckInDate) {
      const checkInDateOnly = new Date(lastCheckInDate);
      checkInDateOnly.setHours(0, 0, 0, 0);
      completed = date <= checkInDateOnly;
    }

    days.push({
      label: dayLabels[date.getDay()],
      completed,
      date,
      isToday,
    });
  }

  return days;
};

export const canClaimToday = (lastCheckIn: string | null): boolean => {
  if (!lastCheckIn) return true;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const lastCheckInDate = new Date(lastCheckIn);
  lastCheckInDate.setHours(0, 0, 0, 0);

  return today > lastCheckInDate;
};

export const getInitials = (name: string): string => {
  const namesArray = name.trim().split(" ");
  if (namesArray.length === 0) return "";

  const firstInitial = namesArray[0].charAt(0).toUpperCase();
  const lastInitial =
    namesArray.length > 1
      ? namesArray[namesArray.length - 1].charAt(0).toUpperCase()
      : "";

  return firstInitial + lastInitial;
};
