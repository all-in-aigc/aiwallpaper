import { NextResponse } from "next/server";
import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/", "/api/get-wallpapers"],

  afterAuth(auth, req, evt) {
    if (!auth.userId && !auth.isPublicRoute) {
      if (auth.isApiRoute) {
        return NextResponse.json({ message: "no auth" }, { status: 401 });
      } else {
        return NextResponse.redirect("/sign-in");
      }
    }

    return NextResponse.next();
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api)(.*)"],
};
