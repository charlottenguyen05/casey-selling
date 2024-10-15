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
    retry: 5,
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
      <section className="w-full mt-24 flex justify-center dark:bg-slate-900">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="size-8 animate-spin text-zinc-500 dark:text-white" />
          <h3 className="font-semibold text-xl dark:text-white">Loading your order...</h3>
          <p className="dark:text-white">This won't take long.</p>
        </div>
      </section>
    );
  }

  if (data === false) {
    return (
      <section className="w-full mt-24 flex justify-center dark:bg-slate-900">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="size-8 animate-spin text-zinc-500 dark:text-white" />
          <h3 className="font-semibold text-xl">Verifying your payment...</h3>
          <p className="dark:text-white">This might take a moment.</p>
        </div>
      </section>
    );
  }

  const { configuration, billingAddress, shippingAddress, totalPrice } = data;
  const { color } = configuration;
  return (
    <div className='bg-white dark:bg-slate-900'>
      <div className='mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8'>
        <div className='max-w-xl'>
          <p className='text-base font-medium text-primary'>Thank you!</p>
          <h1 className='mt-2 text-4xl font-bold tracking-tight sm:text-5xl'>
            Your case is on the way!
          </h1>
          <p className='mt-2 text-base text-zinc-500 dark:text-white'>
            We've received your order and are now processing it.
          </p>

          <div className='mt-12 text-sm font-medium'>
            <p className='text-zinc-900 dark:text-white'>Order number</p>
            <p className='mt-2 text-zinc-500 dark:text-white'>{orderId}</p>
          </div>
        </div>

        <div className='mt-10 border-t border-zinc-200'>
          <div className='mt-10 flex flex-auto flex-col'>
            <h4 className='font-semibold text-zinc-900 dark:text-white'>
              You made a great choice!
            </h4>
            <p className='mt-2 text-sm text-zinc-600 dark:text-white'>
              We at CaseySelling believe that a phone case doesn't only need to
              look good, but also last you for the years to come. We offer a
              5-year print guarantee: If you case isn't of the highest quality,
              we'll replace it for free.
            </p>
          </div>
        </div>

        <div className='flex space-x-6 overflow-hidden mt-4 rounded-xl bg-gray-900/5 ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl dark:bg-slate-800'>
          <PhonePreview
            croppedImgUrl={configuration.croppedImgUrl!}
            color={color!}
          />
        </div>

        <div>
          <div className='grid grid-cols-2 gap-x-6 py-10 text-sm'>
            <div>
              <p className='font-medium text-gray-900 dark:text-white'>Shipping address</p>
              <div className='mt-2 text-zinc-700 dark:text-white'>
                <address className='not-italic'>
                  <span className='block'>{shippingAddress?.name}</span>
                  <span className='block'>{shippingAddress?.street}</span>
                  <span className='block'>
                    {shippingAddress?.postalCode} {shippingAddress?.city}
                  </span>
                </address>
              </div>
            </div>
            <div>
              <p className='font-medium text-gray-900 dark:text-white'>Billing address</p>
              <div className='mt-2 text-zinc-700 dark:text-white'>
                <address className='not-italic'>
                  <span className='block'>{billingAddress?.name}</span>
                  <span className='block'>{billingAddress?.street}</span>
                  <span className='block'>
                    {billingAddress?.postalCode} {billingAddress?.city}
                  </span>
                </address>
              </div>
            </div>
          </div>

          <div className='grid grid-cols-2 gap-x-6 border-t border-zinc-200 py-10 text-sm'>
            <div>
              <p className='font-medium text-zinc-900 dark:text-white'>Payment status</p>
              <p className='mt-2 text-zinc-700 dark:text-white'>Paid</p>
            </div>

            <div>
              <p className='font-medium text-zinc-900 dark:text-white'>Shipping Method</p>
              <p className='mt-2 text-zinc-700 dark:text-white'>
                DHL, takes up to 3 working days
              </p>
            </div>
          </div>
        </div>

        <div className='space-y-6 border-t border-zinc-200 pt-10 text-sm'>
          <div className='flex justify-between'>
            <p className='font-medium text-zinc-900 dark:text-white'>Subtotal</p>
            <p className='text-zinc-700 dark:text-white'>{formatPrice(totalPrice)}</p>
          </div>
          <div className='flex justify-between'>
            <p className='font-medium text-zinc-900 dark:text-white'>Shipping</p>
            <p className='text-zinc-700 dark:text-white'>{formatPrice(0)}</p>
          </div>
          <div className='flex justify-between'>
            <p className='font-medium text-zinc-900 dark:text-white'>Total</p>
            <p className='text-zinc-700 dark:text-white'>{formatPrice(totalPrice)}</p>
          </div>
        </div>
      </div>
    </div>
  )
}


export default ThankYou;
