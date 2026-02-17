"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Mic, Square, Play, Pause, Send, RotateCcw } from "lucide-react";
import { Header } from "@/components/header/header";
import { Button } from "@/components/ui/button";

export const RegisterAudio = () => {
  const navigate = useRouter();
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (audioUrl) URL.revokeObjectURL(audioUrl);
    };
  }, [audioUrl]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      const chunks: BlobPart[] = [];

      mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/webm" });
        setAudioBlob(blob);
        setAudioUrl(URL.createObjectURL(blob));
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);

      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } catch (error) {
      console.error("Erro ao acessar microfone:", error);
      alert("Não foi possível acessar o microfone. Verifique as permissões.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  };

  const togglePlayback = () => {
    if (!audioRef.current || !audioUrl) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const resetRecording = () => {
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    setAudioBlob(null);
    setAudioUrl(null);
    setRecordingTime(0);
    setIsPlaying(false);
  };

  const handleSubmit = async () => {
    if (!audioBlob) return;
    
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    navigate.push("/confirmation");
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="main-container flex flex-col">
      <Header showBack step={{ current: 2, total: 2 }} />

      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-1 flex-col space-y-6"
      >
        <div className="text-center">
          <h1 className="mb-2 text-2xl font-bold text-foreground">
            Grave sua manifestação
          </h1>
          <p className="text-muted-foreground">
            Pressione o botão abaixo para iniciar a gravação
          </p>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center space-y-8">
          {/* Indicador de tempo */}
          <div
            className={`text-4xl font-mono font-bold ${
              isRecording ? "text-destructive" : "text-foreground"
            }`}
            aria-live="polite"
            aria-label={`Tempo de gravação: ${formatTime(recordingTime)}`}
          >
            {formatTime(recordingTime)}
          </div>

          {/* Botão de gravação */}
          {!audioUrl ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={isRecording ? stopRecording : startRecording}
              className={`flex h-32 w-32 items-center justify-center rounded-full transition-all duration-300 ${
                isRecording
                  ? "animate-pulse-record bg-destructive text-destructive-foreground shadow-lg"
                  : "bg-primary text-primary-foreground shadow-md hover:shadow-lg"
              }`}
              aria-label={isRecording ? "Parar gravação" : "Iniciar gravação"}
            >
              {isRecording ? (
                <Square className="h-12 w-12" />
              ) : (
                <Mic className="h-12 w-12" />
              )}
            </motion.button>
          ) : (
            <div className="flex flex-col items-center space-y-4">
              <audio
                ref={audioRef}
                src={audioUrl}
                onEnded={() => setIsPlaying(false)}
                className="hidden"
              />

              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={togglePlayback}
                  className="h-16 w-16 rounded-full"
                  aria-label={isPlaying ? "Pausar áudio" : "Reproduzir áudio"}
                >
                  {isPlaying ? (
                    <Pause className="h-8 w-8" />
                  ) : (
                    <Play className="h-8 w-8" />
                  )}
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={resetRecording}
                  className="h-12 w-12 rounded-full"
                  aria-label="Gravar novamente"
                >
                  <RotateCcw className="h-6 w-6" />
                </Button>
              </div>

              <p className="text-sm text-muted-foreground">
                Áudio gravado • {formatTime(recordingTime)}
              </p>
            </div>
          )}

          {isRecording && (
            <p className="text-sm text-muted-foreground" aria-live="polite">
              🎙️ Gravando... Fale sua manifestação
            </p>
          )}
        </div>

        <Button
          variant="action"
          size="touch-lg"
          onClick={handleSubmit}
          disabled={!audioBlob || isSubmitting}
          className="w-full"
        >
          {isSubmitting ? (
            <>
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
              Enviando...
            </>
          ) : (
            <>
              <Send className="h-5 w-5" />
              Enviar manifestação
            </>
          )}
        </Button>
      </motion.main>
    </div>
  );
};
