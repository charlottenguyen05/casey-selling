import MaxWidthWrapper from "./MaxWidthWrapper";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-white h-20 border-t border-gray-200 text-muted-foreground text-sm">
      <MaxWidthWrapper className="flex flex-col sm:flex-row sm:justify-around md:justify-between justify-center items-center leading-7">
        <p className="text-center">
          © 2024 All rights reserved
        </p>
        <div className="flex justify-center gap-x-10 sm:gap-x-8 items-center ">
          <Link href="/" className="hover:text-black">Terms</Link>
          <Link href="/" className="hover:text-black">Privacy Policy</Link>
          <Link href="/" className="hover:text-black">Cookie Policy</Link>
        </div>
      </MaxWidthWrapper>
    </footer>
  );
};

export default Footer;
