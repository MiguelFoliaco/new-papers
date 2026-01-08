import { Header } from "@/module/common/components/header";
import { HeaderUserActions } from "@/module/common/components/header-user-actions";
import { SearchNews } from "@/module/common/components/search";
import { CoreHome } from "@/module/home/components/core";

export default function Home() {
  return (
    <div className="w-[80%] mx-auto">
      <HeaderUserActions />
      <Header />
      <SearchNews />
      <CoreHome />
    </div>
  );
}
