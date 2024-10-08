import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

const FiveStar = ({ className }: { className: string }) => {
  return (
    <div className="flex gap-0.5">
      <Star className={cn("text-green-600 fill-green-600", className)} />
      <Star className={cn("text-green-600 fill-green-600", className)} />
      <Star className={cn("text-green-600 fill-green-600", className)} />
      <Star className={cn("text-green-600 fill-green-600", className)} />
      <Star className={cn("text-green-600 fill-green-600", className)} />
    </div>
  );
};

export default FiveStar;
