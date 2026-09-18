import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import heroWomen from "@/assets/images/hero/hero-women.jpg";
import heroWomenMobile from "@/assets/images/hero/hero-women-mobile.jpg";

const HeroSection = () => {
    return (
        // Main hero section with responsive height
        <section className="relative min-h-190 h-[min(760px,100vh)]">
            {/* Responsive hero image for desktop and mobile */}
            <picture>
                <source srcSet={heroWomen} media="(width>=1024px)" />
                <img
                    src={heroWomenMobile}
                    alt=""
                    loading="lazy"
                    className="size-full object-cover object-top"
                />
            </picture>

            {/* Dark gradient overlay for better text readability */}
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/25 to-black/0" />

            {/* Hero content positioned near the bottom of the image */}
            <div className="absolute bottom-16 lg:bottom-28 inset-x-0 z-10 container-app">
                {/* Collection label */}
                <span className="font-semibold text-xs text-white/50">
                    کالکشن تابستان — ۱۴۰۵
                </span>

                {/* Main hero heading */}
                <h1 className="max-w-64 md:max-w-80 lg:max-w-96 text-white text-4xl sm:text-6xl lg:text-7xl mt-5 mb-6">
                    استایل‌های
                    <span className="italic"> ماندگار </span>
                    را کشف کنید
                </h1>

                {/* Short description of the collection */}
                <p className="lg:text-lg font-light text-white/65">
                    مجموعه‌های منتخب برای سبک زندگی مدرن، با دقت و ظرافت طراحی
                    شده‌اند.
                </p>

                {/* Hero call-to-action buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mt-10">
                    {/* Primary collection link */}
                    <Button
                        nativeButton={false}
                        className="h-12 bg-white hover:bg-white/95 py-3 px-8 font-semibold text-foreground rounded-full"
                        render={<Link to="/products">خرید کالکشن</Link>}
                    />

                    {/* Secondary collection link */}
                    <Button
                        variant="outline"
                        nativeButton={false}
                        className="h-12 bg-transparent! text-white hover:text-white! py-3 px-8 font-semibold rounded-full"
                        render={<Link to="/products">خرید کالکشن</Link>}
                    />
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
