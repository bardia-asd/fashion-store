const SocialGrid = () => {
    return (
        <section className="py-20 lg:py-28">
            <div className="container-app">
                <div className="text-center mb-10">
                    <span
                        className="font-semibold text-xs text-muted-foreground"
                        dir="ltr">
                        @DBYofficial
                    </span>

                    <h2 className="font-bold text-2xl sm:text-4xl lg:text-5xl mt-3">
                        دنیای ما را دنبال کنید
                    </h2>
                </div>

                <div className="grid grid-cols-3 lg:grid-cols-6 gap-2 lg:gap-3">
                    <div className="aspect-square rounded-2xl overflow-hidden">
                        <img
                            src="https://images.unsplash.com/photo-1789348948862-448c72a2df93?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt=""
                            className="object-cover size-full"
                        />
                    </div>

                    <div className="aspect-square rounded-2xl overflow-hidden">
                        <img
                            src="https://images.unsplash.com/photo-1789660817213-260c3815de6f?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt=""
                            className="object-cover size-full"
                        />
                    </div>

                    <div className="aspect-square rounded-2xl overflow-hidden">
                        <img
                            src="https://plus.unsplash.com/premium_photo-1789437506333-c40e823b03b3?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt=""
                            className="object-cover size-full"
                        />
                    </div>

                    <div className="aspect-square rounded-2xl overflow-hidden">
                        <img
                            src="https://images.unsplash.com/photo-1788799114867-a1a417fc1061?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt=""
                            className="object-cover size-full"
                        />
                    </div>

                    <div className="aspect-square rounded-2xl overflow-hidden">
                        <img
                            src="https://images.unsplash.com/photo-1789234350520-841478d6e6e3?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt=""
                            className="object-cover size-full"
                        />
                    </div>

                    <div className="aspect-square rounded-2xl overflow-hidden">
                        <img
                            src="https://images.unsplash.com/photo-1783946194585-aa6c72202452?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt=""
                            className="object-cover size-full"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SocialGrid;
