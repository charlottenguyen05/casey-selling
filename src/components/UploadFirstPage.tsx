import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Image from "next/image";
import Phone from "@/components/Phone";
import Guarentee from "./Guarentee";
import { Button } from "./ui/button";
import Link from "next/link";

const guarenteesEnd = [
  "High-quality silicone material",
  "Scratch and fingerprint resistant coating",
  "Wireless charging compatible",
  "5 year print warranty",
];

const UploadFirstPage = () => {
  return (
    <section className="bg-slate-50 dark:bg-slate-900/30">
      <MaxWidthWrapper className="flex flex-col gap-10 px-6 py-24">
        <h2 className="mx-auto sm:text-center tracking-tight text-center text-balance !leading-tight font-bold text-5xl md:text-6xl dark:text-white text-gray-900">
          Upload your photo and get{" "}
          <span className="px-2 bg-green-600 text-white">your own case</span>{" "}
          now
        </h2>
        <div className="flex flex-col items-center justify-center md:flex-row md:gap-8">
          <div className="relative h-80 w-full shadow-2xl rounded-xl md:justify-self-end md:h-full md:flex-1 min-w-[260px] max-w-sm rounded-bg bg-gray-900/5 ring-inset ring-gray-900/10 lg:rounded-2xl">
            <Image
              src="/horse.jpg"
              width={384}
              height={577}
              alt="horse"
              className="rounded-md object-cover md:object-contain ring-1 ring-gray-900/10 h-full w-full"
            />
          </div>
          <Image
            src="/arrow.png"
            alt="arrow"
            width={140}
            height={140}
            className="rotate-90 md:rotate-0 mt-16 mb-16"
          />
          <Phone imgSrc="/horse_phone.jpg" className="w-60 overflow-hidden" />
        </div>
        <div className="mx-auto max-w-prose sm:text-lg space-y-2 w-fit">
          {guarenteesEnd.map((g, id) => (
            <Guarentee text={g} key={id} />
          ))}
        </div>
        <div className="flex justify-center">
          <Link href="/configure/upload">
            <Button className="bg-green-600 hover:cursor-pointer dark:text-white hover:bg-green-600/85 px-8">
              Create your case now &rarr;
            </Button>
          </Link>
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default UploadFirstPage;
