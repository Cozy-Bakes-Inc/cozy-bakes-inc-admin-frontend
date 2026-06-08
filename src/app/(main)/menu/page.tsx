import { Suspense } from "react";
import Menu from "@/components/main/menu";
import SystemLoader from "@/components/ui/system-loader";

function MenuPage() {
  return (
    <Suspense fallback={<SystemLoader />}>
      <Menu />
    </Suspense>
  );
}

export default MenuPage;
