import { useState } from "react";
import { Check, Info } from "lucide-react";
import PropTypes from "prop-types";
import { Link } from "react-router";

import { Button } from "@/components/ui/button";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
} from "@/components/ui/input-group";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

import { formatPersianNumber } from "@/utils/formatter";
import { usePromoCode } from "@/hooks/usePromoCode";

const SHIPPING_COST = 150000;

const promoCodes = [
    { code: "WELCOME15", discount: "۱۵٪" },
    { code: "DBY20", discount: "۲۰٪" },
    { code: "SUMMER25", discount: "۲۵٪" },
    { code: "NEWUSER10", discount: "۱۰٪" },
    { code: "FASHION15", discount: "۱۵٪" },
];

const CartSummary = ({ subTotal, cartItemCount }) => {
    const [code, setCode] = useState("");
    const {
        promoCode,
        discount,
        error,
        isApplying,
        applyPromoCode,
        removePromoCode,
    } = usePromoCode(subTotal);

    const total = subTotal - discount + SHIPPING_COST;

    // Prevent the coupon form from submitting and reloading the page
    const handleApplyCoupon = async (e) => {
        e.preventDefault();

        await applyPromoCode(code);
    };

    const handleRemoveCoupon = async () => {
        await removePromoCode();
        setCode("");
    };

    return (
        <>
            {/* Coupon input and discount status */}
            <div>
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <InputGroup className="rounded-full h-8.5">
                        <Popover>
                            <PopoverTrigger
                                nativeButton={false}
                                render={
                                    <InputGroupAddon>
                                        <InputGroupButton>
                                            <Info />
                                        </InputGroupButton>
                                    </InputGroupAddon>
                                }
                            />

                            <PopoverContent align="start" side="top">
                                <div className="space-y-3">
                                    <p className="text-sm" dir="rtl">
                                        کدهای تخفیف:{" "}
                                        {promoCodes.map((promo, index) => (
                                            <span key={promo.code}>
                                                {promo.code}
                                                {index <
                                                    promoCodes.length - 1 &&
                                                    "، "}
                                            </span>
                                        ))}
                                    </p>
                                </div>
                            </PopoverContent>
                        </Popover>

                        <InputGroupInput
                            name="coupon"
                            placeholder="کد تخفیف"
                            aria-label="کد تخفیف"
                            className="pr-0"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            disabled={isApplying}
                        />
                    </InputGroup>
                    {/* <Input
                        
                    /> */}
                    <Button
                        type="submit"
                        className="rounded-full h-8.5"
                        disabled={!code.trim() || isApplying}>
                        {isApplying ? "در حال بررسی..." : "اعمال"}
                    </Button>
                </form>

                {/* Display applied coupon discount */}
                {promoCode && (
                    <div className="flex items-center justify-between">
                        <span className="inline-flex items-center gap-1 text-success text-xs">
                            <Check size={12} />
                            {formatPersianNumber(promoCode.discount_percent)}٪
                            تخفیف اعمال شد
                        </span>

                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleRemoveCoupon}
                            disabled={isApplying}
                            className="text-xs text-muted-foreground">
                            حذف
                        </Button>
                    </div>
                )}

                {error && (
                    <p className="mt-2 text-xs text-destructive">{error}</p>
                )}
            </div>

            {/* Cart price breakdown */}
            <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>جمع جزء</span>
                    <span>{formatPersianNumber(subTotal)}</span>
                </div>

                {/* Applied discount amount */}
                {promoCode && (
                    <div className="flex items-center justify-between text-sm text-success">
                        <span>تخفیف</span>
                        <span>{formatPersianNumber(discount)}</span>
                    </div>
                )}

                {/* Shipping cost */}
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>هزینه ارسال</span>
                    <span>{formatPersianNumber(SHIPPING_COST)}</span>
                </div>
            </div>

            {/* Final total and checkout action */}
            <div className="flex flex-col gap-4 pt-2 border-t">
                <div className="flex items-center justify-between font-bold">
                    <span>مجموع</span>

                    {/* Display the final price with its currency */}
                    <p>
                        {formatPersianNumber(total)}
                        <span className="font-normal text-xs">تومان</span>
                    </p>
                </div>

                {/* Navigate to checkout */}
                <Button
                    className="w-full h-13 rounded-2xl"
                    disabled={cartItemCount === 0}
                    nativeButton={false}
                    render={<Link to="/checkout">تسویه حساب</Link>}
                />
            </div>
        </>
    );
};

CartSummary.propTypes = {
    subTotal: PropTypes.number.isRequired,
};

export default CartSummary;
