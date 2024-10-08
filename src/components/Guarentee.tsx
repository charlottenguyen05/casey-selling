import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const Guarentee = ({
  text,
  className,
}: {
  text: string;
  className?: string;
}) => {
  return (
    <li className={cn("flex gap-x-1.5 items-center", className)}>
      <Check className="size-5 shrink-0 text-green-600" />
      {text}
    </li>
  );
};

export default Guarentee;
