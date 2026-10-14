import { Construction } from "lucide-react";

const ProfileAddresses = () => {
    return (
        <div className="flex min-h-[350px] flex-col items-center justify-center rounded-xl border border-dashed p-6 text-center sm:p-10">
            <div className="mb-5 flex size-14 items-center justify-center rounded-full bg-muted">
                <Construction className="size-7 text-muted-foreground" />
            </div>

            <h2 className="text-xl font-semibold">بخش آدرس‌ها به‌زودی</h2>

            <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
                در حال آماده‌سازی این بخش هستیم تا بتوانید آدرس‌های ارسال خود را
                به‌راحتی مدیریت کنید. به‌زودی در دسترس شما خواهد بود.
            </p>
        </div>
    );
};

export default ProfileAddresses;
