"use client";

import { SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingDocsCard() {
    return (
        <SidebarMenuItem>
            <SidebarMenuButton
                className="relative h-14 w-full cursor-default hover:bg-transparent"
                disabled
            >
                <div className="flex items-center gap-3 w-full">
                    <Skeleton className="h-8 w-8 shrink-0 rounded-md bg-sidebar-accent-foreground/10" />
                    <div className="flex flex-1 flex-col items-start gap-1.5 overflow-hidden">
                        <Skeleton className="h-3.5 w-24 rounded bg-sidebar-accent-foreground/10" />
                        <Skeleton className="h-3 w-full rounded bg-sidebar-accent-foreground/10" />
                    </div>
                </div>
            </SidebarMenuButton>
        </SidebarMenuItem>
    );
}
