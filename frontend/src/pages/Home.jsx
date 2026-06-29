import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import SavingsCalculator from "../components/SavingsCalculator";
import FeatureSection from "../components/FeatureSection";
import StatsSection from "../components/StatsSection";
import EcoImpact from "../components/EcoImpact";
import TestimonialSection from "../components/TestimonialSection";
import Footer from "../components/Footer";
import CarBikeSection from "../components/CarBikeSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <FeatureSection />
      <StatsSection />
      <EcoImpact />
      <TestimonialSection />
      <Footer />
    </>
  );
}