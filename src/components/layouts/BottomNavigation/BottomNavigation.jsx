import { mobileBottomNavItems } from "@/data/navData";
import { cn } from "cn";
import { NavLink } from "react-router";

const BottomNavigation = () => {
    return (
        // Fixed bottom navigation shown only on mobile
        <div className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-background p-2 h-14 border-t">
            <nav className="flex justify-around">
                {/* Render each bottom navigation item */}
                {mobileBottomNavItems.map((item) => (
                    <NavLink
                        key={item.href}
                        to={item.href}
                        className={({ isActive }) =>
                            cn(
                                // Center the icon and label inside each navigation item
                                "flex-1 flex flex-col items-center justify-center text-[10px] font-medium transition-colors",

                                // Change the text color based on the active route
                                isActive
                                    ? "text-foreground"
                                    : "text-muted-foreground",
                            )
                        }>
                        {/* Render the icon defined in the navigation data */}
                        <item.icon size={18} />

                        {/* Render the navigation label */}
                        {item.label}
                    </NavLink>
                ))}
            </nav>
        </div>
    );
};

export default BottomNavigation;
