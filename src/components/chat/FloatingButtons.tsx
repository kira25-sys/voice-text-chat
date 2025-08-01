import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Keyboard, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface FloatingButtonsProps {
  onModeChange: (mode: "text" | "voice") => void;
  currentMode: "text" | "voice";
  isRecording?: boolean;
  onToggleRecording?: () => void;
  className?: string;
}

export const FloatingButtons = ({
  onModeChange,
  currentMode,
  isRecording = false,
  onToggleRecording,
  className,
}: FloatingButtonsProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={cn(
        "fixed bottom-6 left-1/2 transform -translate-x-1/2 flex gap-4 z-40",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Botón de micrófono */}
      <Button
        onClick={() => {
          if (currentMode === "voice") {
            onToggleRecording?.();
          } else {
            onModeChange("voice");
          }
        }}
        size="icon"
        className={cn(
          "w-14 h-14 rounded-full transition-all duration-300 shadow-float",
          currentMode === "voice"
            ? isRecording
              ? "bg-red-500 hover:bg-red-600 animate-pulse-glow"
              : "bg-mic-button hover:bg-mic-button/90"
            : "bg-mic-button/70 hover:bg-mic-button",
          isHovered && "scale-110"
        )}
      >
        {currentMode === "voice" && isRecording ? (
          <MicOff className="h-6 w-6 text-white" />
        ) : (
          <Mic className="h-6 w-6 text-white" />
        )}
      </Button>

      {/* Botón de teclado */}
      <Button
        onClick={() => onModeChange("text")}
        size="icon"
        className={cn(
          "w-14 h-14 rounded-full transition-all duration-300 shadow-float",
          currentMode === "text"
            ? "bg-keyboard-button hover:bg-keyboard-button/90"
            : "bg-keyboard-button/70 hover:bg-keyboard-button",
          isHovered && "scale-110"
        )}
      >
        {currentMode === "text" ? (
          <MessageCircle className="h-6 w-6 text-white" />
        ) : (
          <Keyboard className="h-6 w-6 text-white" />
        )}
      </Button>

      {/* Indicador de modo activo */}
      {currentMode === "voice" && (
        <div className="absolute -top-12 left-0">
          <div className="bg-black/80 text-white text-xs px-2 py-1 rounded-lg whitespace-nowrap animate-fade-in-up">
            {isRecording ? "Grabando..." : "Modo voz"}
          </div>
        </div>
      )}
      
      {currentMode === "text" && (
        <div className="absolute -top-12 right-0">
          <div className="bg-black/80 text-white text-xs px-2 py-1 rounded-lg whitespace-nowrap animate-fade-in-up">
            Modo texto
          </div>
        </div>
      )}
    </div>
  );
};