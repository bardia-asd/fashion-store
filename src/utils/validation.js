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
