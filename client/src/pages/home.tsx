import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import TreatmentsSection from "@/components/treatments-section";
import VideoSection from "@/components/video-section";
import StructureSection from "@/components/structure-section";
import TestimonialsSection from "@/components/testimonials-section";
import ContactFormFixed from "@/components/contact-form-fixed";
import WhatsappFloat from "@/components/whatsapp-float";
import Footer from "@/components/footer";
import ScrollProgress from "@/components/scroll-progress";
import { SEOHead, seoConfigs, medicalStructuredData } from "@/components/seo-head";

export default function Home() {
  return (
    <div className="min-h-screen">
      <SEOHead 
        {...seoConfigs.home}
        structuredData={medicalStructuredData}
      />
      <ScrollProgress />
      <Header />
      <HeroSection />
      <TreatmentsSection />
      <VideoSection />
      <StructureSection />
      <TestimonialsSection />
      <ContactFormFixed />
      <WhatsappFloat />
      <Footer />
    </div>
  );
}
