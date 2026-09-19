import { Link } from "react-router";
import { ArrowLeft, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPersianNumber } from "@/utils/formatter";

const LookBookSection = () => {
    return (
        // Lookbook section featuring a curated seasonal style
        <section className="py-20 lg:py-28">
            <div className="container-app">
                {/* Lookbook image and editorial content */}
                <div className="grid grid-cols-1 md:grid-cols-2 md:items-center gap-12 lg:gap-20">
                    {/* Lookbook featured image */}
                    <div className="aspect-4/5 rounded-2xl overflow-hidden">
                        <img
                            src="https://images.unsplash.com/photo-1516762689617-e1cffcef479d?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="استایل منتخب از کالکشن تابستان ۱۴۰۵"
                            className="size-full object-cover"
                        />
                    </div>

                    {/* Editorial content and featured products */}
                    <div>
                        {/* Editorial label */}
                        <span className="font-semibold text-xs text-muted-foreground">
                            ادیتوریال
                        </span>

                        {/* Lookbook heading */}
                        <h2 className="mt-4 font-bold text-2xl sm:text-4xl lg:text-5xl">
                            لوک‌بوک <br />
                            <span className="italic">بهاری</span>
                        </h2>

                        {/* Lookbook description */}
                        <p className="text-muted-foreground mt-6">
                            آیتم‌هایی بی‌دردسر برای ساختن کمد لباسی ماندگار و
                            حساب‌شده. روی نقاط مشخص‌شده بروید و هر آیتم این
                            استایل را کشف کنید.
                        </p>

                        {/* Featured products from the lookbook */}
                        <ul className="flex flex-col my-8">
                            {/* Featured product */}
                            <li className="border-b py-4">
                                <Link
                                    to="/products/merino-wool-overcoat"
                                    className="flex items-center justify-between text-sm">
                                    <p className="font-medium">
                                        پالتوی پشم مرینو
                                    </p>

                                    {/* Product price and navigation icon */}
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <div className="flex items-center gap-0.5">
                                            <span>
                                                {formatPersianNumber(18500000)}
                                            </span>
                                            <span className="text-xs">
                                                تومان
                                            </span>
                                        </div>
                                        <ChevronLeft size={12} />
                                    </div>
                                </Link>
                            </li>

                            {/* Featured product */}
                            <li className="border-b py-4">
                                <Link
                                    to="/products/merino-wool-overcoat"
                                    className="flex items-center justify-between text-sm">
                                    <p className="font-medium">
                                        پالتوی پشم مرینو
                                    </p>

                                    {/* Product price and navigation icon */}
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <div className="flex items-center gap-0.5">
                                            <span>
                                                {formatPersianNumber(18500000)}
                                            </span>
                                            <span className="text-xs">
                                                تومان
                                            </span>
                                        </div>
                                        <ChevronLeft size={12} />
                                    </div>
                                </Link>
                            </li>

                            {/* Featured product */}
                            <li className="border-b py-4">
                                <Link
                                    to="/products/merino-wool-overcoat"
                                    className="flex items-center justify-between text-sm">
                                    <p className="font-medium">
                                        پالتوی پشم مرینو
                                    </p>

                                    {/* Product price and navigation icon */}
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <div className="flex items-center gap-0.5">
                                            <span>
                                                {formatPersianNumber(18500000)}
                                            </span>
                                            <span className="text-xs">
                                                تومان
                                            </span>
                                        </div>
                                        <ChevronLeft size={12} />
                                    </div>
                                </Link>
                            </li>
                        </ul>

                        {/* Link to shop the complete look */}
                        <Button
                            variant="link"
                            nativeButton={false}
                            className="px-0"
                            render={
                                <Link to="/products">
                                    خرید استایل کامل <ArrowLeft />
                                </Link>
                            }
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LookBookSection;
