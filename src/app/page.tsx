import { BenefitsSection } from "@/components/layout/sections/benefits"
import { CommunitySection } from "@/components/layout/sections/community"
import { ContactSection } from "@/components/layout/sections/contact"
import { FAQSection } from "@/components/layout/sections/faq"
import { FeaturesSection } from "@/components/layout/sections/features"
import { HeroSection } from "@/components/layout/sections/hero"
import { ServicesSection } from "@/components/layout/sections/services"
import { SponsorsSection } from "@/components/layout/sections/sponsors"
import { TeamSection } from "@/components/layout/sections/team"
import { TestimonialSection } from "@/components/layout/sections/testimonial"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      {/* <SponsorsSection /> */}
      {/* <BenefitsSection /> */}
      <FeaturesSection />
      <TestimonialSection />
      <TeamSection />
      {/* <PricingSection /> */}
      <ContactSection />
      <FAQSection />
    </div>
  )
}
