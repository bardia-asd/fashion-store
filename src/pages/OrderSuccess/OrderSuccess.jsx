import { Check, Package, ShoppingBag, Sparkles } from "lucide-react";
import { Link, useParams } from "react-router";
import { Button } from "@/components/ui/button";

const OrderSuccess = () => {
    // Get the order ID from the current URL
    const { id } = useParams();

    return (
        // Full-page order success container
        <div className="min-h-screen bg-muted px-4 py-6 sm:px-6 lg:py-10">
            <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl items-center justify-center">
                <div className="w-full overflow-hidden rounded-3xl bg-background shadow-sm">
                    {/* Top brand accent */}
                    <div className="h-1 bg-brand" />

                    <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
                        {/* Main order confirmation content */}
                        <section className="flex flex-col justify-center px-6 py-10 sm:px-10 sm:py-14 lg:px-16 lg:py-16">
                            {/* Order processing status */}
                            <div className="mb-7 flex items-center gap-2 text-sm text-muted-foreground">
                                <span className="flex size-7 items-center justify-center rounded-full bg-success/10">
                                    <Sparkles className="size-3.5 text-success" />
                                </span>

                                <span>سفارش شما آماده پردازش است</span>
                            </div>

                            {/* Success confirmation icon */}
                            <div className="mb-7 flex size-18 items-center justify-center rounded-full bg-success/10">
                                <div className="flex size-11 items-center justify-center rounded-full bg-success text-white">
                                    <Check className="size-5 stroke-[2.5]" />
                                </div>
                            </div>

                            {/* Success message */}
                            <h1 className="max-w-xl text-3xl font-semibold tracking-tight text-primary sm:text-4xl lg:text-[2.75rem] lg:leading-[1.2]">
                                سفارش شما با موفقیت ثبت شد.
                            </h1>

                            {/* Order confirmation description */}
                            <p className="mt-4 max-w-lg text-sm leading-7 text-muted-foreground sm:text-base">
                                از خرید شما متشکریم. سفارش شما ثبت شده و به‌زودی
                                برای آماده‌سازی و ارسال بررسی خواهد شد.
                            </p>

                            {/* Order number */}
                            <div className="mt-7 flex max-w-lg items-center justify-between rounded-2xl border bg-muted/50 px-5 py-4">
                                <div>
                                    <p className="text-xs text-muted-foreground">
                                        شماره سفارش
                                    </p>

                                    <p className="mt-1.5 font-mono text-sm font-medium text-primary">
                                        {id}
                                    </p>
                                </div>

                                {/* Order icon */}
                                <Package className="size-5 text-muted-foreground/50" />
                            </div>

                            {/* Order navigation actions */}
                            <div className="mt-7 flex max-w-lg flex-col gap-3 sm:flex-row">
                                {/* Navigate to the order details */}
                                <Button
                                    className="h-11 rounded-xl bg-primary px-6 hover:bg-primary/90"
                                    nativeButton={false}
                                    render={
                                        <Link to={`/profile/orders`}>
                                            <Package className="ml-2 size-4" />
                                            مشاهده سفارش
                                        </Link>
                                    }
                                />

                                {/* Continue browsing products */}
                                <Button
                                    variant="outline"
                                    className="h-11 rounded-xl px-6"
                                    nativeButton={false}
                                    render={
                                        <Link to="/products">
                                            <ShoppingBag className="ml-2 size-4" />
                                            ادامه خرید
                                        </Link>
                                    }
                                />
                            </div>
                        </section>

                        {/* Editorial order confirmation panel */}
                        <section className="relative hidden min-h-140 overflow-hidden bg-primary lg:block">
                            {/* Decorative background circles */}
                            <div className="absolute -right-40 -top-40 size-112 rounded-full border border-white/10" />
                            <div className="absolute -right-24 -top-24 size-80 rounded-full border border-white/10" />
                            <div className="absolute -bottom-52 -left-52 size-144 rounded-full border border-white/10" />

                            {/* Small brand accent */}
                            <div className="absolute right-12 top-12 size-2 rounded-full bg-brand" />

                            <div className="relative flex h-full flex-col justify-between p-10 xl:p-12">
                                {/* Brand and confirmation message */}
                                <div>
                                    <p className="text-[10px] font-medium tracking-[0.35em] text-white/40">
                                        DBY / FASHION
                                    </p>

                                    <div className="mt-24">
                                        {/* Confirmation label */}
                                        <p className="text-xs uppercase tracking-[0.2em] text-white/40">
                                            ORDER CONFIRMED
                                        </p>

                                        {/* Editorial thank-you message */}
                                        <h2 className="mt-5 max-w-sm text-5xl font-light leading-[1.05] tracking-tight text-white xl:text-6xl">
                                            Thank you
                                            <br />
                                            <span className="font-semibold">
                                                for choosing us.
                                            </span>
                                        </h2>
                                    </div>
                                </div>

                                {/* Order reference and confirmation icon */}
                                <div className="flex items-end justify-between">
                                    <div>
                                        {/* Decorative divider */}
                                        <div className="mb-4 h-px w-14 bg-white/30" />

                                        {/* Short order reference */}
                                        <p className="text-[10px] tracking-[0.3em] text-white/40">
                                            YOUR ORDER / {id.slice(0, 8)}
                                        </p>
                                    </div>

                                    {/* Completion icon */}
                                    <div className="flex size-12 items-center justify-center rounded-full border border-white/10">
                                        <Check className="size-5 text-white/40" />
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccess;
