import { BACKEND_URL } from "@/constants/constants";
import {
    BackendChatHistoryResponse,
    BackendChatItem,
    ChatMessage,
} from "@/types/types";

const BASE_URL = `${BACKEND_URL}/chats/llm-pdf`;

export async function getPreviousConversation(
    fileId: string,
    page: number = 1,
    limit: number = 10,
): Promise<ChatMessage[]> {
    try {
        const response = await fetch(
            `${BASE_URL}/${fileId}?limit=${limit}&page=${page}`,
        );

        if (!response.ok) throw new Error("Failed to fetch history");

        const data: BackendChatHistoryResponse = await response.json();

        return data.items.map((item) => ({
            id: item.id,
            fileId: item.file_id,
            userPrompt: item.user_prompt,
            systemPrompt: item.system_prompt,
            createdAt: item.created_at,
        }));
    } catch (err) {
        console.error(err);
        return [];
    }
}

export async function createConversation(
    fileId: string,
    prompt: string,
): Promise<ChatMessage | null> {
    try {
        const response = await fetch(`${BASE_URL}/${fileId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_prompt: prompt }),
        });

        if (!response.ok) throw new Error("Failed to send message");

        const item: BackendChatItem = await response.json();

        return {
            id: item.id,
            fileId: item.file_id,
            userPrompt: item.user_prompt,
            systemPrompt: item.system_prompt,
            createdAt: item.created_at,
        };
    } catch (err) {
        console.error(err);
        return null;
    }
}
