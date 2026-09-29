import { Link } from "react-router";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

const EmptyCart = () => {
    return (
        <div className="flex min-h-[50vh] flex-col items-center justify-center px-6 py-16 text-center">
            <div className="mb-6 flex size-16 items-center justify-center rounded-full bg-muted">
                <ShoppingBag className="size-7 text-muted-foreground" />
            </div>

            <h2 className="text-xl font-semibold tracking-tight">
                سبد خرید شما خالی است
            </h2>

            <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
                هنوز محصولی به سبد خرید خود اضافه نکرده‌اید.
            </p>

            <Button
                className="mt-6"
                nativeButton={false}
                render={<Link to="/products">مشاهده محصولات</Link>}
            />
        </div>
    );
};

export default EmptyCart;
