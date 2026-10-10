import { Box, MapPin, Settings, User } from "lucide-react";

export const accountLinks = [
    { label: "پروفایل", href: "/profile", icon: User },
    { label: "سفارش‌های من", href: "/profile/orders", icon: Box },
    { label: "آدرس‌ها", href: "/profile/addresses", icon: MapPin },
    { label: "تنظیمات", href: "/profile/settings", icon: Settings },
];
