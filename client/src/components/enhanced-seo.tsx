import { useEffect } from 'react';

// Enhanced SEO features for medical clinic
export function usePageTracking(pageName: string) {
  useEffect(() => {
    // Google Analytics 4 tracking (quando implementado)
    if (typeof gtag !== 'undefined') {
      gtag('config', 'GA_MEASUREMENT_ID', {
        page_title: pageName,
        page_location: window.location.href
      });
    }
    
    // Page view tracking
    console.log(`Page viewed: ${pageName}`);
  }, [pageName]);
}

// JSON-LD structured data for FAQ section
export const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Qual é o tempo de internação na Estância Morro Grande?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "O tempo de internação varia conforme o caso individual, normalmente entre 30 a 90 dias, determinado pela equipe médica com base na avaliação do paciente."
      }
    },
    {
      "@type": "Question", 
      "name": "A clínica aceita convênios médicos?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sim, trabalhamos com os principais convênios médicos. Entre em contato conosco para verificar se seu plano está coberto."
      }
    },
    {
      "@type": "Question",
      "name": "Como é feita a internação voluntária?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A internação voluntária é feita com o consentimento do paciente, após avaliação médica completa e elaboração do plano de tratamento individualizado."
      }
    },
    {
      "@type": "Question",
      "name": "Qual é o diferencial do tratamento multimodal?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "O tratamento multimodal combina diferentes abordagens terapêuticas: medicamentosa, psicoterapia, terapia ocupacional e atividades físicas, oferecendo resultados mais eficazes."
      }
    }
  ]
};

// Breadcrumb structured data
export const generateBreadcrumbData = (items: Array<{name: string, url: string}>) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
};

// Service structured data for medical treatments
export const treatmentServicesData = {
  "@context": "https://schema.org",
  "@type": "MedicalOrganization",
  "name": "Estância Morro Grande",
  "availableService": [
    {
      "@type": "MedicalTherapy",
      "name": "Tratamento de Saúde Mental",
      "alternateName": "Tratamento Psiquiátrico",
      "description": "Tratamento especializado para transtornos mentais incluindo depressão, ansiedade, transtorno bipolar, esquizofrenia e outros transtornos psiquiátricos",
      "medicalSpecialty": "Psychiatry"
    },
    {
      "@type": "MedicalTherapy",
      "name": "Tratamento de Dependência Química",
      "alternateName": "Desintoxicação e Reabilitação",
      "description": "Programa completo de desintoxicação e reabilitação para dependentes de álcool, drogas e outras substâncias",
      "medicalSpecialty": "Addiction Medicine"
    },
    {
      "@type": "MedicalTherapy",
      "name": "Internação Voluntária",
      "description": "Internação hospitalar especializada com acompanhamento médico 24 horas para casos que necessitam cuidado intensivo",
      "medicalSpecialty": "Mental Health"
    },
    {
      "@type": "MedicalTherapy",
      "name": "Tratamento Multimodal",
      "description": "Abordagem integrada combinando medicação, psicoterapia, terapia ocupacional e atividades físicas para resultados otimizados",
      "medicalSpecialty": "Integrative Medicine"
    }
  ]
};

// Reviews/Testimonials structured data
export const reviewsStructuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Estância Morro Grande",
  "review": [
    {
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "author": {
        "@type": "Person",
        "name": "Maria Silva"
      },
      "reviewBody": "Excelente atendimento e estrutura. A equipe médica é muito competente e o tratamento realmente funciona. Recomendo!"
    },
    {
      "@type": "Review", 
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "author": {
        "@type": "Person",
        "name": "João Santos"
      },
      "reviewBody": "Lugar incrível para recuperação. Ambiente acolhedor e tratamento individualizado. Mudou minha vida completamente."
    },
    {
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating", 
        "ratingValue": "5",
        "bestRating": "5"
      },
      "author": {
        "@type": "Person",
        "name": "Ana Costa"
      },
      "reviewBody": "Profissionais dedicados e ambiente muito bem estruturado. Minha família está muito grata pelo cuidado recebido."
    }
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5",
    "reviewCount": "3",
    "bestRating": "5",
    "worstRating": "1"
  }
};

// Contact information structured data
export const contactStructuredData = {
  "@context": "https://schema.org",
  "@type": "ContactPoint",
  "telephone": "+55-15-99755-9520",
  "contactType": "customer service",
  "availableLanguage": "Portuguese",
  "areaServed": "BR",
  "hoursAvailable": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
    ],
    "opens": "00:00",
    "closes": "23:59"
  }
};