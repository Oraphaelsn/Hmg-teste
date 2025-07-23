import { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  structuredData?: object;
}

export function SEOHead({
  title = "Estância Morro Grande - Tratamento de Saúde Mental e Dependência Química | Clínica Especializada",
  description = "Clínica especializada em saúde mental e dependência química com tratamento multimodal personalizado. Equipe médica experiente, estrutura completa e atendimento 24h. Agende sua consulta.",
  keywords = "tratamento saúde mental, dependência química, clínica psiquiátrica, internação voluntária, desintoxicação, tratamento multimodal, saúde mental São Paulo, reabilitação drogas álcool",
  canonical = "https://estanciamorrogrande.com.br",
  ogImage = "https://estanciamorrogrande.com.br/og-image.jpg",
  structuredData
}: SEOHeadProps) {
  
  useEffect(() => {
    // Update document title
    document.title = title;
    
    // Update meta tags
    const updateMeta = (name: string, content: string, property = false) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        if (property) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      meta.content = content;
    };
    
    // Update standard meta tags
    updateMeta('description', description);
    updateMeta('keywords', keywords);
    
    // Update Open Graph tags
    updateMeta('og:title', title, true);
    updateMeta('og:description', description, true);
    updateMeta('og:url', canonical, true);
    updateMeta('og:image', ogImage, true);
    
    // Update Twitter tags
    updateMeta('twitter:title', title, true);
    updateMeta('twitter:description', description, true);
    updateMeta('twitter:image', ogImage, true);
    
    // Update canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = canonical;
    
    // Add structured data if provided
    if (structuredData) {
      let script = document.querySelector('script[type="application/ld+json"][data-dynamic]') as HTMLScriptElement;
      if (!script) {
        script = document.createElement('script');
        script.type = 'application/ld+json';
        script.setAttribute('data-dynamic', 'true');
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(structuredData);
    }
    
  }, [title, description, keywords, canonical, ogImage, structuredData]);
  
  return null;
}

// Predefined SEO configurations for different pages
export const seoConfigs = {
  home: {
    title: "Estância Morro Grande - Tratamento de Saúde Mental e Dependência Química | Clínica Especializada",
    description: "Clínica especializada em saúde mental e dependência química com tratamento multimodal personalizado. Equipe médica experiente, estrutura completa e atendimento 24h. Agende sua consulta.",
    keywords: "tratamento saúde mental, dependência química, clínica psiquiátrica, internação voluntária, desintoxicação, tratamento multimodal, saúde mental São Paulo, reabilitação drogas álcool, clínica reabilitação",
    canonical: "https://estanciamorrogrande.com.br"
  },
  admin: {
    title: "Admin - Estância Morro Grande | Painel Administrativo",
    description: "Painel administrativo para gestão de leads e configurações da Estância Morro Grande.",
    keywords: "admin, painel administrativo, gestão leads",
    canonical: "https://estanciamorrogrande.com.br/admin"
  },
  whatsapp: {
    title: "WhatsApp Admin - Estância Morro Grande | Configuração de Mensagens",
    description: "Configuração e gestão do sistema de mensagens WhatsApp da Estância Morro Grande.",
    keywords: "whatsapp admin, configuração mensagens, gestão comunicação",
    canonical: "https://estanciamorrogrande.com.br/whatsapp"
  }
};

// Health/Medical specific structured data
export const medicalStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Estância Morro Grande - Tratamento de Saúde Mental",
  "description": "Clínica especializada em saúde mental e dependência química com tratamento multimodal personalizado.",
  "url": "https://estanciamorrogrande.com.br",
  "mainEntity": {
    "@type": "MedicalOrganization",
    "name": "Estância Morro Grande",
    "medicalSpecialty": [
      "Psychiatry",
      "Addiction Medicine", 
      "Mental Health Counseling"
    ],
    "availableService": [
      {
        "@type": "MedicalTherapy",
        "name": "Tratamento de Saúde Mental",
        "alternateName": "Tratamento Psiquiátrico",
        "description": "Tratamento especializado para transtornos mentais incluindo depressão, ansiedade, bipolaridade e outros"
      },
      {
        "@type": "MedicalTherapy",
        "name": "Tratamento de Dependência Química", 
        "alternateName": "Desintoxicação e Reabilitação",
        "description": "Programa completo de desintoxicação e reabilitação para dependentes de álcool e drogas"
      },
      {
        "@type": "MedicalTherapy",
        "name": "Internação Voluntária",
        "description": "Internação hospitalar especializada com acompanhamento médico 24 horas"
      }
    ]
  },
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Início",
        "item": "https://estanciamorrogrande.com.br"
      }
    ]
  }
};