import { Box, MapPin, Settings, User } from "lucide-react";

export const accountLinks = [
    { label: "پروفایل", href: "/profile?tab=profile", icon: User },
    { label: "سفارش‌های من", href: "/profile?tab=orders", icon: Box },
    { label: "آدرس‌ها", href: "/profile?tab=addresses", icon: MapPin },
    { label: "تنظیمات", href: "/profile?tab=settings", icon: Settings },
];
