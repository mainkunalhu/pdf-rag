// components/chats/chat-loading.tsx
import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingChatItem() {
    return (
        <div className="flex w-full gap-4 py-6 bg-muted/30">
            <div className="max-w-3xl mx-auto w-full flex gap-4">
                <Skeleton className="h-8 w-8 shrink-0 rounded-md" />
                <div className="flex-1 space-y-3">
                    <Skeleton className="h-3 w-20" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-[90%]" />
                    </div>
                </div>
            </div>
        </div>
    );
}
