import { useState } from "react";
import { Link } from "react-router";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
} from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { loginSchema } from "@/utils/validation";

const LoginForm = () => {
    // Initialize the form with Zod validation
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: zodResolver(loginSchema) });

    // Control password visibility
    const [showPassword, setShowPassword] = useState(false);

    // Handle validated form submission
    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        // Login form
        <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup className="gap-5 mb-5">
                {/* Email field */}
                <Field>
                    <Label htmlFor="email">ایمیل</Label>

                    <Input
                        type="email"
                        id="email"
                        placeholder="ایمیل خود را وارد کنید"
                        className="bg-transparent! h-12 rounded-xs"
                        {...register("email")}
                    />

                    {/* Display email validation error */}
                    {errors.email && (
                        <FieldError>{errors.email.message}</FieldError>
                    )}
                </Field>

                {/* Password field */}
                <Field>
                    <div className="flex items-center justify-between">
                        {/* Password label */}
                        <Label htmlFor="password">رمز عبور</Label>

                        {/* Link to password recovery */}
                        <Link
                            to="/forgot-password"
                            className="text-xs underline text-black/50 hover:text-foreground transition-colors">
                            رمز عبور را فراموش کرده‌اید؟
                        </Link>
                    </div>

                    {/* Password input with visibility toggle */}
                    <InputGroup className="bg-transparent! h-12 rounded-xs">
                        <InputGroupInput
                            type={showPassword ? "text" : "password"}
                            id="password"
                            placeholder="رمز عبور خود را وارد کنید"
                            className="px-2.5!"
                            {...register("password")}
                        />

                        {/* Toggle password visibility */}
                        <InputGroupAddon align="inline-end">
                            <InputGroupButton
                                type="button"
                                size="icon"
                                onClick={() => setShowPassword((prev) => !prev)}
                                aria-label={
                                    showPassword
                                        ? "مخفی کردن رمز عبور"
                                        : "نمایش رمز عبور"
                                }>
                                {showPassword ? <EyeOff /> : <Eye />}
                            </InputGroupButton>
                        </InputGroupAddon>
                    </InputGroup>

                    {/* Display password validation error */}
                    {errors.password && (
                        <FieldError>{errors.password.message}</FieldError>
                    )}
                </Field>

                {/* Remember me option */}
                <Field orientation="horizontal">
                    <Checkbox id="remember-me" />

                    <Label
                        htmlFor="remember-me"
                        className="text-xs text-black/50">
                        مرا به خاطر بسپار
                    </Label>
                </Field>
            </FieldGroup>

            {/* Submit login form */}
            <Button type="submit" className="w-full h-14 rounded-xs">
                ورود به حساب
                <ArrowLeft />
            </Button>
        </form>
    );
};

export default LoginForm;
