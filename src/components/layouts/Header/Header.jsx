import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { Heart, Menu, Search, ShoppingBag, User, XIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

import MobileMenu from "./MobileMenu";

import { navItems } from "@/data/navData";
import { formatPersianNumber } from "@/utils/formatter";

const Header = () => {
    // Controls whether the mobile navigation is open
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    // Gets the current URL path
    const { pathname } = useLocation();

    // Closes the mobile menu whenever the route changes
    useEffect(() => {
        setIsMobileOpen(false);
    }, [pathname]);

    return (
        // Sticky header that stays at the top while scrolling
        <header className="sticky z-40 top-0 h-16 md:h-20 bg-background">
            <div className="container-app h-full">
                {/* Main header row */}
                <div className="flex items-center justify-between gap-5 h-full">
                    {/* Logo */}
                    <Link
                        to="/"
                        className="text-2xl tracking-widest font-bold font-serif">
                        DBY
                    </Link>

                    {/* Desktop navigation */}
                    <nav className="hidden md:block">
                        <ul className="flex items-center gap-8">
                            {navItems.map((item) => (
                                <li key={item.label}>
                                    <Link
                                        to={item.href}
                                        className="text-xs font-semibold text-secondary-foreground">
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Header action buttons */}
                    <div className="flex gap-1">
                        {/* Search */}
                        <Button
                            variant="ghost"
                            size="icon"
                            aria-label="جستجو"
                            className="size-8.5 [&_svg:not([class*='size-'])]:size-4.5">
                            <Search />
                        </Button>

                        {/* Account */}
                        <Button
                            variant="ghost"
                            size="icon"
                            aria-label="حساب کاربری"
                            className="hidden md:inline-flex size-8.5 [&_svg:not([class*='size-'])]:size-4.5">
                            <User />
                        </Button>

                        {/* Wishlist */}
                        <Button
                            variant="ghost"
                            size="icon"
                            aria-label="علاقه‌مندی‌ها"
                            className="hidden md:inline-flex size-8.5 [&_svg:not([class*='size-'])]:size-4.5">
                            <Heart />
                        </Button>

                        {/* Shopping cart with item count */}
                        <Button
                            variant="ghost"
                            size="icon"
                            aria-label={`سبد خرید، ${formatPersianNumber(5)} کالا`}
                            className="relative size-8.5 [&_svg:not([class*='size-'])]:size-4.5">
                            <ShoppingBag />

                            {/* Cart item count badge */}
                            <span
                                aria-hidden="true"
                                className="absolute top-0 right-0 size-3 rounded-full bg-brand text-[10px] text-brand-foreground">
                                {formatPersianNumber(5)}
                            </span>
                        </Button>

                        {/* Mobile menu toggle */}
                        <Button
                            variant="ghost"
                            size="icon"
                            aria-label={
                                isMobileOpen ? "بستن منو" : "باز کردن منو"
                            }
                            className="md:hidden size-8.5 [&_svg:not([class*='size-'])]:size-4.5"
                            onClick={() => setIsMobileOpen((prev) => !prev)}>
                            {/* Switch between menu and close icons */}
                            {isMobileOpen ? <XIcon /> : <Menu />}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Mobile navigation */}
            <MobileMenu isOpen={isMobileOpen} />
        </header>
    );
};

export default Header;
