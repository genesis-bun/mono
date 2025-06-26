import { Link, useLocation } from "@tanstack/react-router";
import { Button } from "../ui/button";

export default function Sidebar() {
    const { pathname } = useLocation();
    const isActive = (path: string) => pathname === path;

    return (
        <div className="fixed top-[var(--navbar-height)] h-[calc(100dvh-var(--navbar-height))] w-[var(--sidebar-width)] left-0 z-40 border-r bg-background hidden sm:flex">
            <div className="flex flex-col w-full gap-2 px-4 mt-4">
                <Button variant={isActive("/") ? "outline" : "ghost"} className="w-full" asChild>
                    <Link to="/">Home</Link>
                </Button>
            </div>
        </div>
    )
}