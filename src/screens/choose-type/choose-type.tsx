"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Type, Mic, Video, Image } from "lucide-react";
import { Header } from "@/components/header/header";
import { OptionCard } from "@/components/ui/option-card";

type ManifestationType = "register-text" | "register-audio" | "register-video" | "register-image";

const manifestationOptions: {
  type: ManifestationType;
  icon: typeof Type;
  title: string;
  description: string;
}[] = [
  {
    type: "register-text",
    icon: Type,
    title: "Texto",
    description: "Escreva sua manifestação digitando",
  },
  {
    type: "register-audio",
    icon: Mic,
    title: "Áudio",
    description: "Grave sua voz para enviar",
  },
  {
    type: "register-video",
    icon: Video,
    title: "Vídeo",
    description: "Grave um vídeo com sua câmera",
  },
  {
    type: "register-image",
    icon: Image,
    title: "Imagem",
    description: "Envie uma foto ou imagem",
  },
];

export const ChooseType = () => {
  const navigate = useRouter();
  const [selectedType, setSelectedType] = useState<ManifestationType | null>(null);

  const handleSelect = (type: ManifestationType) => {
    setSelectedType(type);
    setTimeout(() => {
      navigate.push(`/${type}`);
    }, 150);
  };

  return (
    <div className="main-container">
      <Header showBack step={{ current: 1, total: 2 }} />

      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="text-center">
          <h1 className="mb-2 text-2xl font-bold text-foreground md:text-3xl">
            Como você deseja se manifestar?
          </h1>
          <p className="text-muted-foreground">
            Escolha a forma que for mais fácil para você
          </p>
        </div>

        <div
          className="grid grid-cols-2 gap-4"
          role="group"
          aria-label="Opções de tipo de manifestação"
        >
          {manifestationOptions.map((option, index) => (
            <motion.div
              key={option.type}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <OptionCard
                icon={option.icon}
                title={option.title}
                description={option.description}
                onClick={() => handleSelect(option.type)}
                selected={selectedType === option.type}
              />
            </motion.div>
          ))}
        </div>

        <div className="rounded-xl bg-muted p-4 text-center">
          <p className="text-sm text-muted-foreground">
            💡 <strong>Dica:</strong> Você pode usar mais de um tipo combinando sua manifestação
          </p>
        </div>
      </motion.main>
    </div>
  );
};