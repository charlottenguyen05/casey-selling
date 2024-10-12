"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getPaymentDetails } from "./actions";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import PhonePreview from "@/components/PhonePreview";
import { formatPrice } from "@/lib/utils";

const ThankYou = ({ orderId }: { orderId: string | undefined }) => {
  const { data, error } = useQuery({
    queryKey: ["get-payment-details"],
    queryFn: async () => await getPaymentDetails(orderId),
    retry: 10,
    retryDelay: 500,
  });

  const { toast } = useToast();

  useEffect(() => {
    if (error) {
      toast({
        title: "Something went wrong",
        variant: "destructive",
        description: error.message,
      });
    }
  }, [error]);

  if (data === undefined) {
    return (
      <section className="w-full mt-24 flex justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="size-8 animate-spin text-zinc-500" />
          <h3 className="font-semibold text-xl">Loading your order...</h3>
          <p>This won't take long.</p>
        </div>
      </section>
    );
  }

  if (data === false) {
    return (
      <section className="w-full mt-24 flex justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="size-8 animate-spin text-zinc-500" />
          <h3 className="font-semibold text-xl">Verifying your payment...</h3>
          <p>This might take a moment.</p>
        </div>
      </section>
    );
  }

  const { configuration, billingAddress, shippingAddress, totalPrice } = data;
  const { color } = configuration;
  return (
    <section className="bg-white mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="max-w-xl">
        <p className="text-base font-medium text-primary ">Thank you!</p>
        <p className="mt-2 text-4xl tracking-tight sm:text-5xl">
          Your case is on the way
        </p>
        <p className="mt-2 text-base text-zinc-500">
          We've received your order and are now processing it
        </p>
      </div>
      <div className="mt-10 border-t border-zinc-200">
        <div className="mt-10 flex flex-auto flex-col">
          <p className="text-zinc-900 font-semibold">
            You made a great choice!
          </p>
          <p className="mt-2 text-sm text-zinc-600">
            We at CaseCobra believe that a phone case doesn't only need to look
            good, but also last you for the years to come. We offer a 5-year
            print guarantee: If your case isn't of the highest quality, we'll
            replace it for free.
          </p>
          <div className="flex space-x-6 overflow-hidden mt-4 rounded-xl bg-gray-900/5 ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl">
            <PhonePreview
              croppedImgUrl={configuration.croppedImgUrl!}
              color={color!}
            />
          </div>
        </div>
      </div>
      <div>
        <div className="grid grid-cols-2 gap-x-6 py-10 text-sm">
          <div>
            <p className="font-medium text-gray-900">Shipping address</p>
            <div className="mt-2 text-zinc-700">
              <address className="not-italic">
                <span className="block">{shippingAddress?.name}</span>
                <span className="block">{shippingAddress?.street}</span>
                <span className="block">{shippingAddress?.postalCode} {shippingAddress?.city}</span>
              </address>
            </div>
            <hr className="col-span-2 bg-zinc-200 py-10" />
            <p className="font-medium text-gray-900">Shipping address</p>
            <p>{data ? "Paid" : "Not paid"}</p>
            <hr className="col-span-2 bg-zinc-200 py-10" />
          </div>
          <div>
            <p className="font-medium text-gray-900">Billing address</p>
            <div className="mt-2 text-zinc-700">
              <address className="not-italic">
                <span className="block">{billingAddress?.name}</span>
                <span className="block">{billingAddress?.street}</span>
                <span className="block">{billingAddress?.postalCode} {billingAddress?.city}</span>
              </address>
            </div>
            <hr className="col-span-2 bg-zinc-200 py-10" />
            <p className="font-medium text-gray-900">Shipping method</p>
            <p className="text-zinc-700">DHL, takes up to 3 working days</p>
            <hr className="col-span-2 bg-zinc-200 py-10" />
          </div>
        </div>
        <div className="grid grid-cols-2 justify-between text-sm">
            <div>
                <p className="font-medium text-zinc-900">Subtotal</p>
                <p className="font-medium text-zinc-900">Shipping</p>
                <p className="font-medium text-zinc-900">Total</p>
            </div>
            <div>
                <p className="text-zinc-700">{formatPrice(totalPrice)}</p>
                <p className="text-zinc-700">{formatPrice(0)}</p>
                <p className="text-zinc-700">{formatPrice(totalPrice)}</p>
            </div>
        </div>
      </div>
      <div></div>
    </section>
  );
};

export default ThankYou;
