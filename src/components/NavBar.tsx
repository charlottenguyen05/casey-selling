import MaxWidthWrapper from "./MaxWidthWrapper";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import {
  RegisterLink,
  LoginLink,
  LogoutLink
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import ThemeToggle from "./ThemeToggle";

const NavBar = async () => {

  const { getUser } = getKindeServerSession();
  let user = await getUser();
  console.log("/NavBar.tsx: getKindeServerSession(): ", user);
  let isAdmin = user?.email === process.env.ADMIN_EMAIL;

  return (
    <nav className="dark:bg-slate-800/50 dark:border-none dark:text-white sticky z-[100] top-0 bg-white/75 backdrop-blur-lg transition-all h-14 border-b border-gray-200">
      <MaxWidthWrapper className="flex justify-between items-center gap-2">
        <Link className="font-semibold" href="/">
          casey <span className="text-green-600">selling</span>
        </Link>
        <div className="flex gap-4 items-center text-xs font-semibold">
          <ThemeToggle/>
          {user ? (
            <>
              <LogoutLink
                href="/api/auth/logout"
                className={buttonVariants({
                  size: "sm",
                  variant: "ghost",
                  className: "text-xs dark:bg-transparent dark:hover:bg-slate-700",
                })}
              >
                Sign out
              </LogoutLink>
              {isAdmin ? (
                <Link
                  href="/api/dashboard"
                  className={buttonVariants({
                    size: "sm",
                    variant: "ghost",
                    className: "text-xs dark:bg-transparent dark:hover:bg-slate-700",
                  })}
                >
                  Dashboard ✨
                </Link>
              ) : (
                <Link
                  href="/configure/upload"
                  className={buttonVariants({
                    size: "sm",
                    className: "hidden dark:text-white dark:hover:bg-slate-700 sm:flex items-center gap-1 text-xs dark:bg-transparent",
                  })}
                >
                  Create case <span className="font-bold ml-2">&#10148;</span>
                </Link>
              )}
            </>
          ) : (
            <>
              <RegisterLink
                href="/api/auth/register"
                className={buttonVariants({
                  size: "sm",
                  variant: "ghost",
                  className: "text-xs dark:bg-transparent dark:hover:bg-slate-700",
                })}
              >
                Sign up
              </RegisterLink>
              <LoginLink
                href="/api/auth/login"
                className={buttonVariants({
                  size: "sm",
                  variant: "ghost",
                  className: "text-xs dark:bg-transparent dark:hover:bg-slate-700",
                })}
              >
                Login
              </LoginLink>
              <div className="border-l border-zinc-200 pl-4">
                <Link
                  href="/configure/upload"
                  className={buttonVariants({
                    size: "sm",
                    className: "hidden dark:text-white sm:flex items-center gap-1 text-xs dark:bg-transparent dark:hover:bg-slate-700",
                  })}
                >
                  Create case <span className="font-bold ml-2">&#10148;</span>
                </Link>
              </div>
            </>
          )}
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default NavBar;
