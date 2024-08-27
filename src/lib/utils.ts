import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function generateUUIDv6(): string {
  const getRandomHex = (length: number): string => {
    return Array.from({ length }, () => Math.floor(Math.random() * 16).toString(16)).join('');
  };

  const timeNow = Date.now();
  const timestamp = (timeNow * 10000 + 122192928000000000).toString(16);

  const uuid = [
    timestamp.substring(0, 8), // time_low
    timestamp.substring(8, 12), // time_mid
    `6${timestamp.substring(13, 16)}`, // time_high_version
    `${(parseInt(getRandomHex(1), 16) & 0x3f | 0x80).toString(16)}${getRandomHex(2).substring(1)}`, // clk_seq_hi_res & clk_seq_low
    getRandomHex(12) // node
  ];

  return uuid.join('-');
}
