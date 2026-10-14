import { Bell, LockKeyhole, Mail, Package, ShieldCheck } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const ProfileSettings = () => {
    return (
        // Account settings card
        <Card className="px-4">
            <CardHeader className="mb-6 border-b px-0">
                {/* Settings section label and title */}
                <span className="text-[10px] font-semibold text-muted-foreground">
                    تنظیمات حساب
                </span>

                <CardTitle className="text-2xl font-normal">تنظیمات</CardTitle>
            </CardHeader>

            <CardContent className="space-y-8 px-0">
                {/* Notification settings */}
                <section className="space-y-5">
                    {/* Notification section heading and description */}
                    <div className="flex items-center gap-3">
                        <div className="flex size-10 items-center justify-center rounded-full bg-muted">
                            <Bell className="size-5" />
                        </div>

                        <div>
                            <h3 className="font-medium">اعلان‌ها</h3>
                            <p className="text-sm text-muted-foreground">
                                مدیریت اعلان‌ها و پیام‌های دریافتی
                            </p>
                        </div>
                    </div>

                    {/* Toggle individual notification preferences */}
                    <div className="space-y-5">
                        {/* Order status notifications */}
                        <div className="flex items-center justify-between gap-4">
                            <div className="space-y-1">
                                <Label htmlFor="orderNotifications">
                                    وضعیت سفارش‌ها
                                </Label>
                                <p className="text-sm text-muted-foreground">
                                    اطلاع از وضعیت و تغییرات سفارش
                                </p>
                            </div>

                            <Switch id="orderNotifications" />
                        </div>

                        <Separator />

                        {/* Email notifications */}
                        <div className="flex items-center justify-between gap-4">
                            <div className="space-y-1">
                                <Label htmlFor="emailNotifications">
                                    اعلان‌های ایمیلی
                                </Label>
                                <p className="text-sm text-muted-foreground">
                                    دریافت پیام‌های مهم حساب از طریق ایمیل
                                </p>
                            </div>

                            <Switch id="emailNotifications" />
                        </div>

                        <Separator />

                        {/* Promotional and discount notifications */}
                        <div className="flex items-center justify-between gap-4">
                            <div className="space-y-1">
                                <Label htmlFor="promotionalNotifications">
                                    پیشنهادها و تخفیف‌ها
                                </Label>
                                <p className="text-sm text-muted-foreground">
                                    اطلاع از محصولات جدید و تخفیف‌های ویژه
                                </p>
                            </div>

                            <Switch id="promotionalNotifications" />
                        </div>
                    </div>
                </section>

                <Separator />

                {/* Account security information */}
                <section className="space-y-4">
                    {/* Security section heading and description */}
                    <div className="flex items-center gap-3">
                        <div className="flex size-10 items-center justify-center rounded-full bg-muted">
                            <ShieldCheck className="size-5" />
                        </div>

                        <div>
                            <h3 className="font-medium">امنیت حساب</h3>
                            <p className="text-sm text-muted-foreground">
                                اطلاعات مربوط به امنیت حساب کاربری
                            </p>
                        </div>
                    </div>

                    {/* Explain the currently available security options */}
                    <div className="flex items-start gap-3 rounded-lg border p-4">
                        <LockKeyhole className="mt-0.5 size-5 shrink-0 text-muted-foreground" />

                        <div className="space-y-1">
                            <p className="text-sm font-medium">
                                رمز عبور و ورود
                            </p>
                            <p className="text-sm leading-6 text-muted-foreground">
                                برای تغییر ایمیل یا اطلاعات شخصی، به بخش اطلاعات
                                حساب مراجعه کنید. تنظیمات امنیتی پیشرفته در حال
                                حاضر در دسترس نیستند.
                            </p>
                        </div>
                    </div>
                </section>

                <Separator />

                {/* Support and account contact information */}
                <section className="space-y-4">
                    {/* Contact section heading and description */}
                    <div className="flex items-center gap-3">
                        <div className="flex size-10 items-center justify-center rounded-full bg-muted">
                            <Mail className="size-5" />
                        </div>

                        <div>
                            <h3 className="font-medium">ارتباط با ما</h3>
                            <p className="text-sm text-muted-foreground">
                                راه‌های دریافت پشتیبانی و پیگیری سفارش
                            </p>
                        </div>
                    </div>

                    {/* Explain how to find order information */}
                    <div className="flex items-start gap-3 rounded-lg border p-4">
                        <Package className="mt-0.5 size-5 shrink-0 text-muted-foreground" />

                        <div className="space-y-1">
                            <p className="text-sm font-medium">
                                پیگیری سفارش‌ها
                            </p>
                            <p className="text-sm leading-6 text-muted-foreground">
                                برای مشاهده وضعیت خریدهای خود، از بخش سفارش‌های
                                من استفاده کنید.
                            </p>
                        </div>
                    </div>
                </section>
            </CardContent>
        </Card>
    );
};

export default ProfileSettings;
