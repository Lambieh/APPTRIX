import {
  createBrowserRouter,
  RouterProvider,
  Link,
  createHashRouter,
} from "react-router-dom";
import { Layout } from "./Components/Layout/Layout";
import { Suspense, lazy } from "react";
import PrivateRoute from "./Components/Auth/PrivateRoute";
const LazyLogin = lazy(() => import("./Pages/Login"));
const LazyHome = lazy(() => import("./Pages/Home"));
const LazyRegistration = lazy(() => import("./Pages/Registration"));
const LazyMenu = lazy(() => import("./Pages/Menu"));
const LazyCart = lazy(() => import("./Pages/CartPage"));
const LazyOrder = lazy(() => import("./Pages/Order"));

const router = createHashRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Layout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <LazyHome />,
      },
      {
        path: "menu",
        element: <LazyMenu />,
      },
      {
        path: "cart",
        element: <LazyCart />,
      },
      {
        path: "order/:id",
        element: <LazyOrder />,
      },
    ],
  },
  {
    path: "login",
    element: <LazyLogin />,
  },
  {
    path: "registration",
    element: <LazyRegistration />,
  },
]);

export const AppRouterProvider = () => {
  return (
    <Suspense fallback={<></>}>
      <RouterProvider router={router} />
    </Suspense>
  );
};
