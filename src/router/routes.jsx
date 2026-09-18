import { createBrowserRouter } from "react-router";

import RootLayout from "@/components/layouts/RootLayout";

import { Home, ProductDetail, Products, Search } from "@/pages";

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
