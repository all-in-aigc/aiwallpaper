"use client";

import { useEffect, useState } from "react";

import Footer from "@/components/footer";
import Header from "@/components/header";
import Hero from "@/components/hero";
import Input from "@/components/input";
import Producthunt from "@/components/producthunt";
import { User } from "@/types/user";
import { Wallpaper } from "@/types/wallpaper";
import Wallpapers from "@/components/wallpapers";
import { toast } from "sonner";

export default function Home() {
  const [wallpapers, setWallpapers] = useState<Wallpaper[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchUserInfo = async function () {
    try {
      const uri = "/api/get-user-info";
      const params = {};

      const resp = await fetch(uri, {
        method: "POST",
        body: JSON.stringify(params),
      });

      if (resp.ok) {
        const res = await resp.json();
        if (res.data) {
          setUser(res.data);
          return;
        }
      }

      toast.error("get user info failed");
    } catch (e) {
      console.log("get user info failed: ", e);
      toast.error("get user info failed");
    }
  };

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
    // fetchUserInfo();
    fetchWallpapers(1);
  }, []);

  return (
    <div className="w-screen h-screen">
      <div className="bg-secondary md:pb-10">
        <Header />
        <section>
          <div className="mx-auto w-full max-w-7xl overflow-hidden px-5 py-10 md:px-10 lg:px-20 lg:py-2">
            <div className="flex flex-col items-center pt-0 lg:pt-20">
              <div className="max-w-3xl">
                <Hero />
                <Producthunt />
                <div className="mx-auto mb-4 flex max-w-lg justify-center">
                  <Input
                    wallpapers={wallpapers}
                    setWallpapers={setWallpapers}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="pt-10">
        <Wallpapers wallpapers={wallpapers} loading={loading} />
      </div>
      <Footer />
    </div>
  );
}
