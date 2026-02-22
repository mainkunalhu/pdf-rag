import { create } from "zustand";

interface PdfState {
    selectedPdfName: string;
    setSelectedPdfName: (fileName: string) => void;
    selectedPdfId: string | null;
    isUploading: boolean;
    setSelectedPdfId: (id: string | null) => void;
    setIsUploading: (loading: boolean) => void;
}

export const usePdfStore = create<PdfState>((set) => ({
    selectedPdfName: "No Docs Selected",
    setSelectedPdfName: (fileName) =>
        set({ selectedPdfName: fileName.split(".")[0] }),
    selectedPdfId: null,
    isUploading: false,
    setSelectedPdfId: (id) => set({ selectedPdfId: id }),
    setIsUploading: (loading) => set({ isUploading: loading }),
}));
