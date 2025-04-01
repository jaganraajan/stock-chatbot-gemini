"use client";

import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { ArrowUpIcon } from "./icons";
// import { Attachment, Message } from "ai";
// import { useChat } from "ai/react";
// import { useState } from "react";

// import { Message as PreviewMessage } from "@/components/custom/message";
// import { useScrollToBottom } from "@/components/custom/use-scroll-to-bottom";

// import { MultimodalInput } from "./multimodal-input";
import { Overview } from "./overview";

export function Chat({
  id,
  initialMessages,
}: {
  id: string;
  initialMessages: string[];
}) {
//   const { messages, handleSubmit, input, setInput, append, isLoading, stop } =
//     useChat({
//       id,
//       body: { id },
//       initialMessages,
//       maxSteps: 10,
//       onFinish: () => {
//         window.history.replaceState({}, "", `/chat/${id}`);
//       },
//     });

console.log(id, initialMessages);

//   const [messagesContainerRef, messagesEndRef] =
//     useScrollToBottom<HTMLDivElement>();

//   const [attachments, setAttachments] = useState<Array<Attachment>>([]);

  return (
    <div className="flex flex-row justify-center pb-4 md:pb-8 h-dvh bg-background">
      <div className="flex flex-col justify-between items-center gap-4">
        <div
        //   ref={messagesContainerRef}
          className="flex flex-col gap-4 h-full w-dvw items-center overflow-y-scroll"
        >
          {/* {messages.length === 0 && <Overview />} */}
          <Overview />

          {/* {messages.map((message) => (
            <PreviewMessage
              key={message.id}
              chatId={id}
              role={message.role}
              content={message.content}
              attachments={message.experimental_attachments}
              toolInvocations={message.toolInvocations}
            />
          ))} */}

          <div
            // ref={messagesEndRef}
            className="shrink-0 min-w-[24px] min-h-[24px]"
          />
        </div>

        <form className="flex flex-row gap-2 relative items-end w-full md:max-w-[500px] max-w-[calc(100dvw-32px) px-4 md:px-0">
          {/* <MultimodalInput
            input={input}
            setInput={setInput}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
            stop={stop}
            attachments={attachments}
            setAttachments={setAttachments}
            messages={messages}
            append={append}
          /> */}
          <div className="relative w-full flex flex-col gap-4">
          <Textarea
            // ref={textareaRef}
            placeholder="Send a message..."
            value={'test input'}
            onChange={() => console.log("change")}
            className="min-h-[24px] overflow-hidden resize-none rounded-lg text-base bg-muted border-none"
            rows={3}
            onKeyDown={(event: any) => {
            if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();

                console.log(event);
            }
            }}
            />
            <Button
                className="rounded-full p-1.5 h-fit absolute bottom-2 right-2 m-0.5 text-white"
                onClick={(event: any) => {
                    event.preventDefault();
                    console.log(event);
                }}
                // disabled={input.length === 0 || uploadQueue.length > 0}
                >
                <ArrowUpIcon size={14} />
            </Button>    
          </div>
        </form>
      </div>
    </div>
  );
}
