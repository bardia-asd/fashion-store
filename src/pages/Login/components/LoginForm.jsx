import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";

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

import {
    selectAuthError,
    selectAuthStatus,
} from "@/features/auth/authSelectors";
import { signIn } from "@/features/auth/authSlice";

import { loginSchema } from "@/utils/validation";

const LoginForm = () => {
    // Get authentication status and error from Redux
    const status = useSelector(selectAuthStatus);
    const error = useSelector(selectAuthError);

    // Get the Redux dispatch function and navigation helper
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from || "/";

    // Initialize the form with Zod validation
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: zodResolver(loginSchema) });

    // Control password visibility
    const [showPassword, setShowPassword] = useState(false);

    // Submit login credentials through the authentication thunk
    const onSubmit = async (data) => {
        const result = await dispatch(
            signIn({ email: data.email, password: data.password }),
        );

        // Navigate to the home page after a successful login
        if (signIn.fulfilled.match(result)) {
            navigate(from, { replace: true });
        }
    };

    return (
        // Login form
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            <FieldGroup className="gap-5">
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

            {/* Display authentication error from the server */}
            {error && (
                <p className="text-sm font-normal text-destructive">{error}</p>
            )}

            {/* Submit login form */}
            <Button
                type="submit"
                className="w-full h-14 rounded-xs"
                disabled={status === "loading"}>
                {/* Show a loading message while login is processing */}
                {status === "loading" ? "در حال ورود..." : " ورود به حساب"}

                <ArrowLeft />
            </Button>
        </form>
    );
};

export default LoginForm;
