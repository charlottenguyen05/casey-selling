"use client";

import { CaseColor } from "@prisma/client";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const PhonePreview = ({
  croppedImgUrl,
  color,
}: {
  croppedImgUrl: string;
  color: CaseColor;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [containerDimension, setContainerDimension] = useState({
    height: 0,
    width: 0,
  });

  const handleResize = () => {
    if (!ref.current) return;
    const { height, width } = ref.current.getBoundingClientRect();
    setContainerDimension({ height, width });
  };

  useEffect(() => {
    handleResize();

    window.addEventListener("resize", handleResize);
  }, [ref.current]);

  return (
    <AspectRatio ref={ref} ratio={3000 / 2001} className="relative">
      <div
        className="absolute z-20 scale-[1.0352]"
        style={{
          left:
            containerDimension.width / 2 -
            containerDimension.width / (1216 / 121),
          top: containerDimension.height / 6.22,
        }}
      >
        <Image
          src={croppedImgUrl}
          alt="user image"
          width={containerDimension.width / (3000 / 637)}
          height={containerDimension.height / (3000 / 637)}
          className={cn(
            "phone-skew relative z-20 rounded-t-[15px] rounded-b-[10px] md:rounded-t-[30px] md:rounded-b-[20px]",
            `bg-${color}-950`
          )}
        />
      </div>
      <div className="relative h-full w-full z-40">
        <Image
          src="/clearphone.png"
          alt="background"
          className="pointer-events-none h-full w-full antialiased rounded-md"
          fill
        />
      </div>
    </AspectRatio>
  );
};

export default PhonePreview;
