"use client";

import { SidebarMenuItem } from "@/components/ui/sidebar";
import { Inbox } from "lucide-react";
import { cn } from "@/lib/utils";

export default function EmptyText() {
    return (
        <SidebarMenuItem>
            <div
                className={cn(
                    "flex h-12 w-full items-center justify-center rounded-md",
                    "border border-dashed border-sidebar-border/60",
                    "bg-sidebar-accent/20 px-2 text-sidebar-foreground/50 select-none",
                )}
            >
                <div className="flex items-center gap-2 text-[13px]">
                    <Inbox className="h-4 w-4 opacity-70" />
                    <span className="font-medium tracking-tight">
                        No files uploaded
                    </span>
                </div>
            </div>
        </SidebarMenuItem>
    );
}
