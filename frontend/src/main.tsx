import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ApiProvider } from "./context/ApiContext.tsx";

// routes
import Home from "./routes/Home.tsx";
import CategoryProducts from "./routes/Product/CategoryProducts.tsx";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/products/:categoryName",
        element: <CategoryProducts />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApiProvider>
      <RouterProvider router={router}></RouterProvider>
    </ApiProvider>
  </StrictMode>
);
