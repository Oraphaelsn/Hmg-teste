# Configuração de Domínio - hemg.contato.com.br

## 🎯 Objetivo
Configurar o domínio personalizado `hemg.contato.com.br` para a landing page da Estância Morro Grande.

## 📋 Passo a Passo

### 1. Registro do Domínio
**Onde registrar:**
- **Registro.br** (oficial para .com.br)
- **GoDaddy** (internacional)
- **HostGator** (brasileiro)
- **UOL Host** (brasileiro)

**Custo aproximado:** R$ 40-80/ano

### 2. Deploy no Replit
1. Clique em "Deploy" no Replit
2. Escolha "Reserved VM" ou "Autoscale"
3. Na seção "Custom Domain", adicione: `hemg.contato.com.br`
4. Replit fornecerá instruções de DNS

### 3. Configuração DNS
**No painel do registrador, adicione:**

```
Tipo: A
Nome: hemg.contato  
Valor: [IP fornecido pelo Replit]
TTL: 3600

Tipo: CNAME
Nome: www.hemg.contato
Valor: hemg.contato.com.br
TTL: 3600
```

### 4. SSL/HTTPS
- Automático via Replit
- Certificado Let's Encrypt
- Redirecionamento HTTP → HTTPS

## ⚡ Alternativas Rápidas

### Opção A: Subdomínio Temporário
- Usar primeiro: `Hemg.contato.replit.app`
- Migrar depois para `hemg.contato.com.br`

### Opção B: Vercel (Recomendado)
- Deploy no Vercel (gratuito)
- Domínio personalizado incluído
- Performance superior
- SSL automático

## 💰 Custos Comparativos

| Plataforma | Hospedagem | Domínio .com.br | Total/Ano |
|------------|------------|-----------------|-----------|
| Replit | R$ 240/ano | R$ 60/ano | R$ 300/ano |
| Vercel | Gratuito | R$ 60/ano | R$ 60/ano |
| Netlify | Gratuito | R$ 60/ano | R$ 60/ano |

## 🚀 Processo Recomendado

### Imediato (5 minutos):
1. Deploy no Replit com `Hemg.contato.replit.app`
2. Testar todas as funcionalidades
3. Site no ar imediatamente

### Depois (quando tiver domínio):
1. Registrar `hemg.contato.com.br`
2. Configurar DNS
3. Migrar para domínio personalizado

## 🔧 Configurações Técnicas

### Headers de Segurança:
```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff  
X-XSS-Protection: 1; mode=block
Strict-Transport-Security: max-age=31536000
```

### Performance:
- Gzip compression: Automático
- CDN: Replit Edge Network
- Cache: Configurado no build

### SEO:
- Sitemap.xml: Automático
- Robots.txt: Configurado
- Meta tags: Implementadas

## 📊 Status Atual

✅ **Pronto para deploy:**
- Código otimizado
- Build testado
- Assets incluídos
- Database configurado

✅ **Funcionalidades verificadas:**
- Formulário de contato
- WhatsApp automático  
- Admin panel
- Design responsivo

## ⚠️ Importante

**DNS Propagation:**
- Pode levar 24-48h para funcionar globalmente
- Use ferramentas como `nslookup` para verificar

**Backup:**
- Manter versão em `Hemg.contato.replit.app` como backup
- Configurar redirects se necessário

---

**Próximos passos:** 
1. Fazer deploy teste no Replit
2. Registrar domínio `hemg.contato.com.br` 
3. Configurar DNS conforme instruções do Replit