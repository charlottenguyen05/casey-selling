"use client";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import NextImage from "next/image";
import { cn, formatPrice } from "@/lib/utils";
import { useRef, useState, useTransition } from "react";
import { Rnd } from "react-rnd";
import DotMarkResize from "../../../components/DotMarkResize";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Description, Radio, RadioGroup } from "@headlessui/react";
import {
  COLORS,
  MATERIALS,
  MODELS,
  FINISHES,
} from "@/validators/option-validator";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { Check } from "lucide-react";
import { BASE_PRICE } from "@/config/product";
import { useUploadThing } from "@/lib/uploadthing";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { updateConfigArgs, updateConfigs } from "../design/actions";
import { useRouter } from "next/navigation";
import LoginModal from "@/components/LoginModal";

interface DesignConfigProps {
  imgUrl: string;
  configId: string;
  imageDimension: { width: number; height: number };
}

const DesignConfig = ({
  imgUrl,
  configId,
  imageDimension,
}: DesignConfigProps) => {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);

  const { mutate: saveConfig, isPending } = useMutation({
    mutationKey: ["save-configuration"],
    mutationFn: async (args: updateConfigArgs) => {
      await Promise.all([saveCanvasImage(), updateConfigs(args)]);
    },
    onError: () => {
      toast({
        title: "Something went wrong",
        variant: "destructive",
        description: "An error occurred while saving your configuration.",
      });
    },
    // !!onSuccess run before the image has been uploaded to uploadthing (Comback with this problems later)
    onSuccess: () => {
      router.push(`/configure/preview?id=${configId}`);
    },
  });

  const [options, setOptions] = useState<{
    color: (typeof COLORS)[number];
    model: (typeof MODELS.options)[number];
    material: (typeof MATERIALS.options)[number];
    finish: (typeof FINISHES.options)[number];
  }>({
    color: COLORS[0],
    model: MODELS.options[0],
    material: MATERIALS.options[0],
    finish: FINISHES.options[0],
  });

  const { startUpload } = useUploadThing("imageUploader");

  const [renderedDimension, setrenderedDimension] = useState({
    width: imageDimension.width / 10,
    height: imageDimension.height / 10,
  });
  const [renderedPosition, setRenderedPosition] = useState({ x: 150, y: 200 });
  const greyContainerRef = useRef<HTMLDivElement>(null);
  const phoneCaseRef = useRef<HTMLDivElement>(null);

  async function saveCanvasImage() {
    try {
      const {
        left: leftCase,
        top: topCase,
        width: phoneWidth,
        height: phoneHeight,
      } = phoneCaseRef.current!.getBoundingClientRect();
      const { left: leftContainer, top: topContainer } =
        greyContainerRef.current!.getBoundingClientRect();

      const leftPhoneOffset = leftCase - leftContainer;
      const topPhoneOffset = topCase - topContainer;

      const actualXInPhone = renderedPosition.x - leftPhoneOffset;
      const actualYInPhone = renderedPosition.y - topPhoneOffset;

      // Canvas: Load image within the size of the phone
      const canvas = document.createElement("canvas");
      canvas.width = phoneWidth;
      canvas.height = phoneHeight;
      const ctx = canvas.getContext("2d");

      // Draw user image on canvas
      const userImage = new Image();
      userImage.crossOrigin = "anonymous";
      userImage.src = imgUrl;

      // onload event handler is triggered when the userImage is finished loading
      await new Promise<void>((resolve, reject) => {
        userImage.onload = () => {
          ctx?.drawImage(
            userImage,
            actualXInPhone,
            actualYInPhone,
            renderedDimension.width,
            renderedDimension.height
          );
          resolve();
        };
        userImage.onerror = reject;
      });

      // Convert canvas to a blob and wait for it
      const blob = await new Promise<Blob | null>((resolve) => {
        canvas.toBlob((blob) => {
          resolve(blob);
        }, "image/png");
      });

      if (blob) {
        // Create an image file from blob
        const file = new File([blob], "new-crop.png", {
          type: "image/png",
        });
        // Upload image file to uploadThing
        await startUpload([file], {
          configId: configId,
        });
        console.log("Upload successful image to uploadthing");
        // setEndImageUploaded(true);
      }
    } catch (err) {
      toast({
        title: "Something went wrong",
        variant: "destructive",
        description: "An error occurred while saving your configuration.",
      });
    }
  }

  return (
    <>
      <LoginModal isOpen={isLoginModalOpen} setIsOpen={setIsLoginModalOpen} />
      <div className="relative grid grid-cols-3 my-20 pb-10">
        {/* Section: Grey part */}
        <div
          ref={greyContainerRef}
          className="relative h-[37.5rem] overflow-hidden max-w-4xl w-full grid col-span-3 lg:col-span-2 border-2 border-gray-300 border-dashed rounded-lg items-center justify-center p-12 text-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          <div className="relative phone-section w-60 bg-opacity-50 pointer-events-none">
            <AspectRatio ref={phoneCaseRef} ratio={896 / 1831} className="z-50">
              <NextImage src="/phone-template.png" alt="phone" fill />
            </AspectRatio>
            <div className="absolute z-40 inset-0 left-[3px] right-[3px] rounded-[32px] shadow-[0_0_0_99999px_rgba(229,231,235,0.6)]" />
            <div
              className={cn(
                "absolute inset-0 left-[3px] right-[3px] rounded-[32px]",
                `bg-${options.color.tw}`
              )}
            />
          </div>

          <Rnd
            default={{
              x: 150,
              y: 200,
              width: imageDimension.width / 10,
              height: imageDimension.height / 10,
            }}
            onDragStop={(_, data) => {
              const { x, y } = data;
              console.log({ x, y });
              setRenderedPosition({ x, y });
            }}
            onResizeStop={(_, __, ref, ___, position) => {
              const { width, height } = ref.style;
              console.log({ width, height });
              setrenderedDimension({
                width: parseInt(width.slice(0, -2)),
                height: parseInt(height.slice(0, -2)),
              });

              const { x, y } = position;
              setRenderedPosition({ x, y });
            }}
            className="absolute z-20 border-[3px] border-primary"
            lockAspectRatio
            resizeHandleComponent={{
              topRight: <DotMarkResize />,
              topLeft: <DotMarkResize />,
              bottomRight: <DotMarkResize />,
              bottomLeft: <DotMarkResize />,
            }}
          >
            <div className="relative h-full w-full">
              <NextImage
                src={imgUrl}
                fill
                alt="user uploaded image"
                className="pointer-events-none"
              />
            </div>
          </Rnd>
        </div>

        {/* Section: Customize the case */}
        <div className="case-options h-[37.5rem] flex flex-col bg-white col-span-3 lg:col-span-1 pt-6 sm:pt-0">
          <ScrollArea className="relative flex-1 overflow-auto">
            <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white z-10 pointer-events-none" />
            <div className="px-8 pb-12 pt-6">
              <h2 className="text-3xl font-bold tracking-tight">
                Customize your case
              </h2>
              <hr className="bg-muted my-6 w-full" />
              <div className="relative mt-4 flex flex-col gap-6 h-full">
                <RadioGroup
                  value={options.color}
                  onChange={(newValue) =>
                    setOptions((prev) => ({ ...prev, color: newValue }))
                  }
                >
                  <Label>Color: {options.color.label}</Label>
                  <div className="mt-3 flex items-center space-x-3 ml-1">
                    {COLORS.map((color) => (
                      <Radio
                        key={color.label}
                        value={color}
                        className={cn(
                          "relative -m-1.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 active:ring-0 focus:ring-0 active:outline-none focus:outline-none border-2 border-transparent",
                          {
                            [`border-${color.tw}`]:
                              options.color.value === color.value,
                          }
                        )}
                      >
                        <span
                          className={cn(
                            `bg-${color.tw}`,
                            "size-8 rounded-full border border-black border-opacity-10"
                          )}
                        />
                      </Radio>
                    ))}
                  </div>
                </RadioGroup>

                <div className="relative flex flex-col gap-3">
                  <Label>Model</Label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        className="w-full justify-between after-focus:ring-0"
                      >
                        {options.model.label}
                        <ChevronDown className="size-6 ml-2 shrink-0 opacity-50" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {MODELS.options.map((model) => (
                        <DropdownMenuItem
                          key={model.label}
                          onClick={() =>
                            setOptions((prev) => ({ ...prev, model }))
                          }
                          className={cn(
                            "flex text-sm items-center p-1.5 cursor-default hover:bg-zinc-100",
                            {
                              "bg-zinc-100":
                                options.model.value === model.value,
                            }
                          )}
                        >
                          <Check
                            className={cn("size-4 mr-2 opacity-0", {
                              "opacity-100":
                                options.model.value === model.value,
                            })}
                          />
                          {model.label}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {[MATERIALS, FINISHES].map((choice) => (
                  <RadioGroup
                    key={choice.name}
                    value={options[choice.name]}
                    onChange={(newVal) =>
                      setOptions((prev) => ({
                        ...prev,
                        [`${choice.name}`]: newVal,
                      }))
                    }
                    className={cn()}
                  >
                    {choice.name === "material" ? (
                      <Label>Material</Label>
                    ) : (
                      <Label>Finish</Label>
                    )}
                    <div className="mt-3 flex flex-col items-center gap-3">
                      {choice.options.map((option) => (
                        <Radio
                          key={option.value}
                          value={option}
                          className={cn(
                            "relative block w-full cursor-pointer rounded-lg px-6 py-4 shadow-sm border-2 border-zinc-200 focus:outline-none ring-0 focus:ring-0 outline-none sm:flex sm:justify-between",
                            {
                              "border-primary":
                                options[choice.name].value === option.value,
                            }
                          )}
                        >
                          <span className="flex flex-col text-sm">
                            <Label className="font-medium text-gray-900">
                              {option.label}
                            </Label>
                            {option.description && (
                              <Description className="block sm:inline text-gray-500 mt-1">
                                {option.description}
                              </Description>
                            )}
                          </span>
                          <Description className="text-gray-900 mt-2 flex text-sm sm:ml-4 sm:mt-0 leading-none sm:text-right font-medium">
                            {option.price === 0
                              ? "Free"
                              : `${formatPrice(option.price / 100)}`}
                          </Description>
                        </Radio>
                      ))}
                    </div>
                  </RadioGroup>
                ))}
              </div>
            </div>
          </ScrollArea>
          <hr className="mx-8 mb-6" />

          {/* Section: Total price and submit button */}
          <div className="flex flex-row flex-nowrap justify-between w-full px-8 gap-6">
            <span className="whitespace-nowrap my-2 font-medium">
              {formatPrice(
                (BASE_PRICE + options.material.price + options.finish.price) /
                  100
              )}
            </span>
            <span className="w-[85%]">
              <Button
                // Set isLoading = true when the image isn't fully uploaded to uploadthing
                // Set a state to control whether the image is uploaded to uploadthing
                isLoading={isPending}
                loadingText="Loading"
                className="w-full"
                onClick={() =>
                  saveConfig({
                    color: options.color.value,
                    finish: options.finish.value,
                    configId: configId,
                    material: options.material.value,
                    model: options.model.value,
                  })
                }
              >
                Continue <span className="ml-1.5 font-bold">➞</span>
              </Button>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default DesignConfig;
