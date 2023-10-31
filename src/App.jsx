import React from "react";
import {
  Home,
  AllProducts,
  AddNewProduct,
  ProductDetails,
  CheckOut,
} from "./pages";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "/",
        element: <AllProducts />,
      },
      {
        path: "/add-product",
        element: <AddNewProduct />,
      },
      {
        path: "/product-details/:id",
        element: <ProductDetails />,
      },
      {
        path: "/check-out",
        element: <CheckOut />,
      },
    ],
  },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
};

export default App;
