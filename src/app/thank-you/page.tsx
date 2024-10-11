import { Suspense } from "react";
import ThankYou from "./ThankYou";

interface SearchParams {
  [key: string]: string | undefined;
}

const Page = async ({ searchParams }: { searchParams: SearchParams }) => {
  const { orderId } = searchParams;
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ThankYou orderId={orderId} />
    </Suspense>
  );
};

export default Page;
