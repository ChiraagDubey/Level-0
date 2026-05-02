import { CTA } from "@/components/home/CTA";
import { Hero } from "@/components/home/Hero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { TemplateShowcase } from "@/components/home/TemplateShowcase";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <HowItWorks />
      <TemplateShowcase />
      <CTA />
    </main>
  );
}
