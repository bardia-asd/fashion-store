const tagStyles = {
    جدید: "bg-primary text-primary-foreground",
    پرفروش: "bg-secondary text-secondary-foreground",
    تخفیف: "bg-brand text-brand-foreground",
    حراج: "bg-brand text-brand-foreground",
    محبوب: "bg-success text-success-foreground",
};

export const getTagStyle = (tag) =>
    tagStyles[tag] ?? "bg-muted text-muted-foreground";
