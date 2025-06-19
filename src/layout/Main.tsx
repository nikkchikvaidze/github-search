import { Outlet } from "react-router";
import { Navigation } from "./Navigation";

function MainLayout() {
  return (
    <div>
      <Navigation />
      <Outlet />
    </div>
  );
}

export { MainLayout };
