import { z } from "zod";

export const loginSchema = z.object({
    email: z
        .string()
        .min(1, "ایمیل الزامی است")
        .email("لطفاً یک ایمیل معتبر وارد کنید"),
    password: z
        .string()
        .min(1, "رمز عبور الزامی است")
        .min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد"),
});

export const registerSchema = z
    .object({
        name: z
            .string()
            .min(1, "نام و نام خانوادگی الزامی است")
            .min(3, "نام باید حداقل ۳ کاراکتر باشد"),

        email: z
            .string()
            .min(1, "ایمیل الزامی است")
            .email("لطفاً یک ایمیل معتبر وارد کنید"),

        password: z
            .string()
            .min(1, "رمز عبور الزامی است")
            .min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد"),

        confirmPassword: z.string().min(1, "تکرار رمز عبور الزامی است"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "رمز عبور و تکرار آن مطابقت ندارند",
        path: ["confirmPassword"],
    });
