import Image from "next/image";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import FiveStar from "@/components/FiveStar";
import Guarentee from "@/components/Guarentee";
import Phone from "@/components/Phone";

const Guarentees = [
  "High-quality, durable material",
  "5 year print guarantee",
  "Modern iPhone models supported",
];

const Hero = () => {
  return (
    <section className="bg-slate-50">
      <MaxWidthWrapper className="pb-24 sm:pb-32 lg:pb-52 lg:pt-24 xl:pt-32 grid grid-cols-1 lg:grid-cols-3 lg:gap-x-0 xl:gap-x-8">
        <div className="lg:col-span-2 px-6 lg:px-0 lg:pt-4">
          <div className="relative flex flex-col items-center mx-auto text-center lg:text-left lg:items-start">
            {/* Snake image only appear in lg screen */}
            <div className="absolute hidden lg:block w-28 left-0 -top-20">
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t via-slate-50/50 from-slate-50 h-28" />
              <Image
                src="/snake-1.png"
                width={400}
                height={400}
                alt="snake-icon"
                className="w-full"
              />
            </div>

            {/* Heading */}
            <h1 className="relative tracking-tight text-balance !leading-tight w-fit mt-16 font-bold text-gray-900 text-5xl md:text-6xl lg:text-7xl">
              Your Image on a{" "}
              <span className="text-white bg-green-600 px-2">Custom</span> Phone
              Case
            </h1>

            <p className="mt-8 text-lg text-center text-balance lg:text-left lg:pr-10 max-w-prose">
              Capture your favorite memories with your own,{" "}
              <span className="font-semibold">one-of-one</span> phone case.
              CaseCobra allows you to protect your memories, not just your phone
              case.
            </p>

            {/* 3 guarantees */}
            <ul className="mt-8 space-y-2 text-left font-medium flex flex-col sm:items-start">
              {Guarentees.map((g,id) => (
                <Guarentee text={g} key={id} />
              ))}
            </ul>

            {/* Chaining Five People */}
            <div className="mt-12 flex flex-col sm:flex-row items-center sm:items-start gap-5">
              <div className="flex -space-x-4">
                <Image
                  src="/users/user-1.png"
                  alt="user img"
                  width={40}
                  height={40}
                  className="inline-block rounded-full ring-2 ring-slate-100"
                />
                <Image
                  src="/users/user-2.png"
                  alt="user img"
                  width={40}
                  height={40}
                  className="inline-block rounded-full ring-2 ring-slate-100"
                />
                <Image
                  src="/users/user-3.png"
                  alt="user img"
                  width={40}
                  height={40}
                  className="inline-block rounded-full ring-2 ring-slate-100"
                />
                <Image
                  src="/users/user-4.jpg"
                  alt="user img"
                  width={40}
                  height={40}
                  className="inline-block rounded-full ring-2 ring-slate-100"
                />
                <Image
                  src="/users/user-5.jpg"
                  alt="user img"
                  width={40}
                  height={40}
                  className="inline-block object-cover rounded-full ring-2 ring-slate-100"
                />
              </div>

              <div className="flex flex-col justify-between items-center sm:items-start">
                <FiveStar className="size-4" />
                <p>
                  <span className="font-semibold">1.250</span> happy customers
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center px-8 mt-32 sm:px-16 md:px-0 lg:col-span-1 lg:mx-0 lg:mt-20">
          <div className="relative md:max-w-xl">
            <Image
              src="/your-image.png"
              width={160}
              height={160}
              alt="your image text"
              className="absolute hidden select-none left-56 -top-20 sm:block lg:hidden lg:w-52 xl:block "
            />
            <Image
              src="/line.png"
              width={80}
              height={80}
              className="absolute w-20 -left-6 -bottom-6 select-none"
              alt="dotted line"
            />
            <Phone className="w-64" imgSrc="/testimonials/1.jpg" />
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default Hero;
