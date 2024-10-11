"use client";
import Phone from "@/components/Phone";
import { Check } from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";
import { BASE_PRICE, PRODUCT_PRICES } from "@/config/product";
import Confetti from "react-dom-confetti";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { createCheckoutSession } from "./actions";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Configuration } from "@prisma/client";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import LoginModal from "@/components/LoginModal";

const Highlights = [
  "Wireless charging compatible",
  "TPU shock absorption",
  "Packaging made from recycled materials",
  "5 year print warranty",
];

const Materials = [
  "High-qualty, durable materials",
  "Scratch and fingerprint resistant coating",
];

const DesignPreview = ({ configuration }: { configuration: Configuration }) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const { isAuthenticated } = useKindeBrowserClient();

  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  useEffect(() => setShowConfetti(true), []);

  const router = useRouter();
  const { toast } = useToast();

  const {
    material,
    finish,
    id: configId,
    color,
    model,
    croppedImgUrl,
  } = configuration;

  let totalPrice = BASE_PRICE;
  if (material === "polycarbonate") {
    totalPrice += PRODUCT_PRICES.material.polycarbonate;
  }
  if (finish === "textured") {
    totalPrice += PRODUCT_PRICES.finish.textured;
  }

  const { mutate: createPaymentSession } = useMutation({
    mutationKey: ["get-checkout-session"],
    mutationFn: createCheckoutSession,
    onSuccess: ({ url }) => {
      if (url) {
        router.push(url);
      } else {
        throw new Error("Failed to create checkout session. Please try again");
      }
    },
    onError: (error) => {
      toast({
        title: "Something went wrong",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleCheckout = () => {
    if (isAuthenticated) {
      console.log("isAuthenticated:", isAuthenticated);
      createPaymentSession({ configId: configId });
    } else {
      localStorage.setItem("configurationId", configId);
      setIsLoginModalOpen(true);
    }
  };

  return (
    <>
      <Confetti
        active={showConfetti}
        config={{ elementCount: 200, spread: 120 }}
      />
      <LoginModal isOpen={isLoginModalOpen} setIsOpen={setIsLoginModalOpen} />
      <section className="flex flex-col md:flex-row gap-8 md:gap-10 lg:gap-14 my-20">
        <div className="phone-section flex justify-center items-center md:justify-start ">
          <Phone
            imgSrc={croppedImgUrl!}
            className={cn(
              "pointer-events-none z-40 flex flex-auto max-w-[180px] md:max-w-[270px] lg:max-w-[330px]",
              `bg-${color}-950`
            )}
          />
        </div>

        {/* Right handside section */}
        <div className="details-section flex flex-col w-full">
          <div className="mt-3 mb-6">
            <h3 className="text-3xl font-bold tracking-tight text-foreground text-center md:text-start">
              Your iPhone {model!.slice(6)} Case
            </h3>
            <div className="mt-3 flex items-center gap-1.5 text-base justify-center md:justify-start">
              <Check className="size-4 text-green-500" /> In stock and ready to
              ship
            </div>
          </div>

          {/* Highlights & Materials Section */}
          <div className="flex flex-col sm:flex-row my-3 gap-8 lg:gap-20 max-sm:items-center max-sm:justify-center">
            <div>
              <p className="font-medium text-zinc-950">Highlights</p>
              <ul className="mt-2 text-zinc-700 list-disc list-inside">
                {Highlights.map((highlight, i) => (
                  <li key={i}>{highlight}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-medium text-zinc-950">Materials</p>
              <ul className="mt-2 text-zinc-700 list-disc list-inside">
                {Materials.map((material, i) => (
                  <li key={i}>{material}</li>
                ))}
              </ul>
            </div>
          </div>
          <hr className="mt-3" />

          {/* Price Table */}
          <div className="table-price bg-secondary/25 p-6 sm:rounded-lg sm:p-8 mt-8 w-full">
            <div className="grid grid-cols-2">
              {/* Name of options */}
              <div className="flex flex-col items-start gap-2">
                <p className="text-gray-600">Base price</p>
                <p className="text-gray-600">
                  {material === "polycarbonate"
                    ? "Soft polycarbonate material"
                    : "Silicone material"}
                </p>
                <p className="text-gray-600">
                  {finish === "textured" ? "Textured finish" : "Smooth finish"}
                </p>
              </div>

              {/* Price for options */}
              <div className="flex flex-col items-end gap-2">
                <p className="font-medium text-gray-900">
                  {formatPrice(BASE_PRICE / 100)}
                </p>
                <p className="font-medium text-gray-900">
                  {material === "polycarbonate"
                    ? formatPrice(PRODUCT_PRICES.material.polycarbonate / 100)
                    : "Free"}
                </p>

                <p className="font-medium text-gray-900">
                  {finish === "textured"
                    ? formatPrice(PRODUCT_PRICES.finish.textured / 100)
                    : "Free"}
                </p>
              </div>
              <hr className="col-span-2 my-4" />
              <div className="flex justify-between col-span-2">
                <p className="text-gray-600 font-semibold">Total</p>
                <p className="font-semibold text-gray-900">
                  {formatPrice(totalPrice / 100)}
                </p>
              </div>
            </div>
          </div>

          <Button
            onClick={() => handleCheckout()}
            className="mt-6 px-4 sm:px-6 lg:px-8 py-2 rounded-lg flex self-end"
          >
            Check out <span className="ml-1.5 font-bold">➞</span>
          </Button>
        </div>
      </section>
    </>
  );
};

export default DesignPreview;
