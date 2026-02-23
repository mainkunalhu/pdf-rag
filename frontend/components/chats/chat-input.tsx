"use client";

import { Field, FieldGroup } from "@/components/ui/field";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupText,
    InputGroupTextarea,
} from "@/components/ui/input-group";
import { useChatStore } from "@/store/use-chat-store";
import { usePdfStore } from "@/store/use-pdf-store";
import { SendHorizontal } from "lucide-react";
import { useState } from "react";

export default function ChatInput() {
    const { selectedPdfId } = usePdfStore();
    const { sendMessage, isLoading } = useChatStore();
    const [input, setInput] = useState("");

    const handleSend = async () => {
        if (!input.trim() || !selectedPdfId || isLoading) return;

        const currentPrompt = input;
        setInput("");
        await sendMessage(selectedPdfId, currentPrompt);
    };

    return (
        <FieldGroup className="max-w-full">
            <Field>
                <InputGroup>
                    <InputGroupTextarea
                        disabled={!selectedPdfId || isLoading}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                handleSend();
                            }
                        }}
                        placeholder={
                            selectedPdfId
                                ? "Ask Assistant a question..."
                                : "Please Select Any Docs to start Conversation"
                        }
                    />
                    <InputGroupAddon align="block-end">
                        <InputGroupText>{`${input.length}/280`}</InputGroupText>
                        <InputGroupButton
                            onClick={handleSend}
                            disabled={isLoading || !input.trim()}
                            size="sm"
                            className="ml-auto"
                        >
                            <SendHorizontal />
                        </InputGroupButton>
                    </InputGroupAddon>
                </InputGroup>
            </Field>
        </FieldGroup>
    );
}
