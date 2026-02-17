# Tech Spec — <Nome do Projeto>

## 1. Visão geral
Resumo técnico do sistema.
O que estamos construindo do ponto de vista de engenharia.

## 2. Arquitetura
Visão macro do sistema.

Ex:
- Frontend
- Backend
- Infra
- Integrações externas

(opcional: diagrama simples)

## 3. Stack tecnológica
Tecnologias escolhidas e por quê.

Ex:
- Frontend: Next.js (App Router)
- Backend: Supabase
- Estilo: Tailwind
- Testes: Vitest

## 4. Fluxos principais
Descreva os fluxos críticos.

Ex:
1. Usuário acessa página
2. Dados são buscados
3. Resultado é exibido

## 5. Modelagem de dados
Entidades principais e relações.

Ex:
- Restaurant
- Category
- AccessibilityFeature

## 6. Contratos / APIs
Interfaces importantes.

Ex:
- GET /restaurants
- POST /auth/login

## 7. Decisões técnicas (ADRs simplificados)
Liste decisões importantes + trade-offs.

Ex:
### Decisão: usar Supabase
- 👍 Prós: rapidez, auth pronta
- 👎 Contras: lock-in

## 8. Riscos e limitações
O que pode dar errado?

Ex:
- Escalabilidade
- Dependência externa

## 9. Não objetivos técnicos
O que conscientemente NÃO será feito agora.

Ex:
- Microserviços
- Cache avançado

## 10. Plano de evolução
Como isso pode crescer no futuro?

Ex:
- Separar backend
- Introduzir cache
