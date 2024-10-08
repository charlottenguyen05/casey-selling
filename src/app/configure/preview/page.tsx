"use server";
import { db } from "@/db";
import { notFound } from "next/navigation";
import DesignPreview from "./DesignPreview";
import {
  CaseColor,
  CaseFinish,
  CaseMaterial,
  PhoneModel,
} from "@prisma/client";

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

export interface DesignPreviewProps {
  croppedImgUrl: string;
  model: PhoneModel | string;
  finish: CaseFinish | string;
  color: CaseColor | string;
  material: CaseMaterial | string;
}

const Page = async ({ searchParams }: PageProps) => {
  const { id } = searchParams;
  if (!id || typeof id !== "string") {
    return notFound();
  }

  const configuration = await db.configuration.findUnique({
    where: { id },
  });

  if (!configuration) {
    return notFound();
  }

  return <DesignPreview configuration={configuration} />;
};

export default Page;
