"use client";

import * as React from "react";
import { Upload, FileUp, Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { uploadNewFile } from "@/services/uploads";

export default function UploadDocsCard() {
    const [isDragging, setIsDragging] = React.useState(false);

    const onDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const onDragLeave = () => setIsDragging(false);

    return (
        <Card
            className={cn(
                "relative group overflow-hidden border-dashed border-2 transition-all duration-200",
                "hover:border-primary/50 hover:bg-primary/2",
                isDragging
                    ? "border-primary bg-primary/5 ring-4 ring-primary/5"
                    : "border-muted-foreground/20",
            )}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDragLeave}
        >
            <Label
                htmlFor="file-upload"
                className="flex flex-col items-center justify-center w-full h-32 cursor-pointer"
            >
                <div className="flex flex-col items-center justify-center pb-1">
                    {/* Icon Stack */}
                    <div className="relative mb-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                            <Upload className="h-5 w-5" />
                        </div>
                        <div className="absolute -right-1 -bottom-1 flex h-5 w-5 items-center justify-center rounded-full bg-foreground text-background border-2 border-background">
                            <Plus className="h-3 w-3" />
                        </div>
                    </div>

                    {/* Text logic */}
                    <p className="text-xs font-medium text-muted-foreground">
                        Click to upload{" "}
                        <span className="text-muted-foreground">
                            or drag and drop
                        </span>
                    </p>
                    <p className="text-xs text-muted-foreground/90 mt-0.5">
                        PDF, TXT, or DOCX (max. 10MB)
                    </p>
                </div>

                {/* Hidden Input */}
                <Input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    accept=".pdf,.txt,.docx"
                    onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                            await uploadNewFile(file);
                        }
                    }}
                />
            </Label>
        </Card>
    );
}
