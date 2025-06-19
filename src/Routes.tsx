import { Route, Routes as ReactRoutes } from "react-router";
import { MainRoutes } from "./config/routes";
import { MainLayout } from "./layout/Main";

function Routes() {
  return (
    <ReactRoutes>
      <Route element={<MainLayout />}>
        {MainRoutes.map((route) => {
          if (route.path === "/") {
            return <Route key={route.path} index element={<route.page />} />;
          }

          return (
            <Route
              key={route.path}
              path={route.path}
              element={<route.page />}
            />
          );
        })}
      </Route>
      <Route path="*" element={<h1>404 Page Not Found</h1>} />
    </ReactRoutes>
  );
}
export { Routes };
