import Hero from "@/components/hero";
import Input from "@/components/input";
import Producthunt from "@/components/producthunt";
import Wallpapers from "@/components/wallpapers";

export default async function () {
  return (
    <div className="md:mt-16">
      <div className="max-w-3xl mx-auto">
        <Hero />
        <div className="my-4 md:my-6">
          <Producthunt />
        </div>
        <div className="mx-auto my-4 flex max-w-lg justify-center">
          <Input />
        </div>
      </div>

      <div className="pt-0">
        <Wallpapers />
      </div>
    </div>
  );
}
