"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FaDownload } from "react-icons/fa";
import Image from "next/image";
import { Wallpaper } from "@/types/wallpaper";
import { toast } from "sonner";

interface Props {
  wallpapers: Wallpaper[] | null;
  loading: boolean;
}

export default function ({ wallpapers, loading }: Props) {
  return (
    <section>
      <div className="mx-auto w-full max-w-7xl px-0 py-2 md:px-10 md:py-8 lg:py-8">
        <div className="flex flex-col items-stretch">
          <div className="gap-x-8 [column-count:1] md:grid-cols-2 md:gap-x-4 md:[column-count:3]">
            {loading ? (
              <div className="text-center mx-auto py-4">loading...</div>
            ) : (
              <>
                {wallpapers &&
                  wallpapers.map((wallpaper: Wallpaper, idx: number) => {
                    return (
                      <div
                        key={idx}
                        className="rounded-xl overflow-hidden mb-4 inline-block border border-solid border-[#cdcdcd] md:mb-8 lg:mb-10"
                      >
                        <Image
                          src={wallpaper.img_url}
                          alt={wallpaper.img_description}
                          width={350}
                          height={200}
                          loading="lazy"
                        />

                        <div className="px-5 py-8 sm:px-6">
                          <p className="flex-col text-[#808080]">
                            {wallpaper.img_description}
                          </p>
                          <div className="flex items-center mb-5 mt-6 flex-wrap gap-2 md:mb-6 lg:mb-8">
                            <Badge variant="secondary">
                              {wallpaper.img_size}
                            </Badge>

                            <div className="flex-1"></div>
                            <Avatar>
                              <AvatarImage
                                src={wallpaper.created_user?.avatar_url}
                                alt={wallpaper.created_user?.nickname}
                              />
                              <AvatarFallback>
                                {wallpaper.created_user?.nickname}
                              </AvatarFallback>
                            </Avatar>
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
                              <Button>Copy Prompt</Button>
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
