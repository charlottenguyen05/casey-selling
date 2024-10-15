"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState, useEffect, HTMLAttributes } from "react";

interface PhoneProps extends HTMLAttributes<HTMLDivElement> {
  imgSrc: string;
  dark?: boolean;
}

const getCurrentTheme = () => {
  if (typeof window !== "undefined") {
    return document.documentElement.classList.contains("dark")
      ? "dark"
      : "light";
  }
  return "light";
};

const Phone = ({ imgSrc, className, ...props }: PhoneProps) => {
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    const currentTheme = getCurrentTheme();
    if (theme !== currentTheme) {
      setTheme(currentTheme);
    }
  }, []);
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
          theme === "dark"
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
          className="object-cover max-w-full min-h-full"
        />
      </div>
    </div>
  );
};

export default Phone;
