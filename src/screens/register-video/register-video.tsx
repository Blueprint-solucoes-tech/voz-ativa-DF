"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Video, Square, Send, RotateCcw, VideoOff } from "lucide-react";
import { Header } from "@/components/header/header";
import { Button } from "@/components/ui/button";

export const RegisterVideo = () => {
  const navigate = useRouter();
  const [isRecording, setIsRecording] = useState(false);
  const [videoBlob, setVideoBlob] = useState<Blob | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playbackRef = useRef<HTMLVideoElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const videoUrlRef = useRef<string | null>(null);

  const requestCameraStream = () =>
    navigator.mediaDevices.getUserMedia({
      video: { facingMode: "user" },
      audio: true,
    });

  const initCamera = async () => {
    try {
      const mediaStream = await requestCameraStream();
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
      streamRef.current = mediaStream;
      setStream(mediaStream);
      setHasPermission(true);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error("Erro ao acessar câmera:", error);
      setHasPermission(false);
    }
  };

  const startRecording = () => {
    if (!stream) return;

    const mediaRecorder = new MediaRecorder(stream);
    const chunks: BlobPart[] = [];

    mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks, { type: "video/webm" });
      setVideoBlob(blob);
      const objectUrl = URL.createObjectURL(blob);
      videoUrlRef.current = objectUrl;
      setVideoUrl(objectUrl);
    };

    mediaRecorderRef.current = mediaRecorder;
    mediaRecorder.start();
    setIsRecording(true);
    setRecordingTime(0);

    timerRef.current = setInterval(() => {
      setRecordingTime((prev) => prev + 1);
    }, 1000);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  };

  const resetRecording = () => {
    if (videoUrlRef.current) URL.revokeObjectURL(videoUrlRef.current);
    videoUrlRef.current = null;
    setVideoBlob(null);
    setVideoUrl(null);
    setRecordingTime(0);
    initCamera();
  };

  const handleSubmit = async () => {
    if (!videoBlob) return;
    
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    navigate.push("/confirmation");
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    let isCancelled = false;

    const initializeCamera = async () => {
      try {
        const mediaStream = await requestCameraStream();

        if (isCancelled) {
          mediaStream.getTracks().forEach((track) => track.stop());
          return;
        }

        if (streamRef.current) {
          streamRef.current.getTracks().forEach((track) => track.stop());
        }
        streamRef.current = mediaStream;
        setStream(mediaStream);
        setHasPermission(true);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (error) {
        if (!isCancelled) {
          console.error("Erro ao acessar câmera:", error);
          setHasPermission(false);
        }
      }
    };

    void initializeCamera();

    return () => {
      isCancelled = true;
      if (timerRef.current) clearInterval(timerRef.current);
      if (videoUrlRef.current) URL.revokeObjectURL(videoUrlRef.current);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
    };
  }, []);

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
            Grave um vídeo
          </h1>
          <p className="text-muted-foreground">
            Use sua câmera para registrar sua manifestação
          </p>
        </div>

        {/* Preview da câmera ou vídeo gravado */}
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-muted">
          {hasPermission === false ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 p-6 text-center">
              <VideoOff className="h-16 w-16 text-muted-foreground" />
              <div>
                <p className="font-semibold text-foreground">
                  Câmera não disponível
                </p>
                <p className="text-sm text-muted-foreground">
                  Verifique se o acesso à câmera está permitido
                </p>
              </div>
              <Button variant="outline" onClick={initCamera}>
                Tentar novamente
              </Button>
            </div>
          ) : videoUrl ? (
            <video
              ref={playbackRef}
              src={videoUrl}
              controls
              className="h-full w-full object-cover"
              aria-label="Vídeo gravado"
            />
          ) : (
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              className="h-full w-full object-cover"
              aria-label="Preview da câmera"
            />
          )}

          {isRecording && (
            <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-destructive px-3 py-1 text-sm font-medium text-destructive-foreground">
              <span className="h-2 w-2 animate-pulse rounded-full bg-current" />
              REC • {formatTime(recordingTime)}
            </div>
          )}
        </div>
        <div className="flex items-center justify-center gap-4">
          {!videoUrl ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={isRecording ? stopRecording : startRecording}
              disabled={!hasPermission}
              className={`flex h-20 w-20 items-center justify-center rounded-full transition-all duration-300 ${
                isRecording
                  ? "bg-destructive text-destructive-foreground"
                  : "bg-primary text-primary-foreground"
              } disabled:opacity-50`}
              aria-label={isRecording ? "Parar gravação" : "Iniciar gravação"}
            >
              {isRecording ? (
                <Square className="h-8 w-8" />
              ) : (
                <Video className="h-8 w-8" />
              )}
            </motion.button>
          ) : (
            <Button
              variant="outline"
              size="lg"
              onClick={resetRecording}
              className="gap-2"
            >
              <RotateCcw className="h-5 w-5" />
              Gravar novamente
            </Button>
          )}
        </div>

        <Button
          variant="action"
          size="touch-lg"
          onClick={handleSubmit}
          disabled={!videoBlob || isSubmitting}
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