import { useState } from "react";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

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
import { signUp } from "@/features/auth/authSlice";

import { registerSchema } from "@/utils/validation";

const RegisterForm = () => {
    // Get authentication status and error from Redux
    const status = useSelector(selectAuthStatus);
    const error = useSelector(selectAuthError);

    // Get the Redux dispatch function and navigation helper
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Initialize the form with Zod validation
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(registerSchema),
    });

    // Control password visibility
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Submit registration data through the authentication thunk
    const onSubmit = async (data) => {
        const result = await dispatch(
            signUp({
                name: data.name,
                email: data.email,
                password: data.password,
            }),
        );

        // Navigate based on whether a session was created after signup
        if (signUp.fulfilled.match(result)) {
            if (result.payload.session) {
                navigate("/");
            } else {
                navigate("/signin");
            }
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            <FieldGroup className="gap-5">
                {/* Name field */}
                <Field>
                    <Label htmlFor="name">نام و نام خانوادگی</Label>

                    <Input
                        type="text"
                        id="name"
                        placeholder="نام خود را وارد کنید"
                        className="bg-transparent! h-12 rounded-xs"
                        {...register("name")}
                    />

                    {/* Display name validation error */}
                    {errors.name && (
                        <FieldError>{errors.name.message}</FieldError>
                    )}
                </Field>

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
                    <Label htmlFor="password">رمز عبور</Label>

                    {/* Password input with visibility toggle */}
                    <InputGroup className="bg-transparent! h-12 rounded-xs">
                        <InputGroupInput
                            type={showPassword ? "text" : "password"}
                            id="password"
                            placeholder="حداقل ۶ کاراکتر"
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

                {/* Confirm password field */}
                <Field>
                    <Label htmlFor="confirmPassword">تکرار رمز عبور</Label>

                    {/* Confirm password input with visibility toggle */}
                    <InputGroup className="bg-transparent! h-12 rounded-xs">
                        <InputGroupInput
                            type={showConfirmPassword ? "text" : "password"}
                            id="confirmPassword"
                            placeholder="رمز عبور خود را دوباره وارد کنید"
                            className="px-2.5!"
                            {...register("confirmPassword")}
                        />

                        {/* Toggle confirm password visibility */}
                        <InputGroupAddon align="inline-end">
                            <InputGroupButton
                                type="button"
                                size="icon"
                                onClick={() =>
                                    setShowConfirmPassword((prev) => !prev)
                                }
                                aria-label={
                                    showConfirmPassword
                                        ? "مخفی کردن رمز عبور"
                                        : "نمایش رمز عبور"
                                }>
                                {showConfirmPassword ? <EyeOff /> : <Eye />}
                            </InputGroupButton>
                        </InputGroupAddon>
                    </InputGroup>

                    {/* Display confirm password validation error */}
                    {errors.confirmPassword && (
                        <FieldError>
                            {errors.confirmPassword.message}
                        </FieldError>
                    )}
                </Field>

                {/* Terms and privacy */}
                <Field orientation="horizontal">
                    <Checkbox id="terms-accepted" />

                    <Label
                        htmlFor="terms-accepted"
                        className="text-xs text-black/50">
                        شرایط استفاده و حریم خصوصی DBY را می‌پذیرم.
                    </Label>
                </Field>
            </FieldGroup>

            {/* Display authentication error from the server */}
            {error && (
                <p className="text-sm font-normal text-destructive">{error}</p>
            )}

            {/* Submit registration form */}
            <Button
                type="submit"
                className="w-full h-14 rounded-xs"
                disabled={status === "loading"}>
                {/* Show a loading message while registration is processing */}
                {status === "loading" ? "در حال ثبت‌نام..." : "ایجاد حساب"}

                <ArrowLeft />
            </Button>
        </form>
    );
};

export default RegisterForm;
