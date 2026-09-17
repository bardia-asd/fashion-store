import { createBrowserRouter } from "react-router";

import RootLayout from "@/components/layouts/RootLayout";

import Home from "@/pages/Home";
import Products from "@/pages/Products";
import ProductDetail from "@/pages/ProductDetail";
import Search from "@/pages/Search";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            { index: true, element: <Home /> },
            { path: "products", element: <Products /> },
            { path: "products/:productSlug", element: <ProductDetail /> },
            { path: "search", element: <Search /> },
        ],
    },
]);
