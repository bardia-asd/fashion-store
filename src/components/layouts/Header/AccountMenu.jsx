import { Link } from "react-router";
import { Box, ChevronDown, LogOut, MapPin, Settings, User } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const AccountMenu = () => {
    return (
        // Dropdown containing the user's account actions
        <DropdownMenu>
            {/* User button that opens the account menu */}
            <DropdownMenuTrigger
                render={
                    <Button
                        variant="ghost"
                        aria-label="حساب کاربری"
                        className="hidden md:inline-flex h-8.5 [&_svg:not([class*='size-'])]:size-4.5">
                        <User />
                        <ChevronDown />
                    </Button>
                }
            />

            <DropdownMenuContent className="w-60 p-4">
                {/* User information shown at the top of the menu */}
                <div className="flex items-center gap-2 px-1 pb-3 mb-2 border-b">
                    <Avatar>
                        <AvatarFallback>
                            <User size={18} />
                        </AvatarFallback>
                    </Avatar>

                    <div className="flex flex-col">
                        <span className="text-xs font-semibold">
                            سلام، سارا
                        </span>
                        <span className="text-[10px] text-muted-foreground">
                            حساب کاربری شما
                        </span>
                    </div>
                </div>

                {/* Account navigation links */}
                <div className="flex flex-col gap-1">
                    {/* Account overview */}
                    <Link
                        to="/account"
                        className="flex items-center gap-2.5 px-1.5 py-2.5 rounded-sm hover:bg-muted text-xs text-muted-foreground hover:text-foreground transition-colors">
                        <User size={18} />
                        حساب من
                    </Link>

                    {/* User orders */}
                    <Link
                        to="/account?tab=orders"
                        className="flex items-center gap-2.5 px-1.5 py-2.5 rounded-sm hover:bg-muted text-xs text-muted-foreground hover:text-foreground transition-colors">
                        <Box size={18} />
                        سفارش‌های من
                    </Link>

                    {/* Saved addresses */}
                    <Link
                        to="/account?tab=addresses"
                        className="flex items-center gap-2.5 px-1.5 py-2.5 rounded-sm hover:bg-muted text-xs text-muted-foreground hover:text-foreground transition-colors">
                        <MapPin size={18} />
                        آدرس‌ها
                    </Link>

                    {/* Account settings */}
                    <Link
                        to="/account?tab=settings"
                        className="flex items-center gap-2.5 py-2.5 px-1.5 rounded-sm hover:bg-muted text-xs text-muted-foreground hover:text-foreground transition-colors">
                        <Settings size={18} />
                        تنظیمات
                    </Link>

                    {/* Logout action */}
                    <div className="border-t pt-1">
                        <button className="flex items-center gap-2.5 w-full px-1.5 py-2.5 rounded-sm hover:bg-muted text-xs text-muted-foreground hover:text-foreground transition-colors">
                            <LogOut size={18} />
                            خروج از حساب
                        </button>
                    </div>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default AccountMenu;
