import { Grid2X2, Heart, List } from "lucide-react";
import { Toggle } from "./components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "./components/ui/toggle-group";
import { Switch } from "./components/ui/switch";
import { Label } from "./components/ui/label";
import { Slider } from "./components/ui/slider";

const App = () => {
    return (
        <div className="flex flex-col gap-4 p-5 max-w-sm">
            <Toggle
                aria-label="افزودن به علاقه‌مندی‌ها"
                variant="outline"
                className="size-9">
                <Heart />
            </Toggle>

            <ToggleGroup type="multiple">
                <ToggleGroupItem value="small">S</ToggleGroupItem>
                <ToggleGroupItem value="medium">M</ToggleGroupItem>
                <ToggleGroupItem value="large">L</ToggleGroupItem>
            </ToggleGroup>

            <div className="flex items-center justify-end gap-3" dir="ltr">
                <Label htmlFor="stock">فقط محصولات موجود</Label>
                <Switch id="stock" />
            </div>

            <div className="space-y-4" dir="ltr">
                <Label dir="rtl">محدوده قیمت</Label>

                <Slider
                    defaultValue={[500000, 5000000]}
                    min={0}
                    max={10000000}
                    step={100000}
                />

                <div className="flex justify-between text-sm text-muted-foreground">
                    <span>ارزان‌ترین</span>
                    <span>گران‌ترین</span>
                </div>
            </div>
        </div>
    );
};

export default App;
