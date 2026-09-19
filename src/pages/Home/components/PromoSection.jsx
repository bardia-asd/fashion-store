import { Button } from "@/components/ui/button";
import { Link } from "react-router";

const PromoSection = () => {
    return (
        // Promotional section highlighting the seasonal collection
        <section className="py-20 lg:py-28">
            <div className="container-app">
                {/* Split promotional banner with image and content */}
                <div className="grid grid-cols-1 md:grid-cols-2 rounded-3xl bg-primary overflow-hidden">
                    {/* Promotional image */}
                    <div className="order-2 md:order-1">
                        <img
                            src="https://plus.unsplash.com/premium_photo-1789200609644-cbcd8711dae2?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="کالکشن تابستان ۱۴۰۵"
                            className="size-full object-cover"
                        />
                    </div>

                    {/* Promotional text and call-to-action */}
                    <div className="order-1 md:order-2 p-10 md:p-16">
                        {/* Promotion label */}
                        <span className="text-brand text-xs font-semibold">
                            زمان محدود
                        </span>

                        {/* Promotion heading */}
                        <h2 className="text-white mt-5 font-bold text-2xl sm:text-4xl lg:text-5xl">
                            کالکشن
                            <br />
                            <span className="italic"> تابستان </span>
                            <br />
                            ۱۴۰۵
                        </h2>

                        {/* Promotion description */}
                        <p className="text-white/50 mt-4 max-w-60">
                            تا ۵۰٪ تخفیف روی محصولات منتخب ضروریات جاودانه، با
                            تعریفی تازه.
                        </p>

                        {/* Promotion call-to-action */}
                        <div className="mt-8">
                            <Button
                                nativeButton={false}
                                className="bg-brand text-brand-foreground hover:bg-brand h-12 rounded-full"
                                render={
                                    <Link to="/products">
                                        همین حالا خرید کنید
                                    </Link>
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PromoSection;
