import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { selectShippingAddress } from "@/features/checkout/checkoutSelectors";
import { setShippingAddress } from "@/features/checkout/checkoutSlice";
import { shippingSchema } from "@/utils/validation";

const ShippingStep = () => {
    // Get Redux dispatch and checkout navigation helpers
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Get the previously saved shipping address
    const shippingAddress = useSelector(selectShippingAddress);

    // Initialize the shipping form with saved address data
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(shippingSchema),
        defaultValues: shippingAddress || {},
    });

    // Save the shipping address and continue to the delivery step
    const onSubmit = (data) => {
        dispatch(setShippingAddress(data));
        navigate("/checkout/delivery");
    };

    return (
        // Shipping information card
        <Card>
            <CardHeader>
                {/* Shipping recipient section title */}
                <CardTitle>اطلاعات گیرنده</CardTitle>
            </CardHeader>

            <CardContent>
                {/* Shipping address form */}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FieldGroup>
                        {/* Recipient name fields */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <Field>
                                <Label htmlFor="firstName">نام *</Label>
                                <Input
                                    id="firstName"
                                    type="text"
                                    placeholder="نام خود را وارد کنید"
                                    className="bg-transparent! rounded-xs h-10"
                                    {...register("firstName")}
                                />
                                {/* Display first name validation error */}
                                {errors.firstName && (
                                    <FieldError>
                                        {errors.firstName.message}
                                    </FieldError>
                                )}
                            </Field>

                            <Field>
                                <Label htmlFor="lastName">نام خانوادگی *</Label>
                                <Input
                                    id="lastName"
                                    type="text"
                                    placeholder="نام خانوادگی خود را وارد کنید"
                                    className="bg-transparent! rounded-xs h-10"
                                    {...register("lastName")}
                                />
                                {/* Display last name validation error */}
                                {errors.lastName && (
                                    <FieldError>
                                        {errors.lastName.message}
                                    </FieldError>
                                )}
                            </Field>
                        </div>

                        {/* Recipient phone number */}
                        <Field>
                            <Label htmlFor="phone">شماره موبایل *</Label>
                            <Input
                                id="phone"
                                type="tel"
                                inputMode="numeric"
                                placeholder="مثلاً ۰۹۱۲۱۲۳۴۵۶۷"
                                className="bg-transparent! rounded-xs h-10 text-right"
                                {...register("phone")}
                            />
                            {/* Display phone validation error */}
                            {errors.phone && (
                                <FieldError>{errors.phone.message}</FieldError>
                            )}
                        </Field>

                        {/* Full shipping address */}
                        <Field>
                            <Label htmlFor="address">آدرس کامل *</Label>
                            <Textarea
                                id="address"
                                placeholder="استان، شهر، خیابان، کوچه و ..."
                                className="bg-transparent! rounded-xs h-24 overflow-y-auto resize-none scrollbar-thin"
                                {...register("address")}
                            />
                            {/* Display address validation error */}
                            {errors.address && (
                                <FieldError>
                                    {errors.address.message}
                                </FieldError>
                            )}
                        </Field>

                        {/* Building plaque and unit */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <Field>
                                <Label htmlFor="plaque">پلاک *</Label>
                                <Input
                                    id="plaque"
                                    type="text"
                                    inputMode="numeric"
                                    placeholder="مثلاً ۱۲"
                                    className="bg-transparent! rounded-xs h-10"
                                    {...register("plaque")}
                                />
                                {/* Display plaque validation error */}
                                {errors.plaque && (
                                    <FieldError>
                                        {errors.plaque.message}
                                    </FieldError>
                                )}
                            </Field>

                            <Field>
                                <Label htmlFor="unit">واحد</Label>
                                <Input
                                    id="unit"
                                    type="text"
                                    inputMode="numeric"
                                    placeholder="مثلاً ۳"
                                    className="bg-transparent! rounded-xs h-10"
                                    {...register("unit")}
                                />
                                {/* Display unit validation error */}
                                {errors.unit && (
                                    <FieldError>
                                        {errors.unit.message}
                                    </FieldError>
                                )}
                            </Field>
                        </div>

                        {/* Postal code */}
                        <Field>
                            <Label htmlFor="postalCode">کد پستی *</Label>
                            <Input
                                id="postalCode"
                                type="text"
                                inputMode="numeric"
                                maxLength={10}
                                placeholder="کد پستی ۱۰ رقمی"
                                className="bg-transparent! rounded-xs h-10"
                                {...register("postalCode")}
                            />
                            {/* Display postal code validation error */}
                            {errors.postalCode && (
                                <FieldError>
                                    {errors.postalCode.message}
                                </FieldError>
                            )}
                        </Field>

                        {/* Optional delivery instructions */}
                        <Field>
                            <Label htmlFor="recipientNote">توضیحات تحویل</Label>
                            <Textarea
                                id="recipientNote"
                                placeholder="توضیحات مربوط به تحویل سفارش را وارد کنید"
                                className="bg-transparent! rounded-xs h-24 overflow-y-auto resize-none scrollbar-thin"
                                {...register("recipientNote")}
                            />
                            {/* Display delivery note validation error */}
                            {errors.recipientNote && (
                                <FieldError>
                                    {errors.recipientNote.message}
                                </FieldError>
                            )}
                        </Field>
                    </FieldGroup>

                    {/* Continue to the delivery method step */}
                    <Button type="submit" size="lg" className="mt-6">
                        تایید و ادامه
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};

export default ShippingStep;
