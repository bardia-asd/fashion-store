import { createBrowserRouter } from "react-router";

import RootLayout from "@/components/layouts/RootLayout";
import AuthLayout from "@/components/layouts/AuthLayout";

import {
    Home,
    Login,
    ProductDetail,
    Products,
    Register,
    Search,
} from "@/pages";

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

    {
        element: <AuthLayout />,
        children: [
            { path: "signin", element: <Login /> },
            { path: "signup", element: <Register /> },
        ],
    },
]);
