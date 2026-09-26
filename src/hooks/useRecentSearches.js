import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "recent-searches";
const MAX_RECENT = 6;

export const useRecentSearches = () => {
    const [recentSearches, setRecentSearches] = useState([]);

    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) setRecentSearches(JSON.parse(stored));
        } catch {
            // localStorage unavailable or corrupted — fail silently, start empty
        }
    }, []);

    const addSearch = useCallback((term) => {
        const trimmed = term.trim();
        if (!trimmed) return;

        setRecentSearches((prev) => {
            const next = [trimmed, ...prev.filter((t) => t !== trimmed)].slice(
                0,
                MAX_RECENT,
            );
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
            } catch {
                // storage full/unavailable — keep working in memory only
            }
            return next;
        });
    }, []);

    const clearSearches = useCallback(() => {
        setRecentSearches([]);
        try {
            localStorage.removeItem(STORAGE_KEY);
        } catch {}
    }, []);

    return { recentSearches, addSearch, clearSearches };
};

export default useRecentSearches;
