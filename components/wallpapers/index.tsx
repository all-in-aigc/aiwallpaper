import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getRandWallpapers, getWallpapers } from "@/models/wallpaper";

import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Wallpaper } from "@/types/wallpaper";

export default async function () {
  const wallpapers = await getWallpapers(1, 100);

  return (
    <section>
      <div className="mx-auto w-full max-w-7xl px-0 py-2 md:px-10 md:py-8 lg:py-8">
        <div className="flex flex-col items-stretch">
          <div className="gap-x-8 [column-count:1] md:grid-cols-2 md:gap-x-4 md:[column-count:3]">
            {false ? (
              <div className="text-center mx-auto py-4">loading...</div>
            ) : (
              <>
                {wallpapers &&
                  wallpapers.map((wallpaper: Wallpaper, idx: number) => {
                    return (
                      <a
                        href={`/wallpaper/${encodeURIComponent(
                          wallpaper.img_description
                        )}/${wallpaper.uuid}`}
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

                        <div className="px-5 py-4 sm:px-6">
                          <p className="flex-col text-[#808080]">
                            {wallpaper.img_description}
                          </p>
                          <div className="flex items-center mb-2 mt-6 flex-wrap gap-2 md:mb-2">
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
                        </div>
                      </a>
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
