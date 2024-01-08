"use client";

import {
  Dispatch,
  KeyboardEvent,
  SetStateAction,
  useRef,
  useState,
} from "react";

import { Wallpaper } from "@/types/wallpaper";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface Props {
  wallpapers: Wallpaper[];
  setWallpapers: Dispatch<SetStateAction<Wallpaper[]>>;
}

export default function ({ setWallpapers }: Props) {
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [wallpaper, setWallpaper] = useState<Wallpaper | null>(null);
  const router = useRouter();

  const requestGenWallpaper = async function () {
    try {
      const uri = "/api/protected/gen-wallpaper";
      const params = {
        description: description,
      };

      setLoading(true);
      const resp = await fetch(uri, {
        method: "POST",
        body: JSON.stringify(params),
      });
      setLoading(false);

      if (resp.status === 401) {
        toast.error("Please Sign In");
        router.push("/sign-in");
        return;
      }
      console.log("gen wallpaper resp", resp);

      if (resp.ok) {
        const res = await resp.json();
        if (res.data && res.data.img_url) {
          const wallpaper: Wallpaper = res.data;
          setWallpaper(wallpaper);
          setWallpapers((wallpapers: Wallpaper[]) => [
            wallpaper,
            ...wallpapers,
          ]);
          setDescription("");
          toast.success("gen wallpaper ok");
          return;
        }
      }

      toast.error("gen wallpaper failed");
    } catch (e) {
      console.log("search failed: ", e);
      toast.error("gen wallpaper failed");
    }
  };

  const handleInputKeydown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter" && !e.shiftKey) {
      if (e.keyCode !== 229) {
        e.preventDefault();
        handleSubmit();
      }
    }
  };

  const handleSubmit = function () {
    if (!description) {
      toast.error("invalid image description");
      inputRef.current?.focus();
      return;
    }

    requestGenWallpaper();
  };

  return (
    <div className="flex flex-col w-full">
      <form
        name="email-form"
        method="get"
        className="flex w-full flex-col gap-3 sm:flex-row"
        onSubmit={() => {
          return false;
        }}
      >
        <input
          type="text"
          className="h-9 w-full rounded-md border border-solid border-black px-4 py-6 text-sm text-[#333333]"
          placeholder="Wallpaper description"
          onChange={(e) => setDescription(e.target.value)}
          onKeyDown={handleInputKeydown}
          disabled={loading}
          ref={inputRef}
        />
        <input
          type="button"
          value={loading ? "Generating..." : "Generate"}
          className="cursor-pointer rounded-md bg-black px-6 py-2 font-semibold text-white disabled:bg-gray-300"
          disabled={loading}
          onClick={handleSubmit}
        />
      </form>
    </div>
  );
}
