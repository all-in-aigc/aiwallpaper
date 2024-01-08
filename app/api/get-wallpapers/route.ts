import { respData, respErr } from "@/lib/resp";

import { getWallpapers } from "@/models/wallpaper";

export async function POST(req: Request) {
  try {
    const { page } = await req.json();
    const wallpapers = await getWallpapers(page || 1, 100);

    return respData(wallpapers);
  } catch (e) {
    console.log("get wallpapers failed: ", e);
    return respErr("get wallpapers failed");
  }
}
