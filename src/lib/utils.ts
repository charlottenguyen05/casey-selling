import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// Function to do conditional styling with className
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatPrice =(price: number) => {
  const formatter = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "eur"
  })
  return formatter.format(price)
}