import { ShoppingBag, XIcon } from "lucide-react";

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

import CartItem from "./CartItem";
import CartSummary from "./CartSummary";

import { formatPersianNumber } from "@/utils/formatter";

const CartDrawer = () => {
    return (
        // Sheet controls the cart drawer's open and close state
        <Sheet>
            {/* Cart button that opens the drawer */}
            <SheetTrigger
                render={
                    <Button
                        variant="ghost"
                        size="icon"
                        aria-label={`سبد خرید، ${formatPersianNumber(5)} کالا`}
                        className="relative size-8.5 [&_svg:not([class*='size-'])]:size-4.5">
                        <ShoppingBag />

                        {/* Cart item count badge */}
                        <span
                            aria-hidden="true"
                            className="absolute top-0 right-0 size-3 rounded-full bg-brand text-[10px] text-brand-foreground">
                            {formatPersianNumber(5)}
                        </span>
                    </Button>
                }
            />

            {/* Cart drawer content */}
            <SheetContent
                showCloseButton={false}
                side="left"
                className="w-full! sm:w-auto gap-0">
                {/* Drawer header with title and close button */}
                <SheetHeader className="flex-row justify-between border-b px-6">
                    <SheetTitle>سبد خرید ({formatPersianNumber(3)})</SheetTitle>

                    {/* Close the cart drawer */}
                    <SheetClose
                        data-slot="sheet-close"
                        render={<Button variant="ghost" size="icon-sm" />}>
                        <XIcon />
                        <span className="sr-only">Close</span>
                    </SheetClose>
                </SheetHeader>

                {/* Scrollable list of cart items */}
                <div className="flex-1 overflow-y-auto divide-y divide-border px-6 scrollbar-thin">
                    <CartItem />
                    <CartItem />
                    <CartItem />
                </div>

                {/* Cart totals and checkout action */}
                <SheetFooter className="border-t gap-4">
                    <CartSummary />
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
};

export default CartDrawer;
