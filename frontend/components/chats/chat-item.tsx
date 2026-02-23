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
                "w-full py-6 px-0 transition-colors duration-200 bg-background/20",
            )}
        >
            <div className="max-w-full mx-auto flex gap-5">
                <div className="shrink-0 mt-1">
                    <div
                        className={cn(
                            "flex h-8 w-8 items-center justify-center rounded-lg border text-sm transition-all",
                            isAssistant
                                ? "bg-foreground text-background shadow-md border-transparent"
                                : "bg-background border-border",
                        )}
                    >
                        {isAssistant ? (
                            <Bot size={18} strokeWidth={2.5} />
                        ) : (
                            <User size={18} />
                        )}
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 min-w-0 space-y-1.5">
                    <div className="flex items-center gap-2">
                        <span className="text-[12px] font-medium tracking-tight text-foreground/50">
                            {isAssistant ? "AI ASSISTANT" : "YOU"}
                        </span>
                    </div>

                    <div
                        className={cn(
                            "text-[14.5px] leading-7 text-foreground/90 selection:bg-primary/30",
                            "whitespace-pre-wrap wrap-break-word",
                        )}
                    >
                        {content}
                    </div>
                </div>
            </div>
        </div>
    );
}
