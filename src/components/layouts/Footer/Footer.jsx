import { Link } from "react-router";
import { footerSections } from "@/data/footerData";

const Footer = () => {
    return (
        // Main footer section
        <footer className="bg-background pt-16 pb-8 border-t">
            <div className="container-app">
                {/* Footer content with brand information and navigation sections */}
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
                    {/* Brand information and social links */}
                    <div className="col-span-2 lg:col-span-1">
                        <Link
                            to="/"
                            className="text-2xl tracking-widest font-bold font-serif">
                            DBY
                        </Link>

                        {/* Short description of the brand */}
                        <p className="text-muted-foreground text-sm mt-4">
                            مدی که برای کمد لباس مدرن طراحی شده است. قطعاتی
                            ماندگار با کیفیتی استثنایی.
                        </p>

                        {/* Social media links */}
                        <div className="flex items-center gap-3 mt-6">
                            <div className="flex items-center justify-center size-8 rounded-full font-bold text-xs bg-muted">
                                IG
                            </div>
                            <div className="flex items-center justify-center size-8 rounded-full font-bold text-xs bg-muted">
                                Tw
                            </div>
                            <div className="flex items-center justify-center size-8 rounded-full font-bold text-xs bg-muted">
                                TK
                            </div>
                            <div className="flex items-center justify-center size-8 rounded-full font-bold text-xs bg-muted">
                                YT
                            </div>
                        </div>
                    </div>

                    {/* Render each footer navigation section */}
                    {footerSections.map(({ title, links }) => (
                        <div key={title}>
                            {/* Footer section title */}
                            <h5 className="text-[10px] lg:text-xs font-bold">
                                {title}
                            </h5>

                            {/* Render links for the current section */}
                            <div className="flex flex-col gap-3 mt-5">
                                {links.map((link) => (
                                    <Link
                                        key={link.label}
                                        to={link.href}
                                        className="font-medium text-sm text-muted-foreground">
                                        {link.label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Copyright and country information */}
                <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-4 pt-9 border-t text-xs text-muted-foreground">
                    <span>
                        © ۱۴۰۵ دیزاین بای یاش (DBY). تمامی حقوق محفوظ است.
                    </span>

                    <span>ایران/تومان</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
