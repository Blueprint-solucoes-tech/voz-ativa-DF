"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Send } from "lucide-react";
import { Header } from "@/components/header/header";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const MAX_CHARS = 2000;

export const RegisterText = () => {
  const navigate = useRouter();
  const [texto, setTexto] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!texto.trim()) return;
    
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    navigate.push("/confirmation");
  };

  const charCount = texto.length;
  const isNearLimit = charCount > MAX_CHARS * 0.9;
  const isOverLimit = charCount > MAX_CHARS;

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
            Escreva sua manifestação
          </h1>
          <p className="text-muted-foreground">
            Descreva com detalhes o que você deseja registrar
          </p>
        </div>

        <div className="flex-1 space-y-3">
          <label htmlFor="manifestacao-texto" className="sr-only">
            Texto da manifestação
          </label>
          <Textarea
            id="manifestacao-texto"
            placeholder="Exemplo: Gostaria de sugerir a instalação de uma lixeira na praça do meu bairro, pois não há nenhuma por perto e o lixo acaba ficando espalhado..."
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            className="min-h-[250px] resize-none text-base leading-relaxed"
            aria-describedby="char-counter"
            maxLength={MAX_CHARS + 100}
          />
          <div
            id="char-counter"
            className={`text-right text-sm ${
              isOverLimit
                ? "text-destructive font-medium"
                : isNearLimit
                ? "text-warning font-medium"
                : "text-muted-foreground"
            }`}
            aria-live="polite"
          >
            {charCount}/{MAX_CHARS} caracteres
          </div>
        </div>

        <div className="space-y-4">
          <Button
            variant="action"
            size="touch-lg"
            onClick={handleSubmit}
            disabled={!texto.trim() || isOverLimit || isSubmitting}
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

          {isOverLimit && (
            <p className="text-center text-sm text-destructive" role="alert">
              Você ultrapassou o limite de caracteres. Por favor, reduza o texto.
            </p>
          )}
        </div>
      </motion.main>
    </div>
  );
};