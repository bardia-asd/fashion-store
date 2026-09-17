import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { Heart, Menu, Search, User, XIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

import MobileMenu from "./MobileMenu";
import CartDrawer from "./cart";
import AccountMenu from "./AccountMenu";
import SearchOverlay from "./search/SearchOverlay";

import { navItems } from "@/data/navData";

const Header = () => {
    // Controls whether the mobile navigation is open
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    // Gets the current URL path
    const { pathname, search } = useLocation();

    // Closes the mobile menu whenever the route changes
    useEffect(() => {
        setIsMobileOpen(false);
    }, [pathname, search]);

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
                        <SearchOverlay />

                        {/* Account */}
                        <AccountMenu />

                        {/* Wishlist */}
                        <Button
                            variant="ghost"
                            size="icon"
                            aria-label="علاقه‌مندی‌ها"
                            className="hidden md:inline-flex size-8.5 [&_svg:not([class*='size-'])]:size-4.5">
                            <Heart />
                        </Button>

                        {/* Shopping cart*/}
                        <CartDrawer />

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
