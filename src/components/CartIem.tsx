import React from "react";
import Phone from "./Phone";
import type { CartItem, Configuration } from "@prisma/client";
import { Pencil } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { Input } from "@headlessui/react";
import { useMutation } from "@tanstack/react-query";
import updateCartItem from "@/app/cart/actions";
import { useToast } from "@/hooks/use-toast";

const CartItem = ({
  config,
  cart,
}: {
  config: Configuration;
  cart: CartItem;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(cart.name || cart.id);
  const { toast } = useToast();

  const { mutate: updateItem } = useMutation({
    mutationKey: ["update-cart-item"],
    mutationFn: async (cart: CartItem) => {
      await updateCartItem(cart);
    },
    onError: () => {
      toast({
        title: "Something went wrong",
        variant: "destructive",
        description: "An error occurred while saving your configuration.",
      });
    },
    onSuccess: () => {
      console.log("Successfully update the name of the cart item");
    },
  });

  const handleStartEditing = () => {
    setIsEditing(true);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsEditing(false);
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter") {
      setIsEditing(false);
    }
  };

  return (
    <div className="flex">
      <div>
        <Phone className="w-64" imgSrc={config.croppedImgUrl!} />
      </div>
      <div className="flex flex-col">
        {isEditing ? (
          <div>
            <span>
              <Input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </span>
            <span>
              <Button
                variant="ghost"
                size="icon"
                asChild
                onClick={(e) => handleSubmit(e)}
                onKeyDown={(e) => handleEnter(e)}
              >
                <Pencil className="size-8 text-zinc-500 dark:text-white" />
              </Button>
            </span>
          </div>
        ) : (
          <div>
            <span>{text}</span>
            <span className="ml-3">
              <Button
                variant="ghost"
                size="icon"
                asChild
                onClick={handleStartEditing}
              >
                <Pencil className="size-8 text-zinc-500 dark:text-white" />
              </Button>
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartItem;
