"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    name: "Step 1: Add image",
    description: "Choose an image for your case",
    url: "/upload",
    imgSrc: "/snake-1.png",
  },
  {
    name: "Step 2: Customize image",
    description: "Make the case yours",
    url: "/desgin",
    imgSrc: "/snake-2.png",
  },
  {
    name: "Step 3: Summary",
    description: "Review your final design",
    url: "/preview",
    imgSrc: "/snake-3.png",
  },
];

const Steps = () => {
  let pathname = usePathname();
  return (
    <ol className="dark:bg-slate-800/40 dark:border-slate-500  dark:text-white rounded-md bg-white shadow-lg pt-1 lg:flex lg:rounded-none lg:border-1 lg:border-x lg:border-gray-200 mt-8 lg:mt-16">
      {STEPS.map((step, i) => {
        let isCurrent = pathname.includes(step.url);
        return (
          <li className="relative overflow-hidden lg:flex-1" key={i}>
            <span
              className={`absolute left-0 top-0 right-auto h-full w-1 lg:bottom-0 lg:top-auto lg:h-1 lg:w-full ${
                isCurrent ? "bg-green-600" : "bg-slate-200 dark:bg-slate-500"
              }`}
            ></span>
            <div className="flex items-center px-6 py-4 text-sm font-medium">
              <span className="flex-shrink-0">
                <Image
                  src={step.imgSrc}
                  width={200}
                  height={200}
                  alt="snake"
                  className="flex items-center justify-center object-contain border-secondary size-20"
                />
              </span>
              <div className="flex flex-col items-start justify-center ml-6">
                <span className="font-semibold">{step.name}</span>
                <span className="text-sm text-zinc-500">
                  {step.description}
                </span>
              </div>
              <span
                className={cn("hidden lg:block absolute inset-0 w-4", {
                  "lg:hidden": i === 0,
                })}
              >
                <svg
                  className="h-auto w-auto text-gray-300 dark:text-slate-500"
                  viewBox="0 0 12 82"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0.5 0V31L10.5 41L0.5 51V82"
                    stroke="currentcolor"
                    vectorEffect="non-scaling-stroke"
                  ></path>
                </svg>
              </span>
            </div>
          </li>
        );
      })}
    </ol>
  );
};

export default Steps;
