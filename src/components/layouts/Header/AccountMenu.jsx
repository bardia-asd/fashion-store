import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { useSelector } from "react-redux";
import { ChevronDown, LogOut, User } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";

import SignOutDialog from "@/components/auth/SignOutDialog";

import {
    selectAuthStatus,
    selectAuthUser,
} from "@/features/auth/authSelectors";

import { accountLinks } from "@/data/accountLinkData";

const AccountMenu = () => {
    const user = useSelector(selectAuthUser);
    const status = useSelector(selectAuthStatus);

    const [menuOpen, setMenuOpen] = useState(false);
    const [signOutOpen, setSignOutOpen] = useState(false);
    const location = useLocation();

    // Close the menu whenever the route changes
    useEffect(() => {
        setMenuOpen(false);
    }, [location.pathname, location.search]);

    if (status === "loading" || status === "idle")
        return <Skeleton className="w-16 h-8.5" />;

    return (
        <>
            <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
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
                    <div className="flex items-center gap-2 px-1 pb-3 mb-2 border-b">
                        <Avatar>
                            <AvatarFallback>
                                <User size={18} />
                            </AvatarFallback>
                        </Avatar>

                        <div className="flex flex-col">
                            <span className="text-xs font-semibold">
                                سلام، {user.user_metadata.name}
                            </span>
                            <span className="text-[10px] text-muted-foreground">
                                حساب کاربری شما
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-1">
                        {accountLinks.map(({ label, href, icon: Icon }) => (
                            <Link
                                key={href}
                                to={href}
                                className="flex items-center gap-2.5 px-1.5 py-2.5 rounded-sm hover:bg-muted text-xs text-muted-foreground hover:text-foreground transition-colors">
                                <Icon size={18} />
                                {label}
                            </Link>
                        ))}

                        <div className="border-t pt-1">
                            <button
                                onClick={() => setSignOutOpen(true)}
                                className="flex items-center gap-2.5 w-full px-1.5 py-2.5 rounded-sm hover:bg-muted text-xs text-muted-foreground hover:text-foreground transition-colors">
                                <LogOut size={18} />
                                خروج از حساب
                            </button>
                        </div>
                    </div>
                </DropdownMenuContent>
            </DropdownMenu>

            <SignOutDialog open={signOutOpen} onOpenChange={setSignOutOpen} />
        </>
    );
};

export default AccountMenu;
