import { SetStateAction, useState } from "react";
import { PromptForm } from "./prompt-form";

export default function ChatPanel() {
  const [loading, setIsLoading] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  return (
    <div className="fixed inset-x-0 bottom-0 bg-gradient-to-b from-muted/10 from-10% to-muted/30 to-50%">
      <div className="mx-auto sm:max-w-2xl sm:px-4 px-4">
        <PromptForm
          input={input}
          onSubmit={async (value: string) => {
            console.log("value::", value);
          }}
          isLoading={loading}
          setInput={setInput} />
      </div>
    </div>
  )
}