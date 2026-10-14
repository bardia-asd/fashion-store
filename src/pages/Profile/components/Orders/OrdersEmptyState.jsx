import { Link } from "react-router";
import { PackageOpen, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const OrdersEmptyState = () => {
    return (
        <div className="flex flex-col items-center justify-center border px-5 py-14 text-center sm:py-20">
            <div className="mb-5 flex size-16 items-center justify-center rounded-full bg-muted">
                <PackageOpen
                    className="size-7 text-muted-foreground"
                    strokeWidth={1.5}
                />
            </div>

            <h3 className="mb-2 text-base font-semibold">
                هنوز سفارشی ثبت نکرده‌اید
            </h3>

            <p className="mb-6 max-w-xs text-xs leading-6 text-muted-foreground">
                سفارش‌های شما پس از ثبت، در این بخش نمایش داده می‌شوند. وقتشه
                اولین خریدت رو شروع کنی.
            </p>

            <Button
                nativeButton={false}
                size="lg"
                render={
                    <Link to="/products" className="gap-2">
                        مشاهده محصولات
                        <ArrowLeft className="size-4" />
                    </Link>
                }
            />
        </div>
    );
};

export default OrdersEmptyState;
