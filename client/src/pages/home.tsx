import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import TreatmentsSection from "@/components/treatments-section";
import StructureSection from "@/components/structure-section";
import TestimonialsSection from "@/components/testimonials-section";
import ContactForm from "@/components/contact-form";
import WhatsappFloat from "@/components/whatsapp-float";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <TreatmentsSection />
      <StructureSection />
      <TestimonialsSection />
      <ContactForm />
      <WhatsappFloat />
      <Footer />
    </div>
  );
}
