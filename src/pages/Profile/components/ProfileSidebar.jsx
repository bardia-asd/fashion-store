import { useSelector } from "react-redux";
import { NavLink } from "react-router";
import { ChevronLeft } from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import SignOutDialog from "@/components/auth/SignOutDialog";
import { selectAuthUser } from "@/features/auth/authSelectors";
import { accountLinks } from "@/data/accountLinkData";
import { cn } from "cn";

const ProfileSidebar = () => {
    // Get the currently authenticated user from Redux
    const user = useSelector(selectAuthUser);

    return (
        // Profile sidebar containing user information and account navigation
        <aside>
            <Card className="px-4">
                {/* Display the user's avatar, name, and email */}
                <CardHeader className="flex flex-row items-center border-b px-0">
                    <Avatar className="size-10">
                        {/* Use the first letter of the user's name as the avatar fallback */}
                        <AvatarFallback>
                            {user?.user_metadata.name[0]}
                        </AvatarFallback>
                    </Avatar>

                    <div>
                        {/* User's display name */}
                        <CardTitle className="text-sm">
                            {user?.user_metadata.name}
                        </CardTitle>

                        {/* User's email address */}
                        <CardDescription className="text-[10px]">
                            {user.email}
                        </CardDescription>
                    </div>
                </CardHeader>

                <CardContent className="px-0 flex flex-col gap-1">
                    {/* Render navigation links for account sections */}
                    {accountLinks.map((link) => (
                        <NavLink
                            key={link.href}
                            to={link.href}
                            end={link.href === "/profile"}
                            className={({ isActive }) =>
                                cn(
                                    "flex items-center gap-2 p-3 rounded-md",
                                    isActive
                                        ? "bg-primary text-primary-foreground"
                                        : "text-muted-foreground hover:bg-muted hover:text-foreground",
                                )
                            }>
                            {/* Icon representing the account section */}
                            <link.icon size={18} />

                            {/* Account section label */}
                            <span className="flex-1">{link.label}</span>

                            {/* Navigation indicator */}
                            <ChevronLeft size={14} />
                        </NavLink>
                    ))}
                </CardContent>

                {/* Sign-out action */}
                <CardFooter className="bg-card px-0">
                    <SignOutDialog />
                </CardFooter>
            </Card>
        </aside>
    );
};

export default ProfileSidebar;
