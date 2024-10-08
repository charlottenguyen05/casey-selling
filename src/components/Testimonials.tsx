import MaxWidthWrapper from "./MaxWidthWrapper";
import Image from "next/image";
import FeedBack from "./Feedback";

const feedbacks = [
  {
    name: "Jonathan",
    userImg: "/users/user-1.png",
    feedbackText:
      '"The case feels durable and I even got a compliment on the design. Had the case for two and a half months now and the image is super clear, on the case I had before, the image started fading into yellow-ish color after a couple weeks. Love it."',
  },
  {
    name: "Josh",
    userImg: "/users/user-4.jpg",
    feedbackText:
      '"I usually keep my phone together with my keys in my pocket and that led to some pretty heavy scratchmarks on all of my last phone cases. This one, besides a barely noticeable scratch on the corner, looks brand new after about half a year. I dig it."',
  },
];

const Testimonials = () => {
  return (
    <section className="bg-slate-100 grainy-dark py-24">
      <MaxWidthWrapper>
        <div className="flex flex-col lg:flex-row items-center justify-center gap-4 sm:gap-6">
          <h2 className="font-bold tracking-tight text-balance !leading-tight text-center md:text-6xl text-gray-900 text-5xl max-lg:order-last">
            What our <span className="relative px-2">customers</span> say
          </h2>
          <Image src="/snake-2.png" alt="snake" width={96} height={96} />
        </div>
        <div className="flex flex-col lg:flex-row gap-16 pt-16">
          {feedbacks.map((f) => (
            <FeedBack {...f} key={f.name} />
          ))}
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default Testimonials;
