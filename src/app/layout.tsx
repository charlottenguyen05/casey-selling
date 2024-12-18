import { Recursive } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/Footer";
import ReactQueryProviders from "@/components/ReactQueryProviders";
import { constructMeta } from "@/lib/utils";
import ThemeProvider from "./ThemeProvider";

const recursive = Recursive({ subsets: ["latin"] });

export const metadata = constructMeta();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body className={recursive.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <NavBar />
          <main className="flex flex-col min-h-[calc(100vh-3.5rem-1px)] grainy-light">
            <div className="flex-1 flex flex-col h-full">
              <ReactQueryProviders>{children}</ReactQueryProviders>
            </div>
            <Footer />
          </main>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
