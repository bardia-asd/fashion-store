import { Checkbox } from "./components/ui/checkbox";
import {
    Field,
    FieldDescription,
    FieldError,
    FieldLabel,
} from "./components/ui/field";
import { Input } from "./components/ui/input";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "./components/ui/input-otp";
import { Label } from "./components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./components/ui/select";
import { Textarea } from "./components/ui/textarea";

const App = () => {
    return (
        <div className="flex flex-col gap-4 p-5">
            <Field className="max-w-sm">
                <FieldLabel htmlFor="email">ایمیل</FieldLabel>

                <Input
                    id="email"
                    type="email"
                    placeholder="example@email.com"
                />

                <FieldDescription>
                    ایمیل شما برای ارسال سفارش استفاده می‌شود.
                </FieldDescription>

                <FieldError>ایمیل وارد شده معتبر نیست.</FieldError>
            </Field>

            <div className="flex items-center gap-2">
                <Checkbox id="terms" />

                <Label htmlFor="terms">قوانین و شرایط را می‌پذیرم</Label>
            </div>

            <Select>
                <SelectTrigger className="w-[200px]" dir="rtl">
                    <SelectValue placeholder="انتخاب دسته‌بندی" />
                </SelectTrigger>

                <SelectContent>
                    <SelectItem value="shirts">پیراهن</SelectItem>
                    <SelectItem value="pants">شلوار</SelectItem>
                    <SelectItem value="shoes">کفش</SelectItem>
                    <SelectItem value="accessories">اکسسوری</SelectItem>
                </SelectContent>
            </Select>

            <div className="grid gap-2 max-w-sm">
                <Label htmlFor="address">آدرس</Label>

                <Textarea
                    id="address"
                    placeholder="آدرس کامل خود را وارد کنید..."
                    dir="rtl"
                />
            </div>

            <div className="grid gap-3 max-w-sm">
                <p className="text-sm font-medium">کد تأیید را وارد کنید</p>

                <InputOTP maxLength={6} dir="ltr">
                    <InputOTPGroup className="flex-row-reverse gap-2">
                        <InputOTPSlot index={0} className="rounded-lg size-9"/>
                        <InputOTPSlot index={1} className="rounded-lg size-9"/>
                        <InputOTPSlot index={2} className="rounded-lg size-9"/>
                        <InputOTPSlot index={3} className="rounded-lg size-9"/>
                        <InputOTPSlot index={4} className="rounded-lg size-9"/>
                        <InputOTPSlot index={5} className="rounded-lg size-9"/>
                    </InputOTPGroup>
                </InputOTP>
            </div>
        </div>
    );
};

export default App;
