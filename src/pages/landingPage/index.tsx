import Navbar_ from "../../components/layout/navbar";
import Home from "./home";
import ProblemSection from "./sections/ProblemSection";
import SolutionSection from "./sections/SolutionSection";
import EcosystemSection from "./sections/EcosystemSection";
import FeaturesSection from "./sections/FeaturesSection";
import MarketSection from "./sections/MarketSection";
import OfferSection from "./sections/OfferSection";
import TeamSection from "./sections/TeamSection";
import FaqSection from "./sections/FaqSection";
import Contact from "./contact";

export default function LandingPage() {
  return (
    <div className="selection:bg-[#216604] selection:text-white">
      <Navbar_ />
      <main>
        <div id="home">
          <Home />
        </div>
        <ProblemSection />
        <SolutionSection />
        <EcosystemSection />
        <FeaturesSection />
        <MarketSection />
        <OfferSection />
        {/* <TeamSection /> */}
        <FaqSection />
        <div id="contact">
          <Contact />
        </div>
      </main>
    </div>
  );
}
