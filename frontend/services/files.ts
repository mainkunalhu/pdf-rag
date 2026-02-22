import { BACKEND_URL } from "@/constants/constants";
import { BackendFileResponse, FileMetadata } from "@/types/types";
import { toast } from "sonner";

export async function getAllUploadedFiles(): Promise<FileMetadata[]> {
    try {
        const response = await fetch(`${BACKEND_URL}/files`);
        if (!response.ok) {
            toast.error("Error fetching files");
            throw new Error(`Failed to fetch files: ${response.statusText}`);
        }

        const data: BackendFileResponse[] = await response.json();
        return data
            .map((file: any) => ({
                id: file.id,
                title: file.file_name,
                description: file.file_description,
                fileType: file.file_type,
                createdAt: file.created_at,
            }))
            .reverse();
    } catch (err) {
        console.error("Error fetching files:", err);
        toast.error("Error fetching files");
        return [];
    }
}

export async function getFilesById(id: string) {}

export async function deleteUploadedFile(id: string) {}
