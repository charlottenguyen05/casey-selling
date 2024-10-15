"use client";

import { HTMLAttributes, useEffect, useRef, useState } from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import Phone from "./Phone";
import Image from "next/image";

const PHONES = [
  "/testimonials/1.jpg",
  "/testimonials/2.jpg",
  "/testimonials/3.jpg",
  "/testimonials/4.jpg",
  "/testimonials/5.jpg",
  "/testimonials/6.jpg",
];

function splitArray<T>(array: Array<T>, numParts: number) {
  const result: Array<Array<T>> = [];

  for (let i = 0; i < array.length; i++) {
    const index = i % numParts;
    if (!result[index]) {
      result[index] = [];
    }
    result[index].push(array[i]);
  }

  return result; // [[1, 3], [2, 5], [4, 6]]
}

interface ReviewProps extends HTMLAttributes<HTMLDivElement> {
  imgSrc: string;
}

function Review({ imgSrc, className, ...props }: ReviewProps) {
  const POSSIBLE_ANIMATION_DELAYS = ["0.1s", "0.2s", "0.3s", "0.4s", "0.5s"];

  const animationDelay =
    POSSIBLE_ANIMATION_DELAYS[
      Math.floor(Math.random() * POSSIBLE_ANIMATION_DELAYS.length)
    ];

  return (
    <div
      className={cn(
        "animate-fade-in rounded-[2.25rem] dark:bg-slate-900 dark:shadow-slate-800 bg-white p-6 shadow-xl shadow-slate-900/5",
        className
      )}
      style={{ animationDelay }}
      {...props}
    >
      <Phone imgSrc={imgSrc} />
    </div>
  );
}

function ReviewColumn({
  reviews,
  className,
  reviewClassName,
  msPerPixel = 0,
}: {
  reviews: string[];
  className?: string;
  reviewClassName?: (reviewIndex: number) => string;
  msPerPixel?: number;
}) {
  const columnRef = useRef<HTMLDivElement | null>(null);
  const [columnHeight, setColumnHeight] = useState(0);
  const duration = `${columnHeight * msPerPixel}ms`;

  useEffect(() => {
    if (!columnRef.current) return;

    const resizeObserver = new window.ResizeObserver(() => {
      setColumnHeight(columnRef.current?.offsetHeight ?? 0);
    });

    resizeObserver.observe(columnRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={columnRef}
      className={cn("animate-marquee space-y-8 py-4", className)}
      style={{ "--marquee-duration": duration } as React.CSSProperties}
    >
      {reviews.concat(reviews).map((imgSrc, newReviewIndex) => (
        <Review
          key={newReviewIndex}
          // Invoke function reviewClassName with argument reviewIndex passed = newReviewIndex % reviews.length (old index from 0 -> 5)
          className={reviewClassName?.(newReviewIndex % reviews.length)}
          imgSrc={imgSrc}
        />
      ))}
    </div>
  );
}

function ReviewGrid() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.4 });
  const columns = splitArray(PHONES, 3); // [[image 1, image 4], [image 2, image 5], [image 3, image 6]]
  const column1 = columns[0]; // [image 1, image 4]
  const column2 = columns[1]; // [image 2, image 5]
  const column3 = splitArray(columns[2], 2); // [[image 3], [image 6]]

  return (
    <div
      ref={containerRef}
      className="relative -mx-4 mt-16 grid h-[49rem] max-h-[150vh] grid-cols-1 items-start gap-8 overflow-hidden px-4 sm:mt-20 md:grid-cols-2 lg:grid-cols-3"
    >
      {isInView ? (
        <>
          <ReviewColumn
            reviews={[...column1, ...column3.flat(), ...column2]} // All 6 images in a column
            reviewClassName={(reviewIndex) =>
              cn({
                // On medium screen, display only first 3 images (reviewIndex: 0 -> 2; 2 images the column 1 and image the column3[0])
                "md:hidden": reviewIndex >= column1.length + column3[0].length, // reviewIndex >= 3 thì hidden
                // On large screen, display only first 2 images (reviewIndex: 0 -> 1)
                "lg:hidden": reviewIndex >= column1.length, // reviewIndex >= 2 thì hidden
              })
            }
            msPerPixel={10}
          />
          <ReviewColumn
            reviews={[...column2, ...column3[1]]} // 3 images in second column
            className="hidden md:block"
            reviewClassName={(reviewIndex) =>
              cn({
                "lg:hidden": reviewIndex >= column2.length, // display only first 2 images
              })
            }
            msPerPixel={15}
          />
          <ReviewColumn
            reviews={column3.flat()} // 2 images
            className="hidden lg:block"
            msPerPixel={10}
          />
        </>
      ) : null}
      <div className="pointer-events-none absolute inset-x-0 -top-1 h-32 bg-gradient-to-b from-slate-100 dark:from-slate-800" />
      <div className="pointer-events-none absolute inset-x-0 -bottom-1 h-32 bg-gradient-to-t from-slate-100 dark:from-slate-800" />
    </div>
  );
}

function Reviews() {
  return (
    <section className="pt-8 pb-24 grainy-dark dark:bg-slate-900/30 bg-slate-100">
      <MaxWidthWrapper className="relative max-w-5xl px-10">
        <Image
          width={180}
          height={180}
          alt="What people are buying"
          aria-hidden="true"
          src="/what-people-are-buying.png"
          className="absolute select-none hidden xl:block -left-36 top-1/3 dark:hidden"
        />

        <ReviewGrid />
      </MaxWidthWrapper>
    </section>
  );
}

export default Reviews;
