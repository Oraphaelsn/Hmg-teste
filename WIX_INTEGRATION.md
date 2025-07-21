# Integração com Wix - Estância Morro Grande

## ⚠️ Limitações do Wix

O Wix tem limitações significativas para projetos React/Node.js:
- Não suporta aplicações React completas
- Não permite servidor Node.js próprio
- Limitado a JavaScript vanilla e APIs do Wix

## 🔄 Opções de Integração

### Opção 1: Recriar no Editor Wix (Recomendado)
**Vantagens:**
- Interface visual do Wix
- Templates prontos
- Hospedagem inclusa
- SEO otimizado

**Processo:**
1. Criar novo site no Wix
2. Escolher template similar
3. Personalizar com o conteúdo da Estância Morro Grande
4. Configurar formulário de contato do Wix
5. Integrar com WhatsApp via botões

### Opção 2: Embed/iFrame (Não Recomendado)
- Hospedar landing atual no Replit/Vercel
- Embed no Wix via iFrame
- Problemas: SEO, responsividade, performance

### Opção 3: Migração Manual dos Componentes

#### Elementos para Migrar:

**Header:**
- Logo: Usar imagem do Estância Morro Grande
- Navegação: Menu do Wix
- Vídeo de fundo: Upload no Wix

**Seções:**
- Tratamentos: Texto + imagens
- Estrutura: Galeria de fotos
- Depoimentos: Carrossel do Wix
- Contato: Formulário nativo do Wix

**Formulário de Contato:**
- Usar Wix Forms
- Campos: Nome, Telefone, Tratamento, Convênio
- Integração: Wix CRM ou email

**WhatsApp:**
- Botão flutuante: Widget do Wix
- Link direto: wa.me/5515997559520

## 📋 Assets Necessários

### Imagens (já disponíveis):
- Logo: `Estância Morro Grande Branco_1752992752131.png`
- Background: `2021-09-22_1752972757556.webp`
- Equipe: `ChatGPT Image 20 de jul. de 2025...png`

### Vídeo:
- `WhatsApp Video 2025-07-18 at 09.25.19...mp4`

### Textos:
- Todos os conteúdos da landing atual
- Depoimentos dos pacientes
- Informações de contato

## 🎨 Design no Wix

### Cores:
- Verde principal: #2c744c
- Verde secundário: #1e5233
- Branco e tons de cinza

### Fontes:
- Similar ao atual (Wix tem biblioteca extensa)

### Layout:
- Hero com vídeo de fundo
- Seções organizadas verticalmente
- Formulário destacado
- Footer com informações

## 📱 Funcionalidades no Wix

### Formulário de Contato:
```javascript
// Exemplo de código Wix para WhatsApp
$w('#contactForm').onWixFormSubmitted((event) => {
  const name = event.formData.name;
  const phone = event.formData.phone;
  const treatment = event.formData.treatment;
  
  // Construir mensagem WhatsApp
  const message = `Novo lead: ${name}, ${phone}, ${treatment}`;
  const whatsappUrl = `https://wa.me/5515997559520?text=${encodeURIComponent(message)}`;
  
  // Abrir WhatsApp
  wixLocation.to(whatsappUrl);
});
```

### Botão WhatsApp Flutuante:
```javascript
// Widget personalizado
$w('#whatsappButton').onClick(() => {
  wixLocation.to('https://wa.me/5515997559520');
});
```

## 🚀 Processo de Migração

### Passo 1: Preparação
1. Fazer download de todos os assets
2. Organizar textos e conteúdos
3. Criar conta Wix premium

### Passo 2: Criação no Wix
1. Escolher template profissional
2. Personalizar cores e fontes
3. Adicionar seções uma por uma
4. Upload das imagens e vídeo

### Passo 3: Funcionalidades
1. Configurar formulário de contato
2. Adicionar botão WhatsApp
3. Configurar SEO
4. Testar responsividade

### Passo 4: Domínio
1. Conectar domínio personalizado
2. Configurar SSL
3. Testar tudo

## 💡 Recomendação

**Para Estância Morro Grande:**

1. **Melhor opção**: Manter no Replit/Vercel
   - Funcionalidades completas
   - Performance superior
   - Controle total

2. **Se insistir no Wix**: Recriar manualmente
   - Perderá algumas funcionalidades avançadas
   - Mais trabalho de migração
   - Menos flexibilidade

3. **Alternativa**: WordPress
   - Mais flexível que Wix
   - Plugins para React
   - Melhor para SEO

## 📊 Comparação

| Recurso | Atual (React) | Wix | WordPress |
|---------|---------------|-----|-----------|
| Performance | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ |
| Flexibilidade | ⭐⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐ |
| SEO | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Manutenção | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| Custo | $ | $$$ | $$ |

---

**Conclusão**: Recomendo manter a landing atual no Replit com domínio personalizado. É mais profissional e eficiente.