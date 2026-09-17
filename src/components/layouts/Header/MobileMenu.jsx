import { Link } from "react-router";
import { ChevronLeft } from "lucide-react";
import { navItems } from "@/data/navData";
import { cn } from "cn";

const MobileMenu = ({ isOpen }) => {
    return (
        <div
            className={cn(
                // Position the menu below the header and hide it on desktop
                "absolute md:hidden z-40 top-full inset-x-0 grid transition-[grid-template-rows] duration-300 ease-in-out",

                // Expand/collapse the menu based on isOpen
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
            )}>
            {/* Prevent the content from overflowing while the menu is collapsed */}
            <div className="overflow-hidden">
                <nav
                    className={cn(
                        // Stack links vertically and add borders/padding
                        "flex flex-col divide-y divide-border border-y px-5 py-3 bg-background transition-opacity duration-300",

                        // Fade the menu in/out when opening or closing
                        isOpen ? "opacity-100 delay-100" : "opacity-0",
                    )}>
                    {/* Render each navigation item */}
                    {navItems.map((item) => (
                        <Link
                            key={item.label}
                            to={item.href}
                            className="flex items-center justify-between py-3 text-sm font-medium [&_svg]:text-muted-foreground">
                            {/* Navigation label */}
                            {item.label}

                            {/* Arrow indicating the navigation direction */}
                            <ChevronLeft size={14} />
                        </Link>
                    ))}
                </nav>
            </div>
        </div>
    );
};

export default MobileMenu;
