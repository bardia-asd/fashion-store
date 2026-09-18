import { Button } from "@/components/ui/button";
import SectionHeader from "../SectionHeader";
import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";

const CategoriesSection = () => {
    return (
        <section className="py-20 lg:py-28">
            <div className="container-app">
                <SectionHeader
                    eyebrow="مرور کنید"
                    title="خرید بر اساس دسته‌بندی"
                    actions={
                        <Button
                            nativeButton={false}
                            variant="link"
                            render={
                                <Link to="/products">
                                    مشاهده همه <ArrowLeft />
                                </Link>
                            }
                        />
                    }
                />
            </div>
        </section>
    );
};

export default CategoriesSection;
