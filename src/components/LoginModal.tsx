import type { Dispatch, SetStateAction } from "react";
import {
  Dialog,
  DialogHeader,
  DialogDescription,
  DialogTitle,
  DialogContent,
} from "./ui/dialog";
import Image from "next/image";
import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { buttonVariants } from "./ui/button";

const LoginModal = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogContent className="flex flex-col justify-center z-[99999]">
        <DialogHeader>
          <div className="relative mx-auto size-24 mb-2">
            <Image
              src="/snake-1.png"
              alt="snake img"
              className="object-contain"
              fill
            />
          </div>
          <DialogTitle className="text-2xl text-center tracking-tight dark:text-white text-gray-900 font-bold">
            Log in or sign up to continue
          </DialogTitle>
          <DialogDescription className="text-base text-center py-2">
            <span className="font-sm text-zinc-600 dark:text-white">
              Your configuration was saved!
            </span>
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-6 divide-x divide-gray-200">
          <LoginLink className={buttonVariants({ variant: "outline" })}>
            Login
          </LoginLink>
          <RegisterLink className={buttonVariants({ variant: "default" })}>
            Sign up
          </RegisterLink>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
