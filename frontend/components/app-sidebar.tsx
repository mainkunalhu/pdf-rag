"use client";

import { useState, useEffect } from "react";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarRail,
} from "@/components/ui/sidebar";
import DocsCard from "./docs-cards";
import UploadDocsCard from "./upload-docs";
import { Command } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import LoadingDocsCard from "./loading-docs-card";
import EmptyText from "./empty-docs";
import { usePdfStore } from "@/store/use-pdf-store";
import { getAllUploadedFiles } from "@/services/files";
import { FileMetadata } from "@/types/types";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const [files, setFiles] = useState<FileMetadata[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { isUploading } = usePdfStore();

    useEffect(() => {
        const loadFiles = async () => {
            if (files.length === 0) {
                setIsLoading(true);
            }

            try {
                const data = await getAllUploadedFiles();
                setFiles(data);
            } finally {
                setIsLoading(false);
            }
        };

        loadFiles();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isUploading]);

    return (
        <Sidebar {...props}>
            {/* Header  */}
            <SidebarHeader className="h-16 border-b border-sidebar-border/50 px-4">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            size="lg"
                            className="hover:bg-transparent active:bg-transparent cursor-default px-0"
                        >
                            <div className="flex flex-1 items-center gap-3">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
                                    <Command className="size-4" />
                                </div>
                                <div className="flex flex-col gap-0.5 leading-none">
                                    <span className="text-sm font-semibold tracking-tight">
                                        PDF RAG
                                    </span>
                                    <span className="text-[11px] text-muted-foreground/70">
                                        Intelligent Assistant
                                    </span>
                                </div>
                            </div>
                            <div className="shrink-0">
                                <ThemeToggle />
                            </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent className="gap-0">
                {/*  Uploads Files */}
                <SidebarGroup className="pb-2">
                    <SidebarGroupLabel className="mb-2">
                        Uploads Files
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <UploadDocsCard />
                    </SidebarGroupContent>
                </SidebarGroup>

                {/* Your Documents */}
                <SidebarGroup>
                    <SidebarGroupLabel className="mb-2">
                        Your Documents
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu className="gap-1">
                            {isLoading && (
                                <>
                                    <LoadingDocsCard />
                                    <LoadingDocsCard />
                                </>
                            )}

                            {isUploading && <LoadingDocsCard />}

                            {!isLoading &&
                                files.length === 0 &&
                                !isUploading && <EmptyText />}

                            {files.map((file) => (
                                <DocsCard key={file.id} {...file} />
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarRail />
        </Sidebar>
    );
}
