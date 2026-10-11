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

export const reviewSchema = z.object({
    rating: z.number().min(1, "لطفاً امتیاز خود را انتخاب کنید").max(5),
    comment: z
        .string()
        .trim()
        .min(10, "متن دیدگاه باید حداقل ۱۰ کاراکتر باشد")
        .max(1000, "متن دیدگاه نباید بیشتر از ۱۰۰۰ کاراکتر باشد"),
    anonymous: z.boolean(),
});

export const shippingSchema = z.object({
    firstName: z.string().trim().min(2, "نام باید حداقل ۲ کاراکتر باشد."),

    lastName: z
        .string()
        .trim()
        .min(2, "نام خانوادگی باید حداقل ۲ کاراکتر باشد."),

    phone: z
        .string()
        .trim()
        .regex(/^09\d{9}$/, "شماره موبایل معتبر نیست."),

    address: z.string().trim().min(10, "آدرس باید حداقل ۱۰ کاراکتر باشد."),

    plaque: z.string().trim().min(1, "پلاک را وارد کنید."),

    unit: z.string().trim().optional(),

    postalCode: z
        .string()
        .trim()
        .regex(/^\d{10}$/, "کد پستی باید ۱۰ رقم باشد."),

    recipientNote: z.string().trim().optional(),
});

export const profileSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, "نام باید حداقل ۲ کاراکتر باشد")
        .max(100, "نام نمی‌تواند بیشتر از ۱۰۰ کاراکتر باشد"),

    email: z
        .string()
        .trim()
        .min(1, "ایمیل الزامی است")
        .email("ایمیل معتبر نیست"),

    phone: z
        .string()
        .trim()
        .refine(
            (value) => value === "" || /^09\d{9}$/.test(value),
            "شماره موبایل معتبر نیست",
        ),
});
