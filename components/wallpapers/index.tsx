"use client";

import { CopyToClipboard } from "react-copy-to-clipboard";
import { FaDownload } from "react-icons/fa";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Wallpaper } from "@/types/wallpaper";
import { toast } from "sonner";

interface Props {
  wallpapers: Wallpaper[] | null;
  loading: boolean;
}

export default function ({ wallpapers, loading }: Props) {
  return (
    <section>
      <div className="mx-auto w-full max-w-5xl px-5 py-16 md:px-10 md:py-8 lg:py-8">
        <div className="flex flex-col items-stretch">
          <div className="gap-x-8 [column-count:1] md:grid-cols-2 md:gap-x-4 md:[column-count:2]">
            {loading ? (
              <div className="text-center mx-auto py-4">loading...</div>
            ) : (
              <>
                {wallpapers &&
                  wallpapers.map((wallpaper: Wallpaper, idx: number) => {
                    return (
                      <div
                        key={idx}
                        className="mb-12 inline-block border border-solid border-[#cdcdcd] md:mb-8 lg:mb-10"
                      >
                        <LazyLoadImage
                          src={wallpaper.img_url}
                          placeholderSrc={`/template.png`}
                          alt={wallpaper.img_description}
                          className="inline-block"
                        />

                        <div className="px-5 py-8 sm:px-6">
                          <p className="flex-col text-[#808080]">
                            {wallpaper.img_description}
                          </p>
                          <div className="mb-5 mt-6 flex flex-wrap gap-2 md:mb-6 lg:mb-8">
                            <div className="rounded-sm bg-[#d9d9d9] p-2 text-sm font-semibold uppercase text-[#636262]">
                              <p>{wallpaper.img_size}</p>
                            </div>
                          </div>
                          <div className="flex flex-wrap items-center justify-between gap-4">
                            <a
                              href={wallpaper.img_url}
                              className="flex items-center max-w-full gap-2.5 text-sm font-bold uppercase text-black"
                            >
                              <p>Download</p>
                              <p className="text-sm">
                                <FaDownload />
                              </p>
                            </a>
                            <CopyToClipboard
                              text={wallpaper.img_description}
                              onCopy={() => toast.success("Copied")}
                            >
                              <span className="cursor-pointer inline-block rounded-md bg-black px-6 py-3 text-center font-semibold text-white">
                                Copy Prompt
                              </span>
                            </CopyToClipboard>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
