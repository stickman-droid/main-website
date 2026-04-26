import { Hero } from "./hero";
import { GapSection } from "./gap-section";
import { OfferSection } from "./offer-section";
import { WorkSection } from "./work-section";
import { ContactSection } from "./contact-section";

export function HomePageView() {
  return (
    <div className="flex flex-col">
      <Hero />
      <GapSection />
      <OfferSection />
      <div className="lg:mt-24">
        <WorkSection />
      </div>
      <ContactSection />
    </div>
  );
}
