import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Search, XIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import SearchTermLink from "./SearchTermLink";
import SearchProductCard from "./SearchProductCard";

import { useRecentSearches } from "@/hooks/useRecentSearches";

const trendingSearches = [
    "پالتوی پشمی",
    "شلوار کتان",
    "کفش دربی چرمی",
    "بافت کشمیر",
];

const SearchOverlay = () => {
    // Control whether the search overlay is open
    const [open, setOpen] = useState(false);

    // Store the current search input
    const [searchQuery, setSearchQuery] = useState("");

    // Get recent searches and search history actions
    const { recentSearches, addSearch, clearSearches } = useRecentSearches();

    // Get the current URL and navigation function
    const { pathname, search } = useLocation();
    const navigate = useNavigate();

    // Reset the search state whenever the route changes
    useEffect(() => {
        setSearchQuery("");
        setOpen(false);
    }, [pathname, search]);

    // Submit the search query and navigate to the search page
    const handleSubmit = (e) => {
        e.preventDefault();

        const query = searchQuery.trim();

        // Ignore empty search queries
        if (!query) return;

        // Save the search and navigate to the results page
        addSearch(query);
        setSearchQuery("");
        setOpen(false);
        navigate(`/search?q=${encodeURIComponent(query)}`);
    };

    return (
        // Dialog controls the search overlay's open and close state
        <Dialog open={open} onOpenChange={setOpen}>
            {/* Search button that opens the overlay */}
            <DialogTrigger
                render={
                    <Button
                        variant="ghost"
                        size="icon"
                        aria-label="جستجو"
                        className="size-8.5 [&_svg:not([class*='size-'])]:size-4.5">
                        <Search />
                    </Button>
                }
            />

            {/* Full-screen search overlay */}
            <DialogContent
                showCloseButton={false}
                className="inset-0 top-0 left-0 max-w-none translate-x-0 translate-y-0 rounded-none px-0 py-8 size-full sm:max-w-none overflow-y-auto scrollbar-thin">
                <div className="container-app max-w-5xl w-full">
                    {/* Search input and close button */}
                    <DialogHeader className="flex-row items-center gap-1 lg:gap-4">
                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-1 items-center gap-2">
                            {/* Search icon */}
                            <Search
                                size={22}
                                className="shrink-0 text-muted-foreground"
                            />

                            {/* Search input */}
                            <Input
                                autoFocus
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="h-9 flex-1 border-none bg-transparent! text-lg shadow-none outline-none ring-0 focus-visible:border-none focus-visible:ring-0 placeholder:text-lg md:h-12 md:text-2xl md:placeholder:text-2xl"
                                placeholder="جستجو در استایل‌ها، محصولات، کالکشن‌ها..."
                            />
                        </form>

                        {/* Close search overlay */}
                        <DialogClose
                            data-slot="dialog-close"
                            render={
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="size-9 [&_svg:not([class*='size-'])]:size-5"
                                />
                            }>
                            <XIcon />
                            <span className="sr-only">Close</span>
                        </DialogClose>
                    </DialogHeader>

                    {/* Recent searches */}
                    {recentSearches?.length > 0 && (
                        <div className="mt-6 md:mt-10">
                            <div className="flex items-center justify-between">
                                {/* Recent searches title */}
                                <span className="text-xs font-bold text-secondary-foreground">
                                    جستجوهای اخیر
                                </span>

                                {/* Clear search history */}
                                <Button
                                    variant="link"
                                    size="sm"
                                    onClick={clearSearches}
                                    className="h-auto px-2 py-1 text-xs text-muted-foreground">
                                    پاک کردن
                                </Button>
                            </div>

                            {/* Recent search terms */}
                            <div className="mt-3 flex flex-wrap gap-1.5 md:mt-5 md:gap-2">
                                {recentSearches.map((term) => (
                                    <SearchTermLink key={term} term={term} />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Popular searches */}
                    <div className="mt-6 md:mt-10">
                        {/* Popular searches title */}
                        <span className="text-xs text-secondary-foreground font-bold">
                            جستجوهای پرطرفدار
                        </span>

                        {/* Popular search terms */}
                        <div className="flex flex-wrap gap-1.5 md:gap-2 mt-3 md:mt-5">
                            {trendingSearches.map((term) => (
                                <SearchTermLink key={term} term={term} />
                            ))}
                        </div>
                    </div>

                    {/* Featured products */}
                    <div className="mt-6 md:mt-10">
                        {/* Featured products title */}
                        <span className="text-xs text-secondary-foreground font-bold">
                            محصولات ویژه
                        </span>

                        {/* Grid of featured search products */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-5">
                            <SearchProductCard />
                            <SearchProductCard />
                            <SearchProductCard />
                            <SearchProductCard />
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default SearchOverlay;
