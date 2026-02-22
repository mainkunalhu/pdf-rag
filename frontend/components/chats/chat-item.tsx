// components/chats/chat-item.tsx
import { cn } from "@/lib/utils";
import { User, Bot } from "lucide-react";

interface ChatItemProps {
    role: "user" | "assistant";
    content: string;
}

export default function ChatItem({ role, content }: ChatItemProps) {
    const isAssistant = role === "assistant";

    return (
        <div
            className={cn(
                "w-full py-8 px-4",
                isAssistant
                    ? "bg-muted/30 border-y border-border/5"
                    : "bg-background",
            )}
        >
            <div className="max-w-3xl mx-auto flex gap-6">
                {/* Avatar */}
                <div
                    className={cn(
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-sm border",
                        isAssistant
                            ? "bg-primary text-primary-foreground shadow-sm"
                            : "bg-background",
                    )}
                >
                    {isAssistant ? <Bot size={16} /> : <User size={16} />}
                </div>

                {/* Content */}
                <div className="flex-1 space-y-2">
                    <p className="text-[13px] font-semibold uppercase tracking-wider opacity-50">
                        {isAssistant ? "Assistant" : "You"}
                    </p>
                    <div className="text-[15px] leading-relaxed text-foreground/90 whitespace-pre-wrap selection:bg-primary/20">
                        {content}
                    </div>
                </div>
            </div>
        </div>
    );
}
