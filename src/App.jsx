import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "./components/ui/accordion";
import { Button } from "./components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "./components/ui/breadcrumb";

const App = () => {
    return (
        <div className="flex flex-col gap-4 p-5 max-w-sm">
            <Tabs defaultValue="description" className="w-full">
                <TabsList>
                    <TabsTrigger value="description">توضیحات</TabsTrigger>
                    <TabsTrigger value="specifications">مشخصات</TabsTrigger>
                    <TabsTrigger value="reviews">نظرات</TabsTrigger>
                </TabsList>

                <TabsContent value="description">
                    <p className="text-muted-foreground">
                        این محصول از پارچه باکیفیت و مناسب استفاده روزمره تولید
                        شده است.
                    </p>
                </TabsContent>

                <TabsContent value="specifications">
                    <div className="space-y-2">
                        <p>جنس: کتان</p>
                        <p>رنگ: سفید</p>
                        <p>سایز: S تا XL</p>
                    </div>
                </TabsContent>

                <TabsContent value="reviews">
                    <p className="text-muted-foreground">
                        هنوز نظری ثبت نشده است.
                    </p>
                </TabsContent>
            </Tabs>

            <Accordion type="single" className="max-w-sm">
                <AccordionItem value="shipping">
                    <AccordionTrigger>
                        زمان ارسال سفارش چقدر است؟
                    </AccordionTrigger>

                    <AccordionContent>
                        سفارش شما معمولاً بین ۲ تا ۴ روز کاری ارسال می‌شود.
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="return">
                    <AccordionTrigger>
                        آیا امکان مرجوع کردن کالا وجود دارد؟
                    </AccordionTrigger>

                    <AccordionContent>
                        بله، تا ۷ روز پس از دریافت سفارش امکان بازگشت وجود دارد.
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="payment">
                    <AccordionTrigger>
                        چه روش‌هایی برای پرداخت وجود دارد؟
                    </AccordionTrigger>

                    <AccordionContent>
                        پرداخت آنلاین از طریق درگاه بانکی امکان‌پذیر است.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

            <DropdownMenu>
                <DropdownMenuTrigger render={<Button variant="outline" />}>
                    حساب کاربری
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                    <DropdownMenuGroup>
                        <DropdownMenuLabel>حساب من</DropdownMenuLabel>

                        <DropdownMenuItem>پروفایل</DropdownMenuItem>

                        <DropdownMenuItem>سفارش‌های من</DropdownMenuItem>

                        <DropdownMenuItem>علاقه‌مندی‌ها</DropdownMenuItem>
                    </DropdownMenuGroup>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem>خروج</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">خانه</BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbSeparator />

                    <BreadcrumbItem>
                        <BreadcrumbLink href="/products">
                            محصولات
                        </BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbSeparator />

                    <BreadcrumbItem>
                        <BreadcrumbLink href="/products/shirts">
                            پیراهن
                        </BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbSeparator />

                    <BreadcrumbItem>
                        <BreadcrumbPage>پیراهن لینن</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        </div>
    );
};

export default App;
