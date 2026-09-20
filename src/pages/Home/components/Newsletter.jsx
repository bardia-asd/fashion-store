import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Newsletter = () => {
    // Store the newsletter email input
    const [email, setEmail] = useState("");

    // Track whether the newsletter form was submitted
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Handle newsletter form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Show the submitted state and clear the input
        setIsSubmitted(true);
        alert("عضویت شما در خبرنامه با موفقیت انجام شد.");
        setEmail("");
    };

    return (
        // Newsletter subscription section
        <section className="bg-primary py-20 text-primary-foreground lg:py-28">
            <div className="container-app max-w-md">
                {/* Newsletter heading and description */}
                <div className="mb-10 text-center">
                    {/* Section label */}
                    <span className="text-[10px] font-semibold text-muted-foreground">
                        خبرنامه
                    </span>

                    {/* Main newsletter title */}
                    <h2 className="mt-3 text-2xl font-bold sm:text-3xl lg:text-4xl">
                        الهام بگیرید.
                    </h2>

                    {/* Newsletter description */}
                    <p className="mt-4 text-muted-foreground">
                        تازه‌ترین محصولات، پیشنهادهای ویژه و محتوای منتخب، با
                        دقت و ظرافت در اختیارتان قرار می‌گیرد.
                    </p>
                </div>

                {/* Newsletter subscription form */}
                <div>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-5 flex items-center gap-2">
                            {/* Email input */}
                            <Input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    setIsSubmitted(false);
                                }}
                                placeholder="ایمیل شما"
                                className="h-12 rounded-full border-white/15 bg-white/10! px-6"
                            />

                            {/* Submit button with submitted state */}
                            <Button
                                type="submit"
                                className="h-12 w-28 rounded-full bg-brand text-brand-foreground hover:bg-brand">
                                {isSubmitted ? "عضو شدید" : "عضویت"}
                            </Button>
                        </div>
                    </form>

                    {/* Privacy and unsubscribe notice */}
                    <p className="text-center text-xs text-muted-foreground">
                        بدون اسپم. هر زمان خواستید لغو کنید.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Newsletter;
