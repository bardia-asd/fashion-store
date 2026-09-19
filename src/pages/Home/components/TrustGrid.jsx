import { trustFeatures } from "@/data/trustData";

const TrustGrid = () => {
    return (
        // Trust features section
        <section className="py-20 lg:py-28">
            <div className="container-app">
                {/* Responsive grid of store benefits */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">
                    {trustFeatures.map((feature) => {
                        const Icon = feature.icon;

                        return (
                            // Individual trust feature
                            <div
                                key={feature.title}
                                className="flex flex-col items-center text-center">
                                {/* Feature icon */}
                                <div className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-muted">
                                    <Icon size={20} />
                                </div>

                                {/* Feature title */}
                                <h5 className="mb-1.5 text-sm font-semibold">
                                    {feature.title}
                                </h5>

                                {/* Feature description */}
                                <p className="text-xs text-muted-foreground">
                                    {feature.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default TrustGrid;
