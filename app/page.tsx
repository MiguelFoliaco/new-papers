import { Header } from "@/module/common/components/header";
import { HeaderUserActions } from "@/module/common/components/header-user-actions";
import { SearchNews } from "@/module/common/components/search";
import { CoreHome } from "@/module/home/components/core";

export default function Home() {
  return (
    <div className="lg:w-[70%] w-full lg:mx-auto pb-10">
      <div className="lg:sticky lg:top-0 lg:z-20 lg:backdrop-blur-2xl">
        <HeaderUserActions />
        <Header />
      </div>
      <CoreHome />
    </div>
  );
}
