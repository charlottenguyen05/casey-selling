import MaxWidthWrapper from "./MaxWidthWrapper";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="dark:bg-slate-800/50 dark:border-none bg-white h-20 border-t border-gray-200 text-muted-foreground text-sm dark:text-white">
      <MaxWidthWrapper className="flex flex-col sm:flex-row sm:justify-around md:justify-between justify-center items-center leading-7">
        <p className="text-center">© 2024 All rights reserved</p>
        <div className="flex justify-center gap-x-10 sm:gap-x-8 items-center ">
          <Link
            href="/"
            className="hover:text-black dark:hover:bg-slate-700 dark:hover:text-white p-2 rounded-lg"
          >
            Terms
          </Link>
          <Link
            href="/"
            className="hover:text-black dark:hover:bg-slate-700 dark:hover:text-white p-2 rounded-lg"
          >
            Privacy Policy
          </Link>
          <Link
            href="/"
            className="hover:text-black dark:hover:bg-slate-700 dark:hover:text-white p-2 rounded-lg"
          >
            Cookie Policy
          </Link>
        </div>
      </MaxWidthWrapper>
    </footer>
  );
};

export default Footer;
