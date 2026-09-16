import { AspectRatio } from "./components/ui/aspect-ratio";
import { Badge } from "./components/ui/badge";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardFooter } from "./components/ui/card";
import { Skeleton } from "./components/ui/skeleton";

const App = () => {
    return (
        <div className="flex flex-col gap-4 p-5">
            <Card className="overflow-hidden max-w-lg">
                <div className="relative">
                    <img
                        src="https://plus.unsplash.com/premium_photo-1784699324917-98ae0a1bd251?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="پیراهن لینن"
                        className="w-full object-cover"
                    />

                    <Badge className="absolute right-3 top-3">جدید</Badge>
                </div>

                <CardContent className="space-y-2 p-4">
                    <p className="text-sm text-muted-foreground">
                        پیراهن مردانه
                    </p>

                    <h3 className="font-medium">پیراهن لینن کلاسیک</h3>

                    <p className="font-semibold">۱,۸۹۰,۰۰۰ تومان</p>
                </CardContent>

                <CardFooter className="p-4 pt-0">
                    <Button className="w-full">افزودن به سبد</Button>
                </CardFooter>
            </Card>

            <div className="flex gap-2">
                <Badge>جدید</Badge>

                <Badge variant="secondary">پرفروش</Badge>

                <Badge variant="outline">موجود</Badge>

                <Badge variant="destructive">ناموجود</Badge>

                <Badge className="bg-success text-white">۲۰٪ تخفیف</Badge>
            </div>

            <div className="space-y-4 max-w-lg">
                <Skeleton className="aspect-square w-full" />

                <div className="space-y-2">
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-5 w-1/2" />
                </div>

                <Skeleton className="h-10 w-full" />
            </div>

            <AspectRatio ratio={3 / 4}>
                <img
                    src="https://plus.unsplash.com/premium_photo-1784699324917-98ae0a1bd251?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="پیراهن لینن"
                    className="h-full w-full object-cover"
                />
            </AspectRatio>
        </div>
    );
};

export default App;
