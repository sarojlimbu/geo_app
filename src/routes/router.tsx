import { createBrowserRouter } from "react-router-dom";

import MainLayout from "@/layouts/MainLayout";
import { Connect, MapPage, PageNotFound, Portfolio } from "@/pages";

import routes from "./routeConfig";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: routes.MAP,
        element: <MapPage />,
      },
      {
        path: routes.PORTFOLIO,
        element: <Portfolio />,
      },
      {
        path: routes.CONNECT,
        element: <Connect />,
      },
    ],
  },
  { path: routes.PAGE_NOT_FOUND, element: <PageNotFound /> },
]);

export default router;
