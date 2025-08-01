import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
}

interface MessageListProps {
  messages: Message[];
  className?: string;
}

export const MessageList = ({ messages, className }: MessageListProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className={cn("flex-1 overflow-y-auto p-4 space-y-4", className)}>
      {messages.map((message, index) => (
        <div
          key={message.id}
          className={cn(
            "flex w-full animate-fade-in-up",
            message.sender === "user" ? "justify-end" : "justify-start"
          )}
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div
            className={cn(
              "max-w-[80%] rounded-3xl px-4 py-3 shadow-warm transition-all duration-300 hover:scale-[1.02]",
              message.sender === "user"
                ? "bg-user-bubble text-primary-foreground"
                : "bg-ai-bubble text-foreground"
            )}
          >
            <p className="text-sm leading-relaxed">{message.content}</p>
            <span className="text-xs opacity-70 mt-1 block">
              {message.timestamp.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};