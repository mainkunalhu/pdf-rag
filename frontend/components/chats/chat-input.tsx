import { Field, FieldDescription, FieldGroup } from "@/components/ui/field";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupText,
    InputGroupTextarea,
} from "@/components/ui/input-group";
import { SendHorizontal } from "lucide-react";

export default function ChatInput() {
    return (
        <FieldGroup className="max-w-full">
            <Field>
                <InputGroup>
                    <InputGroupTextarea
                        id="block-end-textarea"
                        placeholder="Ask Assitant an question..."
                    />
                    <InputGroupAddon align="block-end">
                        <InputGroupText>0/280</InputGroupText>
                        <InputGroupButton
                            variant="default"
                            size="sm"
                            className="ml-auto"
                        >
                            <SendHorizontal />
                        </InputGroupButton>
                    </InputGroupAddon>
                </InputGroup>
                <FieldDescription>AI can make mistakes.</FieldDescription>
            </Field>
        </FieldGroup>
    );
}
