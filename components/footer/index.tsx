import Social from "@/components/social";

export default function () {
  return (
    <footer className="block">
      <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-24 lg:py-32">
        <div className="flex flex-col items-center">
          <a className="text-primary font-bold mb-8 inline-block max-w-full text-black text-xl">
            AI Wallpaper
          </a>
          <div className="max-[991px]: text-center font-normal max-[991px]:py-1">
            Generate beautiful wallpapers with AI.
          </div>
          <div className="mb-8 mt-8 w-48 [border-bottom:1px_solid_rgb(0,_0,_0)]"></div>
          <div className="mb-12 w-full max-w-[208px] grid-flow-col grid-cols-4 gap-3 flex items-center justify-center">
            <Social />
          </div>
          <p className="max-[479px]:text-sm">
            © Copyright 2024.{" "}
            <a
              href="https://aiwallpaper.shop"
              target="_blank"
              className="text-primary block md:inline-block my-2 md:mx-1"
            >
              aiwallpaper.shop
            </a>{" "}
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
