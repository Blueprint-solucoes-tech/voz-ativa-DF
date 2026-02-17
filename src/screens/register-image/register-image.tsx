"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Camera, Upload, Send, X } from "lucide-react";
import { Header } from "@/components/header/header";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export const RegisterImage = () => {
  const navigate = useRouter();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [descricao, setDescricao] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleCameraCapture = () => {
    if (fileInputRef.current) {
      fileInputRef.current.setAttribute("capture", "environment");
      fileInputRef.current.click();
    }
  };

  const handleGallerySelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.removeAttribute("capture");
      fileInputRef.current.click();
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async () => {
    if (!imageFile) return;
    
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    navigate.push("/confirmation");
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
            Envie uma imagem
          </h1>
          <p className="text-muted-foreground">
            Tire uma foto ou escolha uma imagem da galeria
          </p>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          aria-label="Selecionar imagem"
        />

        {/* Preview da imagem ou botões de seleção */}
        {imagePreview ? (
          <div className="relative">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-muted">
              <Image
                src={imagePreview}
                alt="Imagem selecionada"
                fill
                unoptimized
                sizes="100vw"
                className="object-contain"
              />
            </div>
            <Button
              variant="destructive"
              size="icon"
              onClick={removeImage}
              className="absolute right-3 top-3 rounded-full"
              aria-label="Remover imagem"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCameraCapture}
              className="flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-border bg-card p-8 text-center transition-colors hover:border-primary/50 hover:bg-muted"
              aria-label="Tirar foto com a câmera"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Camera className="h-7 w-7" />
              </div>
              <span className="font-medium text-foreground">Tirar foto</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleGallerySelect}
              className="flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-border bg-card p-8 text-center transition-colors hover:border-primary/50 hover:bg-muted"
              aria-label="Selecionar imagem da galeria"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-secondary/20 text-secondary">
                <Upload className="h-7 w-7" />
              </div>
              <span className="font-medium text-foreground">Da galeria</span>
            </motion.button>
          </div>
        )}

        {/* Campo opcional de descrição */}
        <div className="space-y-2">
          <label
            htmlFor="descricao-imagem"
            className="text-sm font-medium text-foreground"
          >
            Descrição (opcional)
          </label>
          <Textarea
            id="descricao-imagem"
            placeholder="Descreva o que a imagem representa..."
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className="min-h-[100px] resize-none"
          />
        </div>

        <Button
          variant="action"
          size="touch-lg"
          onClick={handleSubmit}
          disabled={!imageFile || isSubmitting}
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