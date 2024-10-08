"use server";
import { notFound } from "next/navigation";
import { db } from "@/db/index";
import DesignConfig from "./DesignConfig";

interface PageProps {
  searchParams: {
    // Search params return an array of object with key: string and value: string/string[]/undefined
    [keys: string]: string | string[] | undefined;
  };
}

const Page = async ({ searchParams }: PageProps) => {
  const { id } = searchParams;
  if (!id || typeof id !== "string") {
    return notFound();
  }

  // !!Always fetching db in the server side
  const configuration = await db.configuration.findUnique({
    where: {
      id,
    },
  });

  if (!configuration) {
    return notFound();
  }

  const { imageUrl, width, height } = configuration;

  return (
    <DesignConfig
      configId={configuration.id}
      imageDimension={{ width, height }}
      imgUrl={imageUrl}
    />
  );
};
export default Page;
