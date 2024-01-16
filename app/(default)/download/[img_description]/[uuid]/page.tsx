import { currentUser } from "@clerk/nextjs";
import { findWallpaperByUuid } from "@/models/wallpaper";
import { getUserCredits } from "@/services/order";
import { redirect } from "next/navigation";

export default async function ({
  params,
}: {
  params: { uuid: string; img_description: string };
}) {
  const wallpaper = await findWallpaperByUuid(params.uuid);
  if (!wallpaper || !wallpaper) {
    return (
      <p className="flex items-center justify-center py-16 text-xl">
        invalid params
      </p>
    );
  }

  const user = await currentUser();
  if (!user || !user.emailAddresses || user.emailAddresses.length === 0) {
    return (
      <p className="flex items-center justify-center py-16 text-xl">
        user not login
      </p>
    );
  }

  const user_email = user.emailAddresses[0].emailAddress;
  const credits = await getUserCredits(user_email);
  if (!credits || credits.left_credits < 1) {
    return (
      <p className="flex items-center justify-center py-16 text-xl">
        credits not enough
      </p>
    );
  }

  const img_url = wallpaper.img_url;

  redirect(img_url);
}
