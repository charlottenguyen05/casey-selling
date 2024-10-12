"use client";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { OrderStatus } from "prisma/prisma-client";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { updateOrderStatus } from "@/app/api/dashboard/actions";

const LABEL_MAP: Record<keyof typeof OrderStatus, string> = {
  awaiting_shipment: "Awaiting shipment",
  fulfilled: "Fulfilled",
  shipped: "Shipped",
};

const DropdownStatus = ({
  orderId,
  orderStatus,
}: {
  orderId: string;
  orderStatus: OrderStatus;
}) => {
  const route = useRouter();
  const { toast } = useToast();

  const { mutate: updateStatus } = useMutation({
    mutationKey: ["update-order-orderStatus"],
    mutationFn: updateOrderStatus,
    onSuccess: () => route.refresh(),
    onError: () => {
      toast({
        title: "Something went wrong",
        variant: "destructive",
        description: "An error occurred while saving your configuration.",
      });
    },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="w-52 flex justify-between items-center"
        >
          {LABEL_MAP[orderStatus]}
          <ChevronsUpDown className="size-4 ml-2 shrink-0 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {Object.keys(OrderStatus).map((orderStatusOption) => (
          <DropdownMenuItem
            key={orderStatusOption}
            onClick={() =>
              updateStatus({
                id: orderId,
                newStatus: orderStatusOption as OrderStatus,
              })
            }
            className={cn(
              "flex text-sm gap-1 items-center p-2.5 cursor-default hover:bg-zinc-100",
              {
                "bg-zinc-100": orderStatusOption === orderStatus,
              }
            )}
          >
            <Check
              className={cn(
                "mr-2 size-4 text-primary",
                orderStatus === orderStatusOption ? "opacity-100" : "opacity-0"
              )}
            />
            {LABEL_MAP[orderStatusOption as OrderStatus]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownStatus;
