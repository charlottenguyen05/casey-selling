"use client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { useUploadThing } from "@/lib/uploadthing";
import { cn } from "@/lib/utils";
import { Image, Loader2, MousePointerSquareDashed } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import Dropzone, { FileRejection } from "react-dropzone";
import Steps from "@/components/Steps";

const Page = () => {
  const { toast } = useToast();  // For notification if file type is not supported
  const [isDragOver, setIsDragOver] = useState<boolean>(false);   // For drag and drop effect
  const [isPending, startTransition] = useTransition();  // For loading effect
  const [uploadProgress, setUploadProgress] = useState(0);
  const router = useRouter();

  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    // Update the loading bar and redirect to design page after uploading
    onClientUploadComplete: (data) => {
      const configId = data[0].serverData.configId; 
      console.log("configId", configId);
      startTransition(() => {
        router.push(`/configure/design?id=${configId}`);
      });
    },
    onUploadProgress(p) {
      setUploadProgress(p);
    },
  });

  const onDropRejected = (rejectedFiles: FileRejection[]) => {
    // Notify user if file type is not supported
    const [file] = rejectedFiles;
    setIsDragOver(false);
    toast({
      title: `${file.file.type} type is not supported`,
      description: "Please choose a PNG, JPG, or JPEG image instead",
      variant: "destructive",
    });
  };

  const onDropAccepted = (acceptedFiles: File[]) => {
    // Start uploading the file
    startUpload(acceptedFiles, { configId: undefined });
    setIsDragOver(false);
  };

  return (
    // Return only drag and drop area
    <div
      className={cn(
        "relative h-full flex-1 my-10 w-full rounded-xl bg-gray-900/5 p-2 ring-2 ring-inset ring-gray-900/10 lg:rounded-2xl flex justify-center flex-col items-center",
        {
          "ring-blue-900/25 bg-blue-900/10": isDragOver,
        }
      )}
    >
      <div className="relative flex flex-1 flex-col items-center justify-center w-full">
        <Dropzone
          onDropRejected={onDropRejected}
          onDropAccepted={onDropAccepted}
          accept={{
            "image/png": [".png"],
            "image/jpeg": [".jpeg"],
            "image/jpg": [".jpg"],
          }}
          onDragOver={() => setIsDragOver(true)}
          onDragLeave={() => setIsDragOver(false)}
        >
          {({ getRootProps, getInputProps }) => (
            // getRootProps: Spread necessary props and event handlers from react-dropzone (onDropAccepted, onDragOver, etc.)
            <div
              className="h-full w-full flex-1 flex flex-col items-center justify-center"
              {...getRootProps()}
            >
              {/* getInputProps: Spread necessary props and event handlers from react-dropzone (type, accept, name, etc.) */}
              <input {...getInputProps()} /> 
              
              {isDragOver ? (
                <MousePointerSquareDashed className="size-6 text-zinc-500 mb-2" />
              ) : isPending || isUploading ? (
                <Loader2 className="size-6 animate-spin text-zinc-500 mb-2" />
              ) : (
                <Image className="size-6 text-zinc-500 mb-2"/>
              )}
              {isDragOver ? (
                <>
                  <p>
                    <span className="font-semibold">Drop file</span> in here
                  </p>
                  <p className="text-xs text-zinc-500 mt-1">PNG, JPG, JPEG</p>
                </>
              ) : isUploading ? (
                <>
                  <p>Loading ...</p>
                  <Progress
                    value={uploadProgress}
                    className="w-40 mt-2 border bg-gray-300 h-3"
                  />
                </>
              ) : isPending ? (
                <>
                  <p>Redirecting, please wait...</p>
                </>
              ) : (
                <>
                  <p>
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-zinc-500 mt-1">PNG, JPG, JPEG</p>
                </>
              )}
            </div>
          )}
        </Dropzone>
      </div>
    </div>
  );
};

export default Page;
