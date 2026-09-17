import { Home, Heart, ShoppingBag, User } from "lucide-react";

export const navItems = [
    {
        label: "مردانه",
        href: "/products",
    },
    {
        label: "زنانه",
        href: "/products",
    },
    {
        label: "جدیدها",
        href: "/products",
    },
    {
        label: "کالکشن‌ها",
        href: "/products",
    },
    {
        label: "حراج",
        href: "/products",
    },
    {
        label: "اکسسوری",
        href: "/products",
    },
];

export const mobileBottomNavItems = [
    {
        label: "خانه",
        href: "/",
        icon: Home,
    },
    {
        label: "سبد خرید",
        href: "/cart",
        icon: ShoppingBag,
    },
    {
        label: "علاقه‌مندی‌ها",
        href: "/wishlist",
        icon: Heart,
    },
    {
        label: "حساب",
        href: "/account",
        icon: User,
    },
];
