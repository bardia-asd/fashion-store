import { PackageSearch } from "lucide-react";

const ProductsEmptyState = ({ title, description }) => (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
        <div className="flex size-14 items-center justify-center rounded-full bg-muted">
            <PackageSearch className="size-7 text-muted-foreground" />
        </div>
        <div className="space-y-1">
            <p className="font-medium">{title}</p>
            <p className="text-sm text-muted-foreground">{description}</p>
        </div>
    </div>
);

export default ProductsEmptyState;
