import { Link, Outlet } from "react-router";

const AuthLayout = () => {
    return (
        <div className="min-h-dvh pb-14 md:pb-0 grid grid-cols-1 lg:grid-cols-2">
            <section className="relative hidden lg:block text-white">
                <img
                    src="https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="استایل جدید از کالکشن DBY"
                    className="w-full max-h-dvh object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/25 to-black/0" />
                <div className="absolute top-11 left-12 text-2xl tracking-widest font-bold font-serif">
                    DBY
                </div>
                <div className="absolute bottom-16 right-12">
                    <span className="uppercase text-xs text-white/80 tracking-widest font-semibold">
                        the new collection
                    </span>
                    <h1 className="font-semibold text-5xl xl:text-7xl mt-4">
                        پوشیدن
                        <br /> لحظه‌هاست.
                    </h1>
                </div>
            </section>
            <section className="px-12 py-11 pb-7 flex flex-col">
                <div className="mb-3">
                    <Link
                        to="/"
                        className="text-2xl tracking-widest font-bold font-serif">
                        DBY
                    </Link>
                </div>

                <Outlet />
            </section>
        </div>
    );
};

export default AuthLayout;
