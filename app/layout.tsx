import "./globals.css";

import { Analytics } from "@vercel/analytics/react";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s by AI Wallpaper Generator | AI Wallpaper Shop",
    default: "AI Wallpaper Generator | AI Wallpaper Shop",
  },
  description:
    "AI Wallpaper Shop is an AI Wallpaper Generator, used to generate beautiful wallpapers with AI.",
  keywords:
    "AI Wallpaper, AI Wallpaper Shop, AI Wallpaper Generator, AI Wallpaper image, Photo Maker, Wallpaper Maker",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Toaster position="top-center" richColors />

          {children}

          <Analytics />

          {/* <script
            async
            src="https://chatgpt-umami.vercel.app/script.js"
            data-website-id="def28550-20ea-49d8-9c1a-68dbfaba0134"
          ></script> */}
        </body>
      </html>
    </ClerkProvider>
  );
}
