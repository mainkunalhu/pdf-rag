"use client";

import { FileText, FileCode, File } from "lucide-react";
import { usePdfStore } from "@/store/use-pdf-store";
import { cn } from "@/lib/utils";
import { SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";

interface DocsCardProps {
    id: string;
    title: string;
    description: string;
    fileType: string;
}

export default function DocsCard({
    id,
    title,
    description,
    fileType,
}: DocsCardProps) {
    const { selectedPdfId, setSelectedPdfId, setSelectedPdfName } =
        usePdfStore();
    const isSelected = selectedPdfId === id;

    const getIcon = (type: string) => {
        const iconClass = "h-4 w-4 shrink-0";
        switch (type.toUpperCase()) {
            case "PDF":
                return (
                    <FileText
                        className={cn(
                            iconClass,
                            isSelected
                                ? "text-primary"
                                : "text-muted-foreground",
                        )}
                    />
                );
            case "TS":
            case "JS":
                return (
                    <FileCode
                        className={cn(
                            iconClass,
                            isSelected
                                ? "text-primary"
                                : "text-muted-foreground",
                        )}
                    />
                );
            default:
                return (
                    <File
                        className={cn(
                            iconClass,
                            isSelected
                                ? "text-primary"
                                : "text-muted-foreground",
                        )}
                    />
                );
        }
    };

    const handleClick = () => {
        setSelectedPdfId(id);
        setSelectedPdfName(title);
    };

    return (
        <SidebarMenuItem>
            <SidebarMenuButton
                isActive={isSelected}
                onClick={handleClick}
                className={cn(
                    "relative h-14 w-full  transition-all duration-200 group",
                    isSelected
                        ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                        : "hover:bg-sidebar-accent/50 text-muted-foreground hover:text-foreground",
                )}
            >
                <div className="flex items-center gap-3 w-full">
                    {/*  Icon */}
                    <div
                        className={cn(
                            "flex h-8 w-8 shrink-0 items-center justify-center rounded-md border transition-colors",
                            isSelected
                                ? "bg-background/10 border-primary/10 shadow-sm"
                                : "bg-muted/30 border-transparent",
                        )}
                    >
                        {getIcon(fileType)}
                    </div>

                    {/* Text */}
                    <div className="flex flex-1 flex-col items-start overflow-hidden leading-tight">
                        <span className="truncate text-sm tracking-tight">
                            {title}
                        </span>
                        <span className="truncate text-xs opacity-60">
                            {description}
                        </span>
                    </div>
                </div>
            </SidebarMenuButton>
        </SidebarMenuItem>
    );
}
