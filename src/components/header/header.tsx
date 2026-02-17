"use client";

import { Megaphone, ArrowLeft, WifiOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { Button } from "../ui";

interface HeaderProps {
  showBack?: boolean;
  step?: { current: number; total: number };
}

export const Header = ({ showBack = false, step }: HeaderProps) => {
  const navigate = useRouter();
  const params = useParams();
  const isHome = params?.["*"] === "";

  return (
    <header className="mb-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        {showBack && !isHome && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate.back()}
            aria-label="Voltar para a tela anterior"
            className="mr-1"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
        )}
        <Link
          href="/"
          className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg"
          aria-label="Ir para a página inicial do VozAtiva DF"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Megaphone className="h-5 w-5" />
          </div>
          <span className="text-lg font-bold text-foreground">VozAtiva DF</span>
        </Link>
      </div>

      {step && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground" aria-live="polite">
          <span>
            Passo {step.current} de {step.total}
          </span>
        </div>
      )}
    </header>
  );
};

export const OfflineBanner = () => {
  return (
    <div
      role="alert"
      className="mb-4 flex items-center gap-3 rounded-lg bg-warning/10 p-4 text-warning-foreground"
    >
      <WifiOff className="h-5 w-5 shrink-0" />
      <p className="text-sm font-medium">
        Você está sem conexão. Sua manifestação será enviada quando a internet voltar.
      </p>
    </div>
  );
};
