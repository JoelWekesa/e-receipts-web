import currencyFormat from "@/utils/currency";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatMoneyRange = (
  range: {
    start?: { amount: number } | null;
    stop?: { amount: number } | null;
  } | null,
) => {
  const { start, stop } = range || {};
  const startMoney = start && currencyFormat.format(start.amount);
  const stopMoney = stop && currencyFormat.format(stop.amount);

  if (startMoney === stopMoney) {
    return startMoney;
  }

  return `${startMoney} - ${stopMoney}`;
};
