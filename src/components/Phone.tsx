import { cn } from "@/lib/utils";
import Image from "next/image";
import { HTMLAttributes } from "react";

interface PhoneProps extends HTMLAttributes<HTMLDivElement> {
  imgSrc: string;
  dark?: boolean;
}

const Phone = ({ imgSrc, dark = false, className, ...props }: PhoneProps) => {
  return (
    <div
      className={cn(
        "relative pointer-events-none z-10 overflow-hidden",
        className
      )}
      {...props}
    >
      <Image
        src={
          dark
            ? "/phone-template-dark-edges.png"
            : "/phone-template-white-edges.png"
        }
        alt="background of phone"
        className="pointer-events-none z-10 select-none"
        width={400}
        height={400}
      />
      <div className="absolute -z-10 inset-0">
        <Image
          width={400}
          height={400}
          src={imgSrc}
          alt="overlaying image on phone"
          className="object-cover min-w-full min-h-full"
        />
      </div>
    </div>
  );
};

export default Phone;
