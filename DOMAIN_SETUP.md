# Configuração Domínio Customizado - www.hemginternacoes.com.br

## Deploy no Replit com Domínio Customizado

### 1. Deploy no Replit
1. Clique no botão **"Deploy"** no painel do Replit
2. Aguarde o build e deploy automático
3. URL temporária: `hemg-contato.replit.app`

### 2. Registro do Domínio
**Domínio desejado**: `www.hemginternacoes.com.br`

**Onde registrar domínios .com.br:**
- **Registro.br** (oficial brasileiro)
- **GoDaddy Brasil**
- **HostGator Brasil**
- **Locaweb**
- **UOL Host**

### 3. Configuração DNS (após registro)
No painel do seu provedor de domínio, configure:

```
Tipo: CNAME
Nome: www
Valor: hemg-contato.replit.app
TTL: 300 (5 minutos)

Tipo: A (opcional para domínio raiz)
Nome: @
Valor: [IP do Replit será fornecido]
```

### 4. Configuração no Replit
1. Acesse **Deployments** no Replit
2. Clique em **"Custom Domain"**
3. Adicione: `www.hemginternacoes.com.br`
4. Siga as instruções de verificação

### 5. SSL/HTTPS
- Replit configura SSL automaticamente
- Certificado válido em 5-10 minutos
- Redirecionamento HTTP → HTTPS automático

## Status Atual do Projeto

✅ **Pronto para Deploy:**
- Scripts de build configurados
- PostgreSQL configurado
- Sistema de leads funcionando
- WhatsApp integração ativa
- SEO otimizado
- Admin panel (/admin)

## Próximos Passos

1. **AGORA**: Deploy no Replit
2. **DEPOIS**: Registrar domínio hemginternacoes.com.br
3. **FINAL**: Configurar DNS e SSL

**Começar deploy agora?**