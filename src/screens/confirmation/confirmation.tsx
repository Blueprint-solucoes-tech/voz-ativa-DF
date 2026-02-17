"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/header/header";
import Link from "next/link";

export const Confirmation = () => {
  return (
    <div className="main-container flex flex-col">
      <Header showBack />

      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-1 flex-col items-center justify-center text-center"
      >
        <div className="mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-success/10"
          >
            <CheckCircle2 className="h-14 w-14 text-success" />
          </motion.div>

          <h1 className="mb-4 text-2xl font-bold text-foreground md:text-3xl">
            Sua manifestação foi enviada com sucesso!
          </h1>

          <p className="text-lg text-muted-foreground">
            Obrigado por participar. Sua voz é importante para melhorar os serviços do Distrito Federal.
          </p>
        </div>

        <div className="mb-8 w-full max-w-md rounded-xl bg-muted p-6">
          <h2 className="mb-3 text-lg font-semibold text-foreground">
            Próximos passos:
          </h2>
          <ul className="space-y-3 text-left text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                1
              </span>
              <span>Sua manifestação será analisada pela equipe responsável</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                2
              </span>
              <span>Você poderá acompanhar o andamento pelo número de protocolo</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                3
              </span>
              <span>Caso necessário, entraremos em contato para mais informações</span>
            </li>
          </ul>
        </div>

        <Button
          variant="action"
          size="touch-lg"
          asChild
          className="w-full max-w-sm"
        >
          <Link href="/">
            Voltar para o início
          </Link>
        </Button>
      </motion.main>

      <footer className="mt-8 text-center text-sm text-muted-foreground">
        <p>VozAtiva DF - Ouvidoria do Distrito Federal</p>
      </footer>
    </div>
  );
};