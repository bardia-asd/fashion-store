import { Input } from "@/components/ui/input";
import { Label } from "./components/ui/label";
import { Separator } from "./components/ui/separator";

const App = () => {
    return (
        <div className="flex flex-col gap-4 p-5 max-w-lg">
            <Label htmlFor="name">نام محصول:</Label>
            <Input id="name" placeholder="نام محصول" className="h-11" />
            <Separator />
        </div>
    );
};

export default App;
