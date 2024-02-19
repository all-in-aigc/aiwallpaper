import Social from "@/components/social";

export default function () {
  return (
    <section>
      <div className="w-screen flex-col px-6 py-20 lg:flex lg:px-10 xl:px-24">
        <div className="lg:flex lg:flex-row lg:justify-between">
          <div>
            <p>AI Wallpaper</p>
            <p className="font-inter mt-4 max-w-[350px] text-base font-light text-gray-500">
              Generate beautiful wallpapers with AI.
            </p>
            <div className="mb-8 mt-6">
              <Social />
            </div>
          </div>
          <div className="flex grow flex-row flex-wrap lg:mx-10 lg:flex-nowrap lg:justify-center">
            <div className="my-5 mr-8 flex max-w-[200px] grow basis-[100px] flex-col space-y-5 lg:mx-10 lg:mt-0">
              <p className="font-inter font-medium text-black">Friends</p>
              <a
                href="https://gpts.works"
                target="_blank"
                className="font-inter font-light text-gray-500"
              >
                GPTs Works
              </a>
              <a
                href="https://gptalk.one"
                target="_blank"
                className="font-inter font-light text-gray-500"
              >
                GPTalk
              </a>
              <a
                href="https://readknown.cn"
                target="_blank"
                className="font-inter font-light text-gray-500"
              >
                ZKnown
              </a>
            </div>
            <div className="my-5 mr-8 flex max-w-[200px] grow basis-[100px] flex-col space-y-5 lg:mx-10 lg:mt-0">
              <p className="font-inter font-medium text-black">Credit to</p>
              <a
                href="https://aicover.design"
                target="_blank"
                className="font-inter font-light text-gray-500"
              >
                AI Cover
              </a>
            </div>
          </div>

          <div className="mt-10 flex flex-col lg:mt-0">
            <div className="mb-4 flex flex-col items-center">
              <p className="font-inter font-medium text-black">Contact me</p>
              <p className="font-inter ml-4 text-black">
                <img
                  src={
                    "https://zknown-1251007641.cos.ap-guangzhou.myqcloud.com/images/20240130090120.png"
                  }
                  alt="qrcode"
                  width={"250"}
                  height={"400"}
                />
              </p>
            </div>
          </div>
        </div>
        <div className="mx-auto my-12 w-full border border-[#E4E4E7] lg:my-20"></div>
        <div>
          <p className="font-inter text-center text-sm text-gray-500 lg:mt-0">
            © Copyright 2024.{" "}
            <a
              href="https://aiwallpaper.shop"
              target="_blank"
              className="text-primary hidden md:inline-block"
            >
              aiwallpaper.shop
            </a>{" "}
            All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
}
