import { createBrowserRouter } from "react-router";

import RootLayout from "@/components/layouts/RootLayout";
import AuthLayout from "@/components/layouts/AuthLayout";
import GuestOnlyRoute from "@/components/GuestOnlyRoute";
import ProtectedRoute from "@/components/ProtectedRoute";

import {
    Checkout,
    Home,
    Login,
    ProductDetail,
    Products,
    Profile,
    Register,
    Search,
    Wishlist,
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
            {
                path: "wishlist",
                element: (
                    <ProtectedRoute>
                        <Wishlist />
                    </ProtectedRoute>
                ),
            },
            {
                path: "checkout",
                element: (
                    <ProtectedRoute>
                        <Checkout />
                    </ProtectedRoute>
                ),
            },
            {
                path: "profile",
                element: (
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                ),
            },
        ],
    },

    {
        element: <AuthLayout />,
        children: [
            {
                path: "signin",
                element: (
                    <GuestOnlyRoute>
                        <Login />
                    </GuestOnlyRoute>
                ),
            },
            {
                path: "signup",
                element: (
                    <GuestOnlyRoute>
                        <Register />
                    </GuestOnlyRoute>
                ),
            },
        ],
    },
]);
