import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import Social from "@/components/social";

export default function () {
  return (
    <header>
      <div className="h-auto w-screen">
        <nav className="font-inter mx-auto h-auto w-full max-w-[1600px] lg:relative lg:top-0">
          <div className="flex flex-col px-6 py-8 lg:flex-row lg:items-center lg:justify-between lg:px-10 lg:py-4 xl:px-20">
            <a href="/" className="text-xl font-medium flex items-center">
              <img
                src="/logo.png"
                className="w-10 h-10 rounded-full mr-2"
                alt="logo"
              />
              <span className="font-medium">WallGun</span>
            </a>

            <div className="flex flex-row items-center space-y-8 lg:flex lg:flex-row lg:space-x-3 lg:space-y-0">
              <div className="mr-8">
                <Social />
              </div>

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
