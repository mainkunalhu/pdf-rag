import { create } from "zustand";
import { ChatMessage } from "@/types/types";
import { getPreviousConversation, createConversation } from "@/services/chats";

interface ChatState {
    messages: ChatMessage[];
    isLoading: boolean;
    fetchHistory: (fileId: string) => Promise<void>;
    sendMessage: (fileId: string, prompt: string) => Promise<void>;
}

export const useChatStore = create<ChatState>((set) => ({
    messages: [],
    isLoading: false,

    fetchHistory: async (fileId: string) => {
        const history = await getPreviousConversation(fileId);
        set({ messages: history });
    },

    sendMessage: async (fileId: string, prompt: string) => {
        const optimisticUserMessage: ChatMessage = {
            id: crypto.randomUUID(),
            fileId: fileId,
            userPrompt: prompt,
            systemPrompt: "",
            createdAt: new Date().toISOString(),
        };

        set((state) => ({
            messages: [...state.messages, optimisticUserMessage],
            isLoading: true,
        }));

        const result = await createConversation(fileId, prompt);

        if (result) {
            set((state) => ({
                messages: state.messages.map((m) =>
                    m.id === optimisticUserMessage.id ? result : m,
                ),
                isLoading: false,
            }));
        } else {
            set((state) => ({
                messages: state.messages.filter(
                    (m) => m.id !== optimisticUserMessage.id,
                ),
                isLoading: false,
            }));
        }
    },
}));
