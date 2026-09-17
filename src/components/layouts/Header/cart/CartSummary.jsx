import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { formatPersianNumber } from "@/utils/formatter";
import { Link } from "react-router";

const CartSummary = () => {
    // Prevent the coupon form from submitting and reloading the page
    const handleApplyCoupon = (e) => {
        e.preventDefault();
    };

    return (
        <>
            {/* Coupon input and discount status */}
            <div>
                <form onSubmit={handleApplyCoupon} className="flex gap-2 mb-4">
                    <Input
                        name="coupon"
                        placeholder="کد تخفیف"
                        aria-label="کد تخفیف"
                        className="rounded-full h-8.5"
                    />

                    <Button type="submit" className="rounded-full h-8.5">
                        اعمال
                    </Button>
                </form>

                {/* Display applied coupon discount */}
                <span className="inline-flex items-center gap-1 text-success text-xs">
                    <Check size={12} />
                    {formatPersianNumber(10)}% تخفیف اعمال شد
                </span>
            </div>

            {/* Cart price breakdown */}
            <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>جمع جزء</span>
                    <span>{formatPersianNumber(150000)}</span>
                </div>

                {/* Applied discount amount */}
                <div className="flex items-center justify-between text-sm text-success">
                    <span>تخفیف</span>
                    <span>{formatPersianNumber(15000)}</span>
                </div>

                {/* Shipping cost */}
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>هزینه ارسال</span>
                    <span>{formatPersianNumber(150000)}</span>
                </div>
            </div>

            {/* Final total and checkout action */}
            <div className="flex flex-col gap-4 pt-2 border-t">
                <div className="flex items-center justify-between font-bold">
                    <span>مجموع</span>

                    {/* Display the final price with its currency */}
                    <p>
                        {formatPersianNumber(125000)}{" "}
                        <span className="font-normal text-xs">تومان</span>
                    </p>
                </div>

                {/* Navigate to checkout */}
                <Button
                    className="w-full h-13 rounded-2xl"
                    nativeButton={false}
                    render={<Link to="/checkout">تسویه حساب</Link>}
                />
            </div>
        </>
    );
};

export default CartSummary;
