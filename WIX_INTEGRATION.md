# Deploy no Wix - Estância Morro Grande

## ⚠️ IMPORTANTE: Limitações do Wix

O Wix funciona de forma diferente do seu projeto atual:
- **Wix**: Editor visual + templates prontos
- **Seu projeto**: React + Express + PostgreSQL customizado

## Opções para Usar o Wix

### Opção 1: Wix Studio (Recomendada)
**Para manter suas funcionalidades:**

1. **Criar conta Wix Studio** (mais avançado que Wix normal)
2. **Importar design visual** do seu site atual
3. **Recriar funcionalidades** usando Wix APIs
4. **Configurar formulários** com Wix Forms
5. **Integrar WhatsApp** via Wix Chat

### Opção 2: Wix + Integração Externa
**Híbrida - Visual no Wix, Backend separado:**

1. **Site visual** no Wix
2. **Formulário integrado** apontando para seu backend Replit
3. **Melhor dos dois mundos**

### Opção 3: Migração Completa (Não Recomendada)
**Perda de funcionalidades customizadas:**
- Perderia admin panel personalizado
- Perderia integração WhatsApp customizada
- Perderia flexibilidade do código

## Passo a Passo - Opção 1 (Wix Studio)

### 1. Registro e Setup Inicial
```
1. Acesse wix.com/studio
2. Crie conta business
3. Escolha "Blank Template" 
4. Configure domínio: www.hemginternacoes.com.br
```

### 2. Estrutura do Site
**Páginas a criar:**
- Home (landing page principal)
- Admin (/admin para gerenciar leads)

### 3. Formulário de Contato
```javascript
// Código Wix para formulário
import { fetch } from 'wix-fetch';

$w.onReady(function () {
    $w('#submitButton').onClick(() => {
        const formData = {
            name: $w('#nameInput').value,
            phone: $w('#phoneInput').value,
            treatment: $w('#treatmentSelect').value,
            insurance: $w('#insuranceSelect').value
        };
        
        // Enviar para backend ou Wix Database
        saveLeadData(formData);
        sendWhatsAppMessage(formData);
    });
});
```

### 4. Integração WhatsApp
**Usando Wix Corvid:**
```javascript
// Função para enviar WhatsApp
function sendWhatsAppMessage(data) {
    const message = `🌿 Olá, Estância Morro Grande!
    
    Gostaria de saber mais informações sobre os tratamentos disponíveis.
    
    👤 Meu nome: ${data.name}
    📞 Telefone para contato: ${data.phone}
    💊 Tipo de tratamento: ${data.treatment}
    🏥 Plano de saúde: ${data.insurance}`;
    
    const whatsappUrl = `https://wa.me/5515996834387?text=${encodeURIComponent(message)}`;
    wixLocation.to(whatsappUrl);
}
```

### 5. Banco de Dados Wix
```javascript
// Configurar Wix Database
import wixData from 'wix-data';

// Salvar lead
function saveLeadData(formData) {
    wixData.insert("Leads", {
        "name": formData.name,
        "phone": formData.phone,
        "treatment": formData.treatment,
        "insurance": formData.insurance,
        "_dateCreated": new Date()
    });
}
```

## Passo a Passo - Opção 2 (Híbrida)

### 1. Site Visual no Wix
- Design responsivo no editor Wix
- Seções: Hero, Tratamentos, Estrutura, Depoimentos

### 2. Formulário Integrado
```html
<!-- Formulário que aponta para seu Replit -->
<form action="https://hemg-contato.replit.app/api/leads" method="POST">
    <input name="name" placeholder="Nome completo">
    <input name="phone" placeholder="Telefone">
    <select name="treatment">
        <option value="saude-mental">Saúde Mental</option>
        <option value="dependencia-quimica">Dependência Química</option>
    </select>
    <button type="submit">Enviar</button>
</form>
```

## Custos Comparativos

### Wix Studio
- **Plano Business**: R$ 49/mês
- **Plano Business Elite**: R$ 99/mês
- **Domínio customizado**: Incluído
- **SSL**: Incluído

### Seu Projeto Atual (Replit)
- **Replit Deploy**: $7-20/mês
- **Funcionalidades**: Completas e customizadas

## Recomendação Final

**Para Estância Morro Grande:**
1. **Mantenha no Replit**: Projeto já perfeito e funcional
2. **Se quiser Wix**: Use opção híbrida (visual Wix + backend Replit)
3. **Evite migração completa**: Perderia funcionalidades importantes

**Seu projeto atual é superior ao Wix em:**
- Flexibilidade total
- Admin panel personalizado
- Integração WhatsApp avançada
- SEO otimizado
- Performance

**Qual opção prefere explorar?**