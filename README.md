# Estância Morro Grande - Landing Page

Uma landing page profissional e responsiva para captura de leads da **Estância Morro Grande**, clínica especializada em tratamento de saúde mental e dependência química.

## 🎯 **Funcionalidades Principais**

### **Para Visitantes:**
- 📱 **Design Responsivo**: Funciona perfeitamente em dispositivos móveis e desktop
- 🎥 **Hero Section Premium**: Vídeo de fundo cinematográfico com overlays profissionais
- 📋 **Formulário de Contato**: Captura de leads com validação em tempo real
- 💬 **WhatsApp Integrado**: Botão flutuante para contato direto
- 🏥 **Informações Completas**: Tipos de tratamento, estrutura da clínica e testemunhos
- 🎨 **Visual Premium**: Paleta de cores natural verde (#2c744c) com gradientes harmoniosos

### **Para Administradores:**
- 🔐 **Painel Admin**: Interface administrativa em `/admin` (senha: `estancia2025`)
- 📊 **Gerenciamento de Leads**: Visualização, categorização e links diretos para WhatsApp
- 🔄 **Atualização Automática**: Refresh automático a cada 30 segundos
- 💾 **Sistema Híbrido**: Armazenamento em memória com preparação para Supabase

## 🏗️ **Arquitetura Técnica**

### **Frontend**
- **React 18** com TypeScript
- **Tailwind CSS** + shadcn/ui components
- **React Hook Form** com validação Zod
- **TanStack Query** para gerenciamento de estado
- **Wouter** para roteamento
- **Vite** como build tool

### **Backend**
- **Node.js** + Express.js
- **TypeScript** com ES modules
- **Drizzle ORM** preparado para PostgreSQL
- **API RESTful** para gerenciamento de leads

## 🚀 **Como Executar**

### **Desenvolvimento Local**
```bash
# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm run dev

# Acesso:
# - Landing Page: http://localhost:5000
# - Painel Admin: http://localhost:5000/admin
```

### **Produção**
```bash
# Build do projeto
npm run build

# Executar produção
npm start
```

## 📁 **Estrutura do Projeto**

```
├── client/                 # Frontend React
│   ├── src/
│   │   ├── components/     # Componentes UI
│   │   ├── pages/         # Páginas da aplicação
│   │   └── lib/           # Utilitários e configurações
├── server/                # Backend Express
│   ├── routes.ts          # Rotas da API
│   └── storage.ts         # Interface de armazenamento
├── shared/                # Tipos e schemas compartilhados
│   └── schema.ts          # Schemas Drizzle + Zod
└── dist/                  # Build de produção
```

## 🔧 **Configuração**

### **Variáveis de Ambiente**
```env
DATABASE_URL=postgresql://...  # URL do PostgreSQL (opcional)
NODE_ENV=development          # Ambiente (development/production)
```

### **Banco de Dados**
O projeto suporta:
- **Desenvolvimento**: Armazenamento em memória (padrão)
- **Produção**: PostgreSQL via Supabase/Neon (configuração via `DATABASE_URL`)

## 📊 **Schema de Dados**

```typescript
leads: {
  id: serial (primary key)
  name: text (obrigatório)
  phone: text (obrigatório)
  treatment: text (opcional) - tipo de tratamento
  insurance: text (opcional) - plano de saúde
  createdAt: timestamp (auto-gerado)
}
```

## 🎨 **Design System**

### **Paleta de Cores**
- **Primária**: `#2c744c` (Verde natural)
- **Secundária**: `#1e5233` (Verde escuro)
- **Gradientes**: Harmoniosos entre tons primários
- **Acentos**: Shadows e efeitos em tons da marca

### **Tipografia**
- **Família**: Varela Round (fonte principal)
- **Hierarquia**: H1-H6 com tamanhos responsivos
- **Peso**: Normal a Black conforme contexto

## 🔐 **Segurança**

- **Validação**: Schemas Zod em frontend e backend
- **Sanitização**: Inputs sanitizados automaticamente
- **Admin**: Autenticação por senha para painel administrativo
- **CORS**: Configurado para produção

## 📱 **Responsividade**

- **Mobile First**: Design otimizado para dispositivos móveis
- **Breakpoints**: Tailwind CSS responsive design
- **Touch Friendly**: Botões e interações otimizadas para touch
- **Performance**: Lazy loading e otimizações de bundle

## 🚀 **Deploy**

### **Replit Deployments**
O projeto está otimizado para deploy direto no Replit:
1. Configuração automática de portas
2. Build process otimizado
3. Variáveis de ambiente configuradas

### **Outras Plataformas**
Compatível com:
- **Vercel**: Zero-config deployment
- **Netlify**: Com configuração de redirects
- **Railway**: PostgreSQL integrado
- **Heroku**: Com Postgres addon

## 📞 **Contato e Suporte**

**Estância Morro Grande**
- 📍 Estrada Nakayama 150, Rodovia Bunjiro Nakao km 67,5
- 📧 contato@estanciamorrogrande.com.br
- 💬 WhatsApp: Integrado na landing page

---

**Desenvolvido com ❤️ para Estância Morro Grande**

*Sistema de captura de leads profissional com foco em saúde mental e dependência química.*