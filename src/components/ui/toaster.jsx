import { Toaster as Sonner } from "sonner";
import {
    CircleCheck,
    CircleX,
    Info,
    Loader2,
    TriangleAlert,
} from "lucide-react";

const Toaster = ({ ...props }) => {
    return (
        <Sonner
            dir="rtl"
            theme="light"
            position="bottom-right"
            closeButton
            duration={4000}
            visibleToasts={3}
            icons={{
                success: <CircleCheck className="size-4 text-success" />,
                error: <CircleX className="size-4 text-[#C34B42]" />,
                info: <Info className="size-4 text-brand" />,
                warning: <TriangleAlert className="size-4 text-brand" />,
                loading: <Loader2 className="size-4 animate-spin" />,
            }}
            style={{
                "--normal-bg": "var(--popover)",
                "--normal-text": "var(--popover-foreground)",
                "--normal-border": "var(--border)",
                "--border-radius": "var(--radius)",
            }}
            toastOptions={{
                classNames: {
                    toast: "font-sans text-sm",
                    description: "!text-muted-foreground",
                    actionButton: "!bg-foreground !text-background",
                    cancelButton: "!bg-muted !text-foreground",
                },
            }}
            {...props}
        />
    );
};

export { Toaster };
