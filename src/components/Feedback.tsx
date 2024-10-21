import FiveStar from "./FiveStar";
import { Check } from "lucide-react";
import Image from "next/image";

const FeedBack = ({
  feedbackText,
  userImg,
  name,
}: {
  feedbackText: string;
  userImg: string;
  name: string;
}) => {
  return (
    <div className="dark:bg-slate-900 flex flex-col gap-4 mx-auto px-4">
      <FiveStar className="size-5 mb-2" />
      <p className="text-lg leading-8">{feedbackText}</p>
      <div className="flex flex-row justify-start gap-4">
        <Image
          src={userImg}
          width={48}
          height={48}
          alt="user image"
          className="object-cover rounded-full"
        />
        <div className="flex flex-col">
          <div className="font-semibold">{name}</div>
          <span>
            <Check className="size-5 text-green-600 inline-block" />
            <span className="text-sm text-zinc-600 dark:text-zinc-200">
              {" "}
              Verified Purchase
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default FeedBack;
