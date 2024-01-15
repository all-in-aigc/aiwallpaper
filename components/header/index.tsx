import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

import { AppContext } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import { Tab } from "@/types/tab";
import { useContext } from "react";

export default function () {
  const { user } = useContext(AppContext);

  const navigations: Tab[] = [
    { name: "pricing", title: "Pricing", url: "/pricing" },
  ];

  return (
    <header>
      <div className="h-auto w-screen">
        <nav className="font-inter mx-auto h-auto w-full max-w-[1600px] lg:relative lg:top-0">
          <div className="flex flex-row items-center px-6 py-8 lg:flex-row lg:items-center lg:justify-between lg:px-10 lg:py-8 xl:px-20">
            <a href="/" className="text-xl font-medium flex items-center">
              <img
                src="/logo.png"
                className="w-10 h-10 rounded-full mr-3"
                alt="logo"
              />
              <span className="font-bold text-primary text-2xl">
                AI Wallpaper
              </span>
            </a>

            <div className="flex lg:hidden">
              <button
                type="button"
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Open main menu</span>
              </button>
            </div>

            <div className="hidden md:flex ml-16">
              {navigations.map((tab: Tab, idx: number) => (
                <a
                  key={idx}
                  href={tab.url}
                  className="text-md font-medium leading-6 text-gray-900"
                >
                  {tab.title}
                </a>
              ))}
            </div>

            <div className="flex-1"></div>

            <div className="flex flex-row items-center lg:flex lg:flex-row lg:space-x-3 lg:space-y-0">
              {user && user.credits && (
                <div className="hidden md:block mr-8 font-medium cursor-pointer">
                  credits:{" "}
                  <span className="text-primary">
                    {user.credits.left_credits}
                  </span>
                </div>
              )}
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
              <SignedOut>
                <a href="/sign-in">
                  <Button>Sign In</Button>
                </a>
              </SignedOut>
            </div>
            <a href="#" className="absolute right-5 lg:hidden"></a>
          </div>
        </nav>
      </div>
    </header>
  );
}
