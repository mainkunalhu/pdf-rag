"use client";

import { useEffect, useRef } from "react";
import { usePdfStore } from "@/store/use-pdf-store";
import { useChatStore } from "@/store/use-chat-store";
import ChatItem from "./chat-item";
import ChatInput from "./chat-input";
import LoadingChatItem from "./chat-loading";
import { ScrollArea } from "../ui/scroll-area";
import { MessageSquareOff } from "lucide-react";

export default function ChatUI() {
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const { selectedPdfId } = usePdfStore();
    const { messages, isLoading, fetchHistory } = useChatStore();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    useEffect(() => {
        if (selectedPdfId) {
            fetchHistory(selectedPdfId);
        }
    }, [selectedPdfId, fetchHistory]);

    return (
        <div className="flex-1 w-full h-full p-2 mx-auto max-w-2xl md:max-w-4xl">
            <div className="w-full h-full rounded-2xl relative">
                <div className="w-full h-full absolute top-0 left-0 z-10">
                    <ScrollArea className="w-full max-h-[75%] h-full rounded-md p-4">
                        {messages.length === 0 && !isLoading && (
                            <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-muted-foreground opacity-60">
                                <MessageSquareOff size={48} className="mb-4" />
                                <p className="text-lg font-medium">
                                    No conversation yet
                                </p>
                                <p className="text-sm">
                                    Ask a question about your document to get
                                    started.
                                </p>
                            </div>
                        )}

                        {messages.map((item) => (
                            <div key={item.id} className="space-y-4 mb-4">
                                <ChatItem
                                    role="user"
                                    content={item.userPrompt}
                                />

                                {item.systemPrompt && (
                                    <ChatItem
                                        role="assistant"
                                        content={item.systemPrompt}
                                    />
                                )}
                            </div>
                        ))}

                        {isLoading && <LoadingChatItem />}

                        <div ref={messagesEndRef} />
                    </ScrollArea>
                </div>

                <div className="absolute bottom-2 inset-x-0 mx-auto p-2.5 md:p-4 w-full max-w-2xl md:max-w-4xl border bg-background rounded-2xl z-50">
                    <ChatInput />
                </div>
            </div>
        </div>
    );
}
