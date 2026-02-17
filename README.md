# Voz Ativa DF

O **Voz Ativa DF** e uma aplicacao web progressiva (PWA) desenvolvida para ampliar a participacao cidada por meio da Ouvidoria do Distrito Federal.

A solucao permite que cidadaos registrem manifestacoes em multiplos formatos de midia:

- Texto
- Audio
- Video
- Imagem

O projeto foi concebido com foco em **acessibilidade digital**, **usabilidade** e **inclusao**, para atender diferentes perfis de usuarios, incluindo pessoas com deficiencia e usuarios com baixa familiaridade tecnologica.

## Objetivo

Fortalecer o controle social e a transparencia publica por meio de uma interface simples, mobile-first e acessivel, permitindo que qualquer cidadao possa exercer seu direito de manifestacao de forma clara e democratica.

## Proposta de Valor

O Voz Ativa DF aproxima governo e sociedade por meio da tecnologia, promovendo inclusao digital, participacao cidada e inovacao no controle social.

## Tecnologias

### Base atual (implementada)

- Next.js (App Router)
- TypeScript
- React
- Tailwind CSS
- Vitest + Testing Library (testes unitarios)

### Direcao arquitetural (em evolucao)

- PWA (Service Workers e instalacao como app)
- Web APIs para captura de midia (audio/video/imagem)
- Boas praticas de acessibilidade (WCAG)
- Padrao **MVVM** para organizacao de telas e regras de negocio
- Evolucao para uma base alinhada a principios da **T3 Stack**
- Testes end-to-end (C2) com **Playwright**

> Observacao: nem todos os itens acima estao 100% implementados no momento. Este README registra a visao e o direcionamento tecnico do projeto.

## Diferenciais de UX e Acessibilidade

- Navegacao acessivel por teclado
- Compatibilidade com leitores de tela
- Alto contraste e tipografia legivel
- Interface mobile-first
- Instalacao como aplicativo (PWA)
- Experiencia simplificada e orientada ao cidadao

## Como rodar o projeto

### Requisitos

- Node.js 20+
- npm (ou gerenciador compativel)

### Desenvolvimento

```bash
npm install
npm run dev
```

A aplicacao ficara disponivel em `http://localhost:3000`.

### Scripts uteis

```bash
npm run lint
npm run lint:fix
npm run test
npm run test:ui
npm run build
npm run start
```

## Status do projeto

Projeto em desenvolvimento ativo. A estrutura atual ja contempla fluxos principais de manifestacao e esta sendo evoluida para maior robustez arquitetural (MVVM/T3) e ampliacao da cobertura de testes (unitarios + Playwright).
