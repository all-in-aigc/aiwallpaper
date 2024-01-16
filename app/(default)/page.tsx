"use client";

import { useContext, useEffect, useState } from "react";

import Hero from "@/components/hero";
import Input from "@/components/input";
import Producthunt from "@/components/producthunt";
import { Wallpaper } from "@/types/wallpaper";
import Wallpapers from "@/components/wallpapers";
import { toast } from "sonner";
import { AppContext } from "@/contexts/AppContext";

export default function () {
  const { user } = useContext(AppContext);
  const [wallpapers, setWallpapers] = useState<Wallpaper[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchWallpapers = async function (page: number) {
    try {
      const uri = "/api/get-wallpapers";
      const params = {
        page: page,
        limit: 50,
      };

      setLoading(true);
      const resp = await fetch(uri, {
        method: "POST",
        body: JSON.stringify(params),
      });
      setLoading(false);

      if (resp.ok) {
        const res = await resp.json();
        console.log("get wallpapers result: ", res);
        if (res.data) {
          setWallpapers(res.data);
          return;
        }
      }

      toast.error("get wallpapers failed");
    } catch (e) {
      console.log("get wallpapers failed: ", e);
      toast.error("get wallpapers failed");
    }
  };

  useEffect(() => {
    fetchWallpapers(1);
  }, []);

  return (
    <div className="md:mt-16">
      <div className="max-w-3xl mx-auto">
        <Hero />
        <div className="my-4 md:my-6">
          <Producthunt />
        </div>
        <div className="mx-auto my-4 flex max-w-lg justify-center">
          <Input wallpapers={wallpapers} setWallpapers={setWallpapers} />
        </div>
      </div>

      <div className="pt-0">
        <Wallpapers wallpapers={wallpapers} loading={loading} />
      </div>
    </div>
  );
}
