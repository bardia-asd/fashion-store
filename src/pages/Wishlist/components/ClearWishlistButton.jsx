import PropTypes from "prop-types";
import { toast } from "sonner";
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useClearWishlistMutation } from "@/features/wishlist/wishlistApi";

const ClearWishlistButton = ({ userId }) => {
    const [clearWishlist, { isLoading }] = useClearWishlistMutation();

    const handleClear = async () => {
        try {
            await clearWishlist(userId).unwrap();
            toast.success("لیست علاقه‌مندی‌ها پاک شد");
        } catch (err) {
            toast.error(err?.error ?? "خطا در پاک کردن لیست");
        }
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger
                render={
                    <Button variant="outline" size="sm" disabled={isLoading}>
                        حذف همه
                    </Button>
                }
            />

            <AlertDialogContent>
                <AlertDialogHeader className="text-right">
                    <AlertDialogTitle>حذف همه موارد</AlertDialogTitle>

                    <AlertDialogDescription className="text-right">
                        همه محصولات از لیست علاقه‌مندی‌های شما حذف خواهند شد.
                        این عملیات قابل بازگشت نیست.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter className="sm:justify-start">
                    <AlertDialogAction
                        variant="destructive"
                        onClick={handleClear}
                        disabled={isLoading}>
                        {isLoading ? "در حال حذف..." : "حذف همه"}
                    </AlertDialogAction>

                    <AlertDialogCancel disabled={isLoading}>
                        انصراف
                    </AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

ClearWishlistButton.propTypes = {
    userId: PropTypes.string.isRequired,
};

export default ClearWishlistButton;
