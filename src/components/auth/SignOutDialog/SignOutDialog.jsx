import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { signOut } from "@/features/auth/authSlice";

const SignOutDialog = ({ open, onOpenChange }) => {
    // Get the Redux dispatch function and navigation helper
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Sign the user out and return to the home page
    const handleSignOut = async () => {
        await dispatch(signOut());
        navigate("/");
    };

    return (
        // Confirmation dialog for signing out
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    {/* Dialog title */}
                    <AlertDialogTitle>خروج از حساب کاربری</AlertDialogTitle>

                    {/* Sign-out confirmation message */}
                    <AlertDialogDescription className="text-right">
                        با خروج از حساب، دسترسی شما به بخش‌های شخصی حساب کاربری
                        مانند علاقه‌مندی‌ها و سبد خرید ذخیره‌شده در این حساب
                        متوقف می‌شود. هر زمان بخواهید می‌توانید دوباره وارد حساب
                        خود شوید.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    {/* Close the dialog without signing out */}
                    <AlertDialogCancel>انصراف</AlertDialogCancel>

                    {/* Confirm sign-out */}
                    <AlertDialogAction onClick={handleSignOut}>
                        خروج
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default SignOutDialog;
