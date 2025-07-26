import { useEffect } from 'react';

// Component to ensure animation consistency across the site
export function AnimationConsistency() {
  useEffect(() => {
    // Set consistent animation delays for staggered effects
    const animatedElements = document.querySelectorAll('.fade-in-scale, .slide-in-up, .bounce-in');
    
    animatedElements.forEach((element, index) => {
      const delay = index * 0.1; // 100ms stagger
      (element as HTMLElement).style.animationDelay = `${delay}s`;
    });

    // Add enhanced hover effects to interactive elements
    const interactiveElements = document.querySelectorAll('button, a, .card, .enhanced-hover');
    
    interactiveElements.forEach(element => {
      element.classList.add('enhanced-hover');
    });

    // Apply focus rings for accessibility
    const focusableElements = document.querySelectorAll('button, a, input, select, textarea');
    
    focusableElements.forEach(element => {
      element.classList.add('focus-ring');
    });

  }, []);

  return null; // This component doesn't render anything
}

// Hook for consistent animation timing
export function useAnimationTiming() {
  return {
    fast: '0.2s',
    normal: '0.3s',
    slow: '0.5s',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
    elastic: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
  };
}

// Utility for contextual WhatsApp messages
export function getContextualWhatsAppMessage(section: string) {
  const messages = {
    hero: "Oi! Vi o site da Estância Morro Grande e gostaria de informações sobre os tratamentos disponíveis.",
    treatments: "Olá! Tenho interesse nos tratamentos de saúde mental e gostaria de saber mais detalhes.",
    structure: "Oi! Fiquei interessado na estrutura da clínica e gostaria de agendar uma visita.",
    testimonials: "Olá! Li os depoimentos e gostaria de conversar sobre um tratamento.",
    contact: "Oi! Preenchi o formulário de contato e gostaria de mais informações."
  };
  
  return messages[section as keyof typeof messages] || messages.hero;
}

export default AnimationConsistency;