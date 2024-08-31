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


export function formatTimestamp(timestamp: string): string{

  const date = new Date(timestamp);

  // Obtener las partes de la fecha
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses comienzan en 0
  const year = date.getFullYear();

  // Obtener las partes de la hora
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  // Formatear la fecha como dd/mm/yyyy hh:mm:ss
  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}
export function formatMobileTimestamp(timestamp: string): string{

  const date = new Date(timestamp);

  // Obtener las partes de la fecha
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses comienzan en 0
  const year = date.getFullYear();


  // Formatear la fecha como dd/mm/yyyy hh:mm:ss
  return `${day}/${month}/${year}`;
}