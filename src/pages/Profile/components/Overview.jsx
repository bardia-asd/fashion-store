import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthUser } from "@/features/auth/authSelectors";
import {
    useGetProfileQuery,
    useUpdateProfileMutation,
} from "@/features/profile/profileApi";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema } from "@/utils/validation";
import { toast } from "sonner";

const ProfileOverview = () => {
    // Get the currently authenticated user from Redux
    const user = useSelector(selectAuthUser);

    // Fetch the user's profile information
    const { data: profile } = useGetProfileQuery(user.id, {
        skip: !user.id,
    });

    // Initialize the form with validation and default values
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isDirty },
    } = useForm({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
        },
    });

    // Populate the form when profile data becomes available
    useEffect(() => {
        if (profile) {
            reset({
                name: profile.full_name ?? "",
                email: user?.email ?? "",
                phone: profile.phone ?? "",
            });
        }
    }, [profile, user, reset]);

    // Get the profile update mutation and loading state
    const [updateProfile, { isLoading }] = useUpdateProfileMutation();

    // Get Redux dispatch for updating the user's email
    const dispatch = useDispatch();

    // Save profile details and update the email if it has changed

    const onSubmit = async (values) => {
        try {
            // Update the user's name and phone number
            await updateProfile({
                userId: user.id,
                full_name: values.name,
                phone: values.phone || null,
            }).unwrap();

            // Update the authentication email if it has changed
            if (values.email.trim() !== user.email) {
                try {
                    await dispatch(updateEmail(values.email.trim())).unwrap();
                    toast.success("اطلاعات حساب با موفقیت به‌روزرسانی شد");
                } catch (error) {
                    toast.error(
                        "اطلاعات پروفایل ذخیره شد، اما تغییر ایمیل انجام نشد",
                    );
                    return;
                }
            } else {
                toast.success("اطلاعات حساب با موفقیت به‌روزرسانی شد");
            }
        } catch (error) {
            toast.error("ذخیره اطلاعات حساب انجام نشد");
            console.error(error);
        }
    };

    return (
        // Account information card
        <Card className="px-4">
            <CardHeader className="border-b px-0 mb-6">
                {/* Profile section label */}
                <span className="font-semibold text-[10px] text-muted-foreground">
                    پروفایل من
                </span>

                {/* Form title */}
                <CardTitle className="text-2xl font-normal">
                    اطلاعات حساب
                </CardTitle>
            </CardHeader>

            <CardContent className="px-0">
                {/* Profile form with validation on submission */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <FieldGroup>
                        {/* Name, email, and phone number fields */}
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <Field>
                                <Label htmlFor="name">نام و نام خانوادگی</Label>
                                <Input
                                    id="name"
                                    aria-invalid={!!errors.name}
                                    {...register("name")}
                                    className="h-12 rounded-xs bg-transparent!"
                                />
                                {/* Display name validation errors */}
                                {errors.name && (
                                    <FieldError errors={[errors.name]} />
                                )}
                            </Field>

                            <Field>
                                <Label htmlFor="email">ایمیل</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    aria-invalid={!!errors.email}
                                    {...register("email")}
                                    className="h-12 rounded-xs bg-transparent!"
                                />
                                {/* Display email validation errors */}
                                {errors.email && (
                                    <FieldError errors={[errors.email]} />
                                )}
                            </Field>

                            <Field>
                                <Label htmlFor="phone">شماره موبایل</Label>
                                <Input
                                    id="phone"
                                    type="tel"
                                    placeholder="09123456789"
                                    aria-invalid={!!errors.phone}
                                    {...register("phone")}
                                    className="h-12 rounded-xs bg-transparent! text-right"
                                />
                                {/* Display phone validation errors */}
                                {errors.phone && (
                                    <FieldError errors={[errors.phone]} />
                                )}
                            </Field>
                        </div>
                    </FieldGroup>

                    {/* Submit button and update status */}
                    <div className="flex justify-start border-t pt-5">
                        <Button
                            size="lg"
                            type="submit"
                            disabled={!isDirty || isLoading}>
                            {isLoading
                                ? "در حال بروزرسانی..."
                                : "ذخیره تغییرات"}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
};

export default ProfileOverview;
