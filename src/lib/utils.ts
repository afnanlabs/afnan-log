import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
// here is the code
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
