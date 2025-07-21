# Replit.md

## Overview

This is a modern, responsive mental health and addiction treatment landing page for Estância Morro Grande, built with React, TypeScript, and Express.js. The application is designed to capture leads for people seeking mental health treatment and addiction recovery services. It features a professional design with emotional appeal using a natural green color palette, showcasing treatment options, facility structure, testimonials, and a comprehensive lead capture form with insurance/health plan options.

## User Preferences

- Preferred communication style: Simple, everyday language (Portuguese)
- Clinic name: Estância Morro Grande 
- Brand colors: Natural green palette (#4F7942 primary theme)
- Location: Estrada Nakayama 150, Rodovia Bunjiro Nakao km 67,5
- Email: contato@estanciamorrogrande.com.br
- **UI Preferences**: Minimal hero section, no automatic carousels, centralized CTA button
- Hero section: No carousel, centralized "Fale com Especialista" button at bottom center aligned with WhatsApp button
- **Asset Management**: All uploaded images must be saved in the project and included in GitHub repository
- **Logo**: Use official Estância Morro Grande logo (white version: "Estância Morro Grande Branco_1752992752131.png")
- **Corpo Clínico**: Use professional medical team photo ("ChatGPT Image 20 de jul. de 2025, 02_43_08_1752992995219.png")

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Routing**: Wouter for client-side routing
- **State Management**: React Query (TanStack Query) for server state
- **Form Handling**: React Hook Form with Zod validation
- **Build Tool**: Vite with custom configuration for development and production

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL (Neon serverless) with hybrid fallback system
- **ORM**: Drizzle ORM with Drizzle Kit for schema management
- **Storage**: HybridStorage class (PostgreSQL primary, MemStorage fallback)
- **Lead Management**: Full CRUD operations with timestamp tracking

### Development Setup
- **Development Server**: Vite dev server with HMR
- **Production Build**: ESBuild for server bundling, Vite for client bundling
- **Type Checking**: TypeScript with strict mode enabled

## Key Components

### Client-Side Components
1. **Landing Page Sections**:
   - Header with navigation
   - Hero carousel with emotional messaging
   - Treatment information (mental health & addiction)
   - Facility structure showcase
   - Patient testimonials carousel
   - Lead capture form
   - Footer with contact information

2. **UI Components**: Complete shadcn/ui component library including buttons, forms, modals, carousels, and more

3. **Utility Components**:
   - WhatsApp floating button
   - Toast notifications
   - Form validation with Zod schemas

### Server-Side Components
1. **API Routes**:
   - `POST /api/leads` - Submit new lead
   - `GET /api/leads` - Retrieve all leads (admin)

2. **Storage Layer**:
   - `MemStorage` class for in-memory lead storage
   - Interface-based design for easy database switching

3. **Middleware**:
   - Request logging
   - JSON/URL-encoded body parsing
   - Error handling

## Data Flow

1. **Lead Submission**:
   - User fills contact form with name, phone, and treatment type
   - Form validates using Zod schema
   - React Query mutation sends POST request to `/api/leads`
   - Server validates and stores lead data
   - Success/error feedback via toast notifications

2. **Content Display**:
   - Static content rendered from components
   - Image carousels auto-advance every 5-7 seconds
   - Smooth scrolling navigation between sections

3. **Client-Server Communication**:
   - React Query handles API state management
   - Custom `apiRequest` utility for HTTP requests
   - Error boundaries and loading states

## Database Schema

The application uses PostgreSQL with the following tables:

```typescript
leads: {
  id: serial (primary key)
  name: text (required)
  phone: text (required) 
  treatment: text (optional) - treatment type selected by user
  insurance: text (optional) - health insurance/plan information
  createdAt: timestamp (auto-generated with NOW()) - exact submission date/time
}

videos: {
  id: serial (primary key)
  title: text (required) - video title
  description: text (optional) - video description
  filename: text (required) - video file name in public folder
  section: text (required) - section where video is displayed (hero, tour, etc)
  isActive: text (default 'true') - active status for video management
  createdAt: timestamp (auto-generated with NOW()) - upload date/time
}
```

## External Dependencies

### Frontend Dependencies
- **UI Framework**: React 18, TypeScript
- **Styling**: Tailwind CSS, Radix UI primitives
- **Form Management**: React Hook Form, Zod validation
- **State Management**: TanStack React Query
- **Icons**: Lucide React, React Icons
- **Carousel**: Embla Carousel React
- **Date Handling**: date-fns

### Backend Dependencies
- **Server**: Express.js
- **Database**: Drizzle ORM, @neondatabase/serverless
- **Session**: connect-pg-simple
- **Development**: tsx for TypeScript execution

### Development Dependencies
- **Build Tools**: Vite, ESBuild
- **Replit Integration**: Cartographer plugin, runtime error overlay

## Deployment Strategy

### Development
- Vite dev server with HMR on client
- tsx for server-side TypeScript execution
- Replit-specific plugins for development environment

### Production
1. **Client Build**: 
   - Vite builds React app to `dist/public`
   - Optimized bundles with code splitting
   - Static asset optimization

2. **Server Build**:
   - ESBuild bundles server code to `dist/index.js`
   - External packages excluded from bundle
   - ES module format maintained

3. **Database**:
   - Drizzle migrations via `drizzle-kit push`
   - PostgreSQL connection via DATABASE_URL environment variable
   - Fallback to in-memory storage for development

### Environment Variables
- `DATABASE_URL`: PostgreSQL connection string
- `NODE_ENV`: Environment mode (development/production)

The application is designed to be deployed on platforms like Replit, Vercel, or any Node.js hosting service with PostgreSQL support.

## Recent Changes (July 21, 2025)

✓ **SISTEMA WHATSAPP LINK IMPLEMENTADO**: Envio automático via wa.me para +5515997559520
  - **Link automático**: Após submissão, abre WhatsApp com mensagem pré-preenchida
  - **Banco PostgreSQL**: Leads salvos para histórico no admin panel
  - **Template personalizado**: Mensagem formatada com dados do lead (nome, telefone, tratamento, plano)
  - **Abertura automática**: window.open() abre WhatsApp em nova aba após submit
  - **Data/hora brasileira**: Timestamp automático no formato dd/mm/yyyy hh:mm
  - **Labels traduzidas**: Converte IDs para nomes legíveis (ex: saude-mental → Saúde Mental)
  - **Sem APIs externas**: Funciona direto do navegador, sem necessidade de tokens
  - **Dupla funcionalidade**: Salva no banco + envia via WhatsApp automaticamente
✓ **BANCO DE DADOS POSTGRESQL IMPLEMENTADO**: Sistema completo de persistência com histórico
  - **DatabaseStorage**: Integração com PostgreSQL usando Neon serverless
  - **Histórico completo**: Todos os leads salvos com data e horário precisos
  - **Sistema híbrido**: Fallback para memory storage se banco não disponível
  - **Tabelas criadas**: leads e videos com schema completo e timestamps
  - **Seeding automático**: Inicialização do vídeo tour automaticamente
✓ **ADMIN PANEL APRIMORADO**: Interface completa para gestão de leads
  - **Filtros avançados**: Por nome, telefone, tratamento e período de data
  - **Ordenação flexível**: Por data (mais recentes/antigos) e nome alfabético
  - **Estatísticas em tempo real**: Total de leads, filtrados e último lead recebido
  - **Histórico detalhado**: Data, horário exato e tempo relativo para cada lead
  - **Exportação CSV**: Download de dados filtrados com data/hora completa
  - **Integração WhatsApp**: Botões diretos para contato via WhatsApp
  - **Filtro por período**: Hoje, ontem, última semana, último mês
  - **Busca inteligente**: Por nome ou telefone com resultados instantâneos
✓ **GLASSMORPHISM VERDE CRISTALINO FINALIZADO**: Efeito vidro ultra-transparente com identidade da marca
  - **Transparência premium**: Cores #2c744c/25-30% mantendo identidade verde natural
  - **Multicamadas de vidro**: Verde + branco intercalados para profundidade cristalina
  - **backdrop-blur-3xl**: Desfoque máximo com efeito vidro sofisticado
  - **Bordas verdes**: border-[#2c744c]/25-40 para consistência visual da marca
  - **Shimmer animado**: Pulso verde sutil via-[#2c744c]/12 para vitalidade
  - **Reflexos multicamadas**: Gradientes verde + branco para efeito premium
  - **Hover effects verdes**: bg-[#2c744c]/20 para feedback visual da marca
  - **Mobile harmonizado**: Menu dropdown com mesma transparência e tons verdes
✓ **OTIMIZAÇÃO MOBILE PARA VÍDEO HERO IMPLEMENTADA**: Ajustes responsivos do vídeo principal
  - **Mobile (até 640px)**: object-position center 35%, scale 1.15 para melhor enquadramento da frase
  - **Tablet (641px-1024px)**: object-position center 40%, scale 1.1 para visualização otimizada  
  - **Desktop (1025px+)**: object-position center center, scale 1.0 para visualização completa
  - **Responsividade aprimorada**: Garantia de que a frase no vídeo fica sempre visível e em destaque
  - **CSS otimizado**: Breakpoints específicos para cada dispositivo com melhor UX

## Recent Changes (July 21, 2025)

✓ **DEPLOY CONFIGURADO**: Preparado para deploy com domínio personalizado
  - **Domínio desejado**: hemg.contato.com.br (domínio .com.br personalizado)
  - **Alternativa temporária**: Hemg.contato.replit.app
  - **Build otimizado**: Scripts de build e produção prontos
  - **Variáveis ambiente**: PostgreSQL configurado para produção
  - **DNS ready**: Configuração DNS preparada para domínio personalizado
✓ **VÍDEO HERO OTIMIZADO**: Removida opacidade para vídeo mais vivo e chamativo
  - **Overlays removidos**: Eliminados gradientes escuros que reduziam visibilidade do vídeo
  - **Filtros aprimorados**: brightness(1.2), contrast(1.15), saturate(1.25) para máxima vivacidade
  - **Overlay mínimo**: Apenas gradiente inferior sutil para legibilidade dos botões
  - **Cores vibrantes**: Vídeo agora aparece em cores naturais e mais atrativas
✓ **FORMULÁRIO CONTACT CORRIGIDO**: Solucionado erro runtime dos Select components
  - **HTML Select nativo**: Substituído shadcn Select por campos HTML nativos
  - **Sem erros runtime**: Formulário funciona perfeitamente sem quebrar a página
  - **Todas opções mantidas**: Tratamentos e convênios preservados integralmente
  - **Funcionamento perfeito**: WhatsApp abre automaticamente após submissão
✓ **MIGRAÇÃO COMPLETA PARA REPLIT COM WHATSAPP IMPLEMENTADO**: Projeto migrado com sucesso do Replit Agent para ambiente Replit
✓ **SISTEMA WHATSAPP AUTOMÁTICO IMPLEMENTADO**: Envio automático de mensagens via WhatsApp quando cliente preenche formulário
  - **Duas bases de dados**: Admin panel (PostgreSQL) + WhatsApp logs (PostgreSQL) funcionando perfeitamente
  - **Normalização números brasileiros**: Sistema trata formatos +55 11 9XXXX-XXXX e +55 11 XXXX-XXXX automaticamente
  - **Templates personalizáveis**: Mensagens com variáveis {nome}, {telefone}, {tratamento}, {plano}
  - **Multi-provider support**: Suporte para Twilio, Meta WhatsApp Business API, Zenvia, etc
  - **Logs completos**: Histórico de todas as mensagens enviadas com status e erros
  - **Envio em background**: Não bloqueia resposta do formulário, processamento assíncrono
  - **APIs REST completas**: /api/whatsapp/config, /api/whatsapp/logs, /api/whatsapp/setup
  - **Segurança**: Tokens API nunca expostos nas respostas, armazenamento seguro no banco
✓ **OTIMIZAÇÃO MOBILE DO VÍDEO**: Aplicado zoom de -25% no header para dispositivos móveis
  - **Mobile**: transform scale(0.75) - zoom de -25% + object-position center 25%
  - **Tablet**: object-position center 30% - sem zoom
  - **Desktop**: object-position center center - sem zoom
  - **Enquadramento otimizado**: Frase do vídeo destacada com melhor proporção visual
✓ **HEADER ULTRA-MODERNO IMPLEMENTADO**: Design inovador, profissional e atrativo
  - **Glassmorphism avançado**: Fundo com backdrop-blur-xl e gradientes sofisticados
  - **Paleta moderna**: Slate-900/800 com acentos emerald para visual contemporâneo
  - **Logo modernizado**: Efeito glow, drop-shadow dinâmico e animações suaves
  - **Navegação refinada**: Botões arredondados com hover effects e animações 500ms
  - **Botão contato premium**: Gradiente emerald com shine effects e borders elegantes
  - **Mobile otimizado**: Design consistente com glassmorphism e interações modernas
  - **Animações sofisticadas**: Pulse, scale, glow e shine effects coordenados
  - **Design clean**: Removidas bordas em curvas para visual minimalista e moderno
✓ **NAVEGAÇÃO COM ÍCONES IMPLEMENTADA**: Sistema intuitivo com ícones representativos
  - **Desktop**: Ícones + texto para cada seção (Home, Heart, Building2, MessageCircle)
  - **Mobile**: Menu hamburger com dropdown moderno e glassmorphism
  - **Ícones intuitivos**: Home (início), Heart (tratamentos), Building2 (estrutura), MessageCircle (depoimentos)
  - **Menu suspenso**: Backdrop-blur-xl, animações suaves e hover effects
  - **UX otimizada**: Menu fecha automaticamente após navegação
✓ **PALETA DE CORES HARMONIZADA**: Integração completa com a marca Estância Morro Grande
  - **Cor primária**: #2c744c (verde natural da marca) em todos os elementos
  - **Opacidade aumentada**: 85-90% para melhor efeito vidro
  - **Glassmorphism premium**: backdrop-blur-2xl com reflexos brancos sutis
  - **Gradientes naturais**: Transições suaves entre #2c744c e #1e5233
  - **Sombras harmonizadas**: shadow-[#2c744c]/30-40 para profundidade natural
  - **Bordas elegantes**: border-[#2c744c]/20-30 para definição sutil
  - **Ultra-transparência**: Cores reduzidas para 25-30% de opacidade mantendo identidade verde
  - **Glassmorphism verde**: backdrop-blur-3xl com camadas verdes e brancas intercaladas
  - **Bordas da marca**: border-[#2c744c]/25-40 para identidade visual consistente
  - **Efeito cristal verde**: Múltiplas camadas de vidro com tons #2c744c sutis
  - **Shimmer animado**: Pulso verde sutil via-[#2c744c]/12 para vitalidade
  - **Reflexos multicamadas**: Gradientes verde + branco para profundidade premium
✓ **SISTEMA DE ANIMAÇÕES ULTRA-SUAVES IMPLEMENTADO**: Sistema completo de animações flutuantes ultra-relaxantes
  - **Animações CSS ultra-suaves**: floatGentle (12s), float (8s) e pulse-glow (8s) com movimentos mínimos
  - **Movimentos sutis**: Flutuação máxima -3px, rotação máxima ±0.3°, totalmente relaxante
  - **Pulse-glow tranquilo**: Opacidade 0.85-0.95 com duração 8s para efeito zen
  - **Hover effects delicados**: Escala 105-110%, elevação -0.5px a -1px, rotação ±2-3°
  - **Transições longas**: 700ms para todos os efeitos hover, criando fluidez premium
  - **Sombras suaves**: Drop-shadow 1-2px com brightness 1.05, visual elegante
  - **Checkmarks zen**: Movimento sutil com scale 108% e rotação 3° no hover
  - **Performance otimizada**: Animações leves que não impactam desempenho do site
✓ **BANCO DE DADOS IMPLEMENTADO**: Adicionada tabela de vídeos com schema completo
✓ **VÍDEO LOCAL INTEGRADO**: Substituído vídeo externo pelo arquivo local "WhatsApp Video 2025-07-18 at 09.25.19_1752995612939.mp4"
✓ **API DE VÍDEOS**: Implementadas rotas REST para gerenciar vídeos por seção
✓ **CORREÇÃO DUPLICAÇÃO**: Removido autoplay para evitar reprodução dupla do vídeo

## Recent Changes (Previous Updates)

✓ **MIGRATION COMPLETED**: Successfully migrated from Replit Agent to Replit environment
✓ **Logo Oficial Implementado**: Substituído SVG genérico pelo logo oficial da Estância Morro Grande
✓ **Correção de Assets**: Resolvidos todos os imports de imagens faltantes
✓ **Arquitetura Segura**: Implementada separação client-server com práticas de segurança robustas
✓ **Sistema de Vídeos Implementado**: Adicionado sistema completo de gerenciamento de vídeos
✓ **Banco de Dados de Vídeos**: Criada tabela de vídeos com schema e API endpoints
✓ **Vídeo Local Integrado**: Substituído vídeo externo pelo arquivo local no projeto
✓ **Storage Híbrido**: Implementado sistema com fallback para memory storage

✓ Successfully migrated from Replit Agent to Replit environment
✓ Removed carousel content from hero section (titles, descriptions, badges)
✓ Simplified hero section to minimal video background only
✓ Moved "Fale com Especialista" button to fixed bottom-center position
✓ Repositioned WhatsApp button to bottom-right as floating action
✓ Added "Atendimento 24 horas" text below CTA button with backdrop
✓ Disabled automatic rotation in testimonials carousel (now static)
✓ Maintained video background and gradient overlay in hero section
✓ Enhanced CTA button with commercial gradient design and shine effects
✓ Redesigned header with premium glassmorphism and gradients
✓ Applied consistent emerald/green branding throughout header
✓ Added interactive hover effects and professional typography
✓ Updated color scheme to use #2c744c as primary brand color
✓ Created harmonious gradient system from #2c744c to #1e5233
✓ Unified visual identity across header, CTA button, and site elements
✓ Updated CSS variables to maintain color consistency throughout
✓ Enhanced header contact button with premium styling and WhatsApp hover effect
✓ Improved logo section with corporate glassmorphism and multiple glow effects
✓ Added sophisticated border treatments and layered shine animations
✓ Refined header styling to reduce excessive brightness and white effects
✓ Balanced visual intensity while maintaining corporate elegance
✓ Implemented official hospital logo as custom SVG vector in white
✓ Added elegant decorative border to header with gradient styling
✓ Replaced contact button icon with official WhatsApp logo permanently
✓ Added "Tratamento Multimodal" to differentials section
✓ Updated medical team photo to professional clinical team image
✓ Enhanced differentials grid layout to accommodate 5 items
✓ Replaced medical team photo with diverse healthcare professionals smiling together
✓ Enhanced header with soft edge shadows matching CTA button styling
✓ Removed decorative border lines for cleaner corporate appearance  
✓ Increased header height and removed text elements for minimal branding
✓ Added custom medical team photo to "Corpo Clínico" section
✓ Implemented Estância Morro Grande facility photo as contact form background
✓ Applied green brand overlay (85% opacity) over background image for visual consistency
✓ Added WhatsApp video tour section with custom video player and professional UI
✓ Integrated uploaded WhatsApp video file showing authentic facility tour
✓ Created interactive video section with play button and informational cards
✓ Positioned video section strategically between treatments and structure sections

## Recent Changes

- **July 20, 2025**: Successfully migrated from Replit Agent to Replit environment and prepared for GitHub deployment
  - ✅ Installed required packages (tsx, Node.js runtime)
  - ✅ Fixed server architecture and security configuration
  - ✅ Updated hero section layout per user request:
    - Removed carousel from hero section
    - Moved "Fale com Especialista" button to fixed bottom-center position
    - Maintained WhatsApp button in bottom-right position
    - Both buttons now on same horizontal line for better UX
  - ✅ **Fixed form Select field errors**: Implemented Controller components for proper React Hook Form integration
  - ✅ **Lead capture system fully functional**: Forms submit correctly to admin panel at /admin (password: estancia2025)
  - ✅ **GitHub preparation**: Updated .gitignore and created comprehensive README.md for repository deployment
  - ✅ **System validation**: All components tested and working - lead capture, admin panel, responsive design
  - ✅ **Enhanced header contact button**: Updated to match "Fale com Especialista" pattern with WhatsApp hover effect