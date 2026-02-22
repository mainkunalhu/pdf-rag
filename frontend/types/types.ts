export interface BackendFileResponse {
    id: string;
    file_name: string;
    file_description: string;
    file_type: string;
    created_at: string;
}

export interface FileMetadata {
    id: string;
    title: string;
    description: string;
    fileType: string;
    createdAt: string;
}

export interface BackendChatHistoryResponse {
    items: BackendChatItem[];
    total: number;
    page: number;
    limit: number;
}

export interface BackendChatItem {
    id: string;
    file_id: string;
    user_prompt: string;
    system_prompt: string;
    created_at: string;
}

export interface ChatMessage {
    id: string;
    fileId: string;
    userPrompt: string;
    systemPrompt: string;
    createdAt: string;
}
