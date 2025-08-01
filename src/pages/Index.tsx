import { useState, useEffect } from "react";
import { MessageList } from "@/components/chat/MessageList";
import { MessageInput } from "@/components/chat/MessageInput";
import { VideoAvatar } from "@/components/chat/VideoAvatar";
import { FloatingButtons } from "@/components/chat/FloatingButtons";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
}

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "¡Hola! Soy tu asistente de IA. ¿En qué puedo ayudarte hoy?",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [inputMode, setInputMode] = useState<"text" | "voice">("text");
  const [isRecording, setIsRecording] = useState(false);
  const [aiEmotion, setAiEmotion] = useState<"happy" | "thinking" | "neutral" | "excited">("happy");
  const [isAiAnimating, setIsAiAnimating] = useState(false);
  const { toast } = useToast();

  const handleSendMessage = (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setAiEmotion("thinking");
    setIsAiAnimating(true);

    // Simular respuesta de IA
    setTimeout(() => {
      const aiResponses = [
        "¡Interesante! Cuéntame más sobre eso.",
        "Entiendo tu punto de vista. ¿Hay algo específico en lo que pueda ayudarte?",
        "Esa es una excelente pregunta. Déjame pensarlo...",
        "Me alegra que me compartas eso. ¿Qué más te gustaría explorar?",
        "¡Qué fascinante! Tu perspectiva es muy valiosa.",
      ];

      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: randomResponse,
        sender: "ai",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
      setAiEmotion("happy");
      setIsAiAnimating(false);
    }, 1500);
  };

  const handleModeChange = (mode: "text" | "voice") => {
    setInputMode(mode);
    if (mode === "voice") {
      toast({
        title: "Modo de voz activado",
        description: "Toca el botón del micrófono para comenzar a grabar",
      });
    } else {
      toast({
        title: "Modo de texto activado",
        description: "Puedes escribir tu mensaje en el campo de texto",
      });
    }
  };

  const handleToggleRecording = () => {
    setIsRecording(!isRecording);
    
    if (!isRecording) {
      // Simular grabación
      toast({
        title: "Grabando...",
        description: "Habla ahora, toca nuevamente para detener",
      });
      
      // Simular fin de grabación automático después de 5 segundos
      setTimeout(() => {
        setIsRecording(false);
        handleSendMessage("Mensaje de voz simulado: Hola, este es un mensaje enviado por voz");
        toast({
          title: "Grabación completada",
          description: "Tu mensaje de voz ha sido enviado",
        });
      }, 3000);
    } else {
      toast({
        title: "Grabación detenida",
        description: "Procesando tu mensaje de voz...",
      });
    }
  };

  useEffect(() => {
    // Animar el avatar al cargar
    setTimeout(() => {
      setIsAiAnimating(true);
      setTimeout(() => setIsAiAnimating(false), 1000);
    }, 500);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-bg relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-warm rounded-full opacity-10 blur-3xl" />
        <div className="absolute bottom-32 right-16 w-40 h-40 bg-gradient-warm rounded-full opacity-10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-warm rounded-full opacity-5 blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 text-center py-8 px-4">
        <div className="animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-warm bg-clip-text text-transparent mb-3">
            Rockie
          </h1>
          <p className="text-lg text-muted-foreground max-w-md mx-auto leading-relaxed">
            Conversa conmigo usando texto o voz. ¡Estoy aquí para escucharte!
          </p>
        </div>
      </header>

      {/* Chat Container */}
      <div className="relative z-10 max-w-4xl mx-auto h-[calc(100vh-12rem)] flex flex-col">
        <div className="flex-1 bg-chat-bg/50 backdrop-blur-sm rounded-t-3xl shadow-warm border border-border/30 flex flex-col overflow-hidden">
          <MessageList 
            messages={messages} 
            className="bg-gradient-subtle/30"
          />
          
          {inputMode === "text" && (
            <MessageInput 
              onSendMessage={handleSendMessage}
              disabled={isAiAnimating}
              placeholder="Escribe tu mensaje aquí..."
            />
          )}
        </div>
      </div>

      {/* Video Avatar */}
      <VideoAvatar 
        emotion={aiEmotion}
        isAnimating={isAiAnimating}
      />

      {/* Floating Buttons */}
      <FloatingButtons
        currentMode={inputMode}
        onModeChange={handleModeChange}
        isRecording={isRecording}
        onToggleRecording={handleToggleRecording}
      />

      {/* Voice Recording Overlay */}
      {inputMode === "voice" && isRecording && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 flex items-center justify-center">
          <div className="bg-card rounded-3xl p-8 shadow-float text-center animate-bounce-in">
            <div className="w-20 h-20 bg-gradient-warm rounded-full mx-auto mb-4 flex items-center justify-center animate-pulse-glow">
              <div className="w-12 h-12 bg-white/20 rounded-full"></div>
            </div>
            <h3 className="text-xl font-semibold mb-2">Escuchando...</h3>
            <p className="text-muted-foreground">Habla ahora o toca el micrófono para detener</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;