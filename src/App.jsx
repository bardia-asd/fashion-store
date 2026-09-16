import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const App = () => {
    return (
        <div className="flex flex-col gap-4 p-5 max-w-sm">
            <Drawer swipeDirection="left">
                <DrawerTrigger render={<Button />}>سبد خرید</DrawerTrigger>

                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>سبد خرید</DrawerTitle>

                        <DrawerDescription>
                            محصولات انتخاب‌شده شما
                        </DrawerDescription>
                    </DrawerHeader>

                    <div className="flex-1 space-y-4 overflow-y-auto p-4">
                        <div className="flex justify-between border-b pb-4">
                            <div>
                                <p className="font-medium">پیراهن لینن</p>
                                <p className="text-sm text-muted-foreground">
                                    ۱ × ۱,۵۰۰,۰۰۰ تومان
                                </p>
                            </div>

                            <span>۱,۵۰۰,۰۰۰ تومان</span>
                        </div>
                    </div>

                    <DrawerFooter>
                        <div className="flex justify-between">
                            <span>مجموع</span>
                            <span className="font-semibold">
                                ۱,۵۰۰,۰۰۰ تومان
                            </span>
                        </div>

                        <Button>ادامه پرداخت</Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>

            <Dialog>
                <DialogTrigger render={<Button variant="destructive" />}>
                    حذف محصول
                </DialogTrigger>

                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>حذف محصول؟</DialogTitle>

                        <DialogDescription>
                            آیا مطمئن هستید که می‌خواهید این محصول را حذف کنید؟
                        </DialogDescription>
                    </DialogHeader>

                    <DialogFooter>
                        <Button variant="destructive">حذف</Button>

                        <Button variant="outline">انصراف</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default App;
