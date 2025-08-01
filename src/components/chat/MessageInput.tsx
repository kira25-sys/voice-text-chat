import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
}

export const MessageInput = ({
  onSendMessage,
  disabled = false,
  placeholder = "Escribe tu mensaje...",
  className,
}: MessageInputProps) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "flex items-center gap-2 p-4 bg-gradient-subtle border-t border-border",
        className
      )}
    >
      <Input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className="flex-1 bg-background/80 backdrop-blur-sm border-border/50 rounded-full px-4 py-3 focus:bg-background focus:border-primary/50 transition-all duration-300"
      />
      <Button
        type="submit"
        disabled={disabled || !message.trim()}
        size="icon"
        className="rounded-full w-12 h-12 bg-primary hover:bg-primary/90 shadow-warm transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:scale-100"
      >
        <Send className="h-5 w-5" />
      </Button>
    </form>
  );
};