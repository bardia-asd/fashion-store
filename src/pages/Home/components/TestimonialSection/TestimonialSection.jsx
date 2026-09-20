import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import { Button } from "@/components/ui/button";

import { testimonials } from "@/data/testimonialsData";
import { cn } from "cn";

import TestimonialCard from "./TestimonialCard";

const TestimonialSection = () => {
    // Store a reference to the Swiper instance for external controls
    const swiperRef = useRef(null);

    // Track the currently active testimonial
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        // Customer testimonials section
        <section className="py-20 lg:py-28 bg-muted">
            <div className="container-app max-w-3xl">
                {/* Section heading */}
                <div className="text-center mb-14">
                    {/* Section label */}
                    <span className="font-semibold text-xs text-muted-foreground">
                        نظرات مشتریان
                    </span>

                    {/* Main section title */}
                    <h2 className="font-bold text-2xl sm:text-4xl lg:text-5xl mt-3">
                        مشتریان ما چه می‌گویند
                    </h2>
                </div>

                {/* Testimonial slider and navigation */}
                <div>
                    {/* Testimonial carousel */}
                    <Swiper
                        onSwiper={(swiper) => (swiperRef.current = swiper)}
                        rewind={true}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}
                        spaceBetween={10}
                        onSlideChange={(swiper) =>
                            setActiveIndex(swiper.activeIndex)
                        }
                        modules={[Autoplay]}
                        className="mySwiper">
                        {/* Render each testimonial as a slide */}
                        {testimonials.map((testimonial) => (
                            <SwiperSlide key={testimonial.id}>
                                <TestimonialCard testimonial={testimonial} />
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Carousel navigation controls */}
                    <div className="mt-8 flex items-center justify-center gap-4">
                        {/* Navigate to the previous testimonial */}
                        <Button
                            size="icon"
                            variant="outline"
                            aria-label="نظر قبلی"
                            className="size-10 rounded-full"
                            onClick={() => swiperRef.current?.slidePrev()}>
                            <ChevronRight />
                        </Button>

                        {/* Testimonial pagination indicators */}
                        <div className="flex gap-2">
                            {testimonials.map((_, i) => (
                                <button
                                    key={i}
                                    type="button"
                                    onClick={() =>
                                        swiperRef.current?.slideTo(i)
                                    }
                                    className={cn(
                                        "rounded-full transition-all",
                                        i === activeIndex
                                            ? "h-2 w-6 bg-black"
                                            : "size-2 bg-black/20",
                                    )}
                                    aria-label={`برو به نظر ${i + 1}`}
                                    aria-current={
                                        i === activeIndex ? "true" : undefined
                                    }
                                />
                            ))}
                        </div>

                        {/* Navigate to the next testimonial */}
                        <Button
                            size="icon"
                            variant="outline"
                            aria-label="نظر بعدی"
                            className="size-10 rounded-full"
                            onClick={() => swiperRef.current?.slideNext()}>
                            <ChevronLeft />
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TestimonialSection;
