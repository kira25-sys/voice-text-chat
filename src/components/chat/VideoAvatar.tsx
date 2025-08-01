import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Bot, Heart, Smile, Brain } from "lucide-react";

interface VideoAvatarProps {
  emotion?: "happy" | "thinking" | "neutral" | "excited";
  isAnimating?: boolean;
  className?: string;
}

export const VideoAvatar = ({
  emotion = "neutral",
  isAnimating = false,
  className,
}: VideoAvatarProps) => {
  const [currentEmotion, setCurrentEmotion] = useState(emotion);

  useEffect(() => {
    setCurrentEmotion(emotion);
  }, [emotion]);

  const getEmotionIcon = () => {
    switch (currentEmotion) {
      case "happy":
        return <Smile className="h-8 w-8" />;
      case "thinking":
        return <Brain className="h-8 w-8" />;
      case "excited":
        return <Heart className="h-8 w-8" />;
      default:
        return <Bot className="h-8 w-8" />;
    }
  };

  const getEmotionColors = () => {
    switch (currentEmotion) {
      case "happy":
        return "from-yellow-400 to-orange-500";
      case "thinking":
        return "from-blue-400 to-purple-500";
      case "excited":
        return "from-pink-400 to-red-500";
      default:
        return "from-purple-400 to-blue-500";
    }
  };

  return (
    <div
      className={cn(
        "fixed top-6 right-6 z-50 w-16 h-16 rounded-full bg-gradient-to-br shadow-float transition-all duration-500",
        getEmotionColors(),
        isAnimating && "animate-pulse-glow",
        className
      )}
    >
      <div className="w-full h-full rounded-full bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-sm flex items-center justify-center text-white">
        <div
          className={cn(
            "transition-transform duration-300",
            isAnimating && "animate-bounce-in"
          )}
        >
          {getEmotionIcon()}
        </div>
      </div>
      
      {/* Breathing effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 to-transparent animate-pulse" />
      
      {/* Floating particles */}
      {isAnimating && (
        <>
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-white/60 rounded-full animate-ping" />
          <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-white/40 rounded-full animate-ping delay-200" />
          <div className="absolute top-1/2 -left-2 w-1 h-1 bg-white/50 rounded-full animate-ping delay-500" />
        </>
      )}
    </div>
  );
};