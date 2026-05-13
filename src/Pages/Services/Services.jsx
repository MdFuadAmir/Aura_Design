import { useEffect } from "react";
import CoreServices from "./CoreServices";
import ProcessWorkflow from "./ProcessWorkflow";
import ServicesHero from "./ServicesHero";
import WhyChooseMe from "./WhyChooseMe";
import SEO from "../../Utils/SEO";

const Services = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, []);
  return (
    <div>
      <SEO
        title="Premium Design & Development Services"
        description="From minimalist Brand Identities and Ad Creatives to Full-stack Admin Dashboards. Explore visual solutions tailored for modern brands."
        keywords="brand identity services, custom web development, ad creative design, ui/ux design services, mern stack solutions"
        url="/services"
      />
      <ServicesHero />
      <CoreServices />
      <ProcessWorkflow />
      <WhyChooseMe />
    </div>
  );
};

export default Services;
