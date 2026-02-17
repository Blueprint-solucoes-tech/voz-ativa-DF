'use client';

import { motion } from "framer-motion";
import Link from "next/link";
import { Megaphone, ArrowRight, Accessibility, Shield, Users } from "lucide-react";
import { Button } from "@/components/";

export const Home = () => {
  return (
    <div className="main-container flex flex-col">
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="py-4 text-center"
      >
        <div className="mb-2 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg">
          <Megaphone className="h-8 w-8" />
        </div>
        <h1 className="text-3xl font-bold text-foreground md:text-4xl">VozAtiva DF</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Sua voz fortalece a participação cidadã
        </p>
      </motion.header>

      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-1 flex-col justify-center space-y-8 py-8"
      >
        <section className="rounded-2xl bg-card p-6 shadow-sm">
          <h2 className="mb-3 text-xl font-semibold text-foreground">O que é a ouvidoria?</h2>
          <p className="text-muted-foreground leading-relaxed">
            A ouvidoria é um canal de comunicação entre você e o Governo do Distrito Federal. Aqui
            você pode registrar <strong>sugestões</strong>, <strong>reclamações</strong>,{" "}
            <strong>elogios</strong>, <strong>denúncias</strong> ou{" "}
            <strong>pedidos de informação</strong> sobre os serviços públicos.
          </p>
        </section>

        <Button variant="action" size="touch-lg" asChild className="w-full gap-3 text-xl">
          <Link href="/choose-type">
            <Megaphone className="h-6 w-6" />
            Registrar manifestação
            <ArrowRight className="h-5 w-5" />
          </Link>
        </Button>

        <section className="grid grid-cols-3 gap-3">
          <div className="flex flex-col items-center gap-2 rounded-xl bg-muted p-4 text-center">
            <Accessibility className="h-6 w-6 text-primary" />
            <span className="text-xs font-medium text-muted-foreground">Acessível</span>
          </div>
          <div className="flex flex-col items-center gap-2 rounded-xl bg-muted p-4 text-center">
            <Shield className="h-6 w-6 text-secondary" />
            <span className="text-xs font-medium text-muted-foreground">Seguro</span>
          </div>
          <div className="flex flex-col items-center gap-2 rounded-xl bg-muted p-4 text-center">
            <Users className="h-6 w-6 text-accent" />
            <span className="text-xs font-medium text-muted-foreground">Para todos</span>
          </div>
        </section>
      </motion.main>

      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="py-6 text-center"
      >
        <div className="space-y-3">
          <Button variant="link" asChild className="text-sm text-muted-foreground">
            <a href="#acessibilidade">
              <Accessibility className="mr-1 h-4 w-4" />
              Informações de acessibilidade
            </a>
          </Button>
          <p className="text-xs text-muted-foreground">
            Governo do Distrito Federal • Ouvidoria-Geral
          </p>
        </div>
      </motion.footer>
    </div>
  );
};
