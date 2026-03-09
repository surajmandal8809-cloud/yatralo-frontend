import HeroSection from "../components/HeroSection/HeroSection";
import DestinationSection from "../components/Destination/DestinationSection";
import BenefitSection from "../components/Benefits/BenefitSection";
import TestimonialSection from "../components/Testimonial/TestimonialSection";
import FAQSection from "../components/FAQ/FAQSection";
import SupportSection from "../components/Support/SupportSection";
import PopularServices from "../components/PopularServices/PopularServices";
import DealsPage from "../components/Deals/DealsPage";

const HomePage = () => {
  return (
    <>
        <main id="top">
        <HeroSection />
        <DestinationSection />
        <DealsPage/>
        <BenefitSection />
        <PopularServices/>
        <TestimonialSection />
        <FAQSection />
        <SupportSection />
      </main>

    </>
  );
};

export default HomePage;
