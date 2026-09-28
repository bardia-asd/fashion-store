import { Home, Heart, User } from "lucide-react";

export const navItems = [
    {
        label: "مردانه",
        href: "/products?category=men",
    },
    {
        label: "زنانه",
        href: "/products?category=women",
    },
    {
        label: "جدیدها",
        href: "/products?category=new-arrivals",
    },
    {
        label: "کالکشن‌ها",
        href: "/products?category=collections",
    },
    {
        label: "حراج",
        href: "/products?category=sale",
    },
    {
        label: "اکسسوری",
        href: "/products?category=accessories",
    },
];

export const mobileBottomNavItems = [
    {
        label: "خانه",
        href: "/",
        icon: Home,
    },
    {
        label: "علاقه‌مندی‌ها",
        href: "/wishlist",
        icon: Heart,
    },
    {
        label: "حساب",
        href: "/profile",
        icon: User,
    },
];
