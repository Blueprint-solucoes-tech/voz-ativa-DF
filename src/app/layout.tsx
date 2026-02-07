import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "../styles/globals.css";
import "../styles/general.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "VozAtiva DF",
    template: "%s | VozAtiva DF",
  },
  description:
    "VozAtiva DF é uma aplicação web progressiva (PWA) acessível que permite ao cidadão registrar manifestações na Ouvidoria do Distrito Federal por texto, áudio, vídeo ou imagem, fortalecendo a participação cidadã e o controle social.",
  applicationName: "VozAtiva DF",
  authors: [{ name: "VozAtiva DF" }],
  generator: "Next.js",
  keywords: [
    "ouvidoria",
    "participação cidadã",
    "controle social",
    "governo digital",
    "acessibilidade",
    "PWA",
    "Distrito Federal",
    "transparência pública",
  ],
  referrer: "origin-when-cross-origin",
  creator: "VozAtiva DF",
  publisher: "VozAtiva DF",
  metadataBase: new URL("https://vozativa-df.vercel.app"),
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://vozativa-df.vercel.app",
    title: "VozAtiva DF",
    description:
      "Uma PWA acessível para registro de manifestações na Ouvidoria do Distrito Federal por texto, áudio, vídeo ou imagem.",
    siteName: "VozAtiva DF",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={`${roboto.variable} antialiased`}>{children}</body>
    </html>
  );
}
