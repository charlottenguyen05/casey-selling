import { Suspense } from "react";
import ThankYou from "./ThankYou";

interface SearchParams {
  [key: string]: string | undefined;
}

const Page = async ({ searchParams }: { searchParams: SearchParams }) => {
  const { order_id } = searchParams;
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ThankYou orderId={order_id} />
    </Suspense>
  );
};

export default Page;
