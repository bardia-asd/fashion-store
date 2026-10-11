import { createBrowserRouter, Navigate } from "react-router";

import RootLayout from "@/components/layouts/RootLayout";
import AuthLayout from "@/components/layouts/AuthLayout";
import GuestOnlyRoute from "@/components/GuestOnlyRoute";
import ProtectedRoute from "@/components/ProtectedRoute";

import {
    Checkout,
    DeliveryStep,
    Home,
    Login,
    OrderSuccess,
    PaymentStep,
    ProductDetail,
    Products,
    Profile,
    ProfileAddresses,
    ProfileOrders,
    ProfileOverview,
    ProfileSettings,
    Register,
    ReviewStep,
    Search,
    ShippingStep,
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
                children: [
                    {
                        index: true,
                        element: <Navigate to="shipping" replace />,
                    },
                    { path: "shipping", element: <ShippingStep /> },
                    { path: "delivery", element: <DeliveryStep /> },
                    { path: "payment", element: <PaymentStep /> },
                    { path: "review", element: <ReviewStep /> },
                ],
            },
            {
                path: "profile",
                element: (
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                ),
                children: [
                    { index: true, element: <ProfileOverview /> },
                    { path: "orders", element: <ProfileOrders /> },
                    { path: "addresses", element: <ProfileAddresses /> },
                    { path: "settings", element: <ProfileSettings /> },
                ],
            },
        ],
    },

    {
        path: "success-order/:id",
        element: (
            <ProtectedRoute>
                <OrderSuccess />
            </ProtectedRoute>
        ),
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
