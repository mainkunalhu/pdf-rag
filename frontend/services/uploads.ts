import { BACKEND_URL } from "@/constants/constants";
import { usePdfStore } from "@/store/use-pdf-store";
import { toast } from "sonner";

const url = `${BACKEND_URL}/uploads/pdf`;

export async function uploadNewFile(file: File) {
    const setIsUploading = usePdfStore.getState().setIsUploading;

    setIsUploading(true);
    const toastId = toast.loading(`Uploading ${file.name}...`);

    try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch(url, {
            method: "POST",
            body: formData,
        });

        if (!response.ok) throw new Error("Upload failed");

        const data = await response.json();

        toast.success("File uploaded successfully", { id: toastId });
        return data;
    } catch (err) {
        toast.error("Failed to upload file", { id: toastId });
        console.error(err);
    } finally {
        setIsUploading(false);
    }
}
