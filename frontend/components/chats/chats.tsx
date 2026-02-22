// components/chats/chats.tsx
"use client";

import * as React from "react";
import { usePdfStore } from "@/store/use-pdf-store";
import { getPreviousConversation, createConversation } from "@/services/chats";
import { ChatMessage } from "@/types/types";
import ChatItem from "./chat-item";
import ChatInput from "./chat-input";
import LoadingChatItem from "./chat-loading";
import { cn } from "@/lib/utils";

export default function ChatUI() {
    const { selectedPdfId } = usePdfStore();
    const [messages, setMessages] = React.useState<ChatMessage[]>([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [isSending, setIsSending] = React.useState(false);

    // Fetch history when PDF changes
    React.useEffect(() => {
        if (selectedPdfId) {
            const fetchHistory = async () => {
                setIsLoading(true);
                const history = await getPreviousConversation(selectedPdfId);
                setMessages(history);
                setIsLoading(false);
            };
            fetchHistory();
        }
    }, [selectedPdfId]);

    const handleSendMessage = async (prompt: string) => {
        if (!selectedPdfId) return;
        setIsSending(true);
        const newChat = await createConversation(selectedPdfId, prompt);
        if (newChat) setMessages((prev) => [...prev, newChat]);
        setIsSending(false);
    };

    const isChatEmpty = messages.length === 0;

    return (
        <div className="flex-1 w-full h-full p-2 mx-auto max-w-2xl md:max-w-4xl">
            <div className="w-full h-full rounded-2xl">
                <ChatInput />
            </div>
        </div>
    );
}
