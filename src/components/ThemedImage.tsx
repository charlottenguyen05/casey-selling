"use client";

import { useTheme } from "next-themes";
import Phone from "@/components/Phone";

export const ThemedImage = (imageSrc: string, className?: string) => {
  const { resolvedTheme } = useTheme();
  return resolvedTheme === "dark" ? (
    <Phone
      className={className}
      imgSrc={imageSrc}
      phoneImgSrc="/phone-template-dark-edges.png"
    />
  ) : (
    <Phone
      className={className}
      imgSrc={imageSrc}
      phoneImgSrc="/phone-template-white-edges.png"
    />
  );
};
