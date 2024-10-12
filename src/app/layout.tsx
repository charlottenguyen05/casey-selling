import type { Metadata } from "next";
import { Inter, Recursive } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";
import { constructMeta } from "@/lib/utils";

const recursive = Recursive({ subsets: ["latin"] });

export const metadata = constructMeta()

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={recursive.className}>
        <NavBar />
        <main className="flex flex-col min-h-[calc(100vh-3.5rem-1px)] grainy-light">
          <div className="flex-1 flex flex-col h-full">
            <Providers>{children}</Providers>
          </div>
          <Footer />
        </main>
        <Toaster />
      </body>
    </html>
  );
}
