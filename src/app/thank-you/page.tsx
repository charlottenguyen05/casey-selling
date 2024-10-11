import React, { Suspense } from "react";
import ThankYou from "./ThankYou";

const Page = async (searchParams: {
  [key: string]: string | undefined;
}) => {
  const { orderId } = searchParams;
  return (
    <Suspense>
      <ThankYou orderId={orderId} />
    </Suspense>
  );
};

export default Page;
