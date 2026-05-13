import SEO from "../../Utils/SEO";
import ContactForm from "./ContactForm";
import ContactHero from "./ContactHero";
import ContactInfo from "./ContactInfo";
import FAQ from "./FAQ";
import SocialConnect from "./SocialConnect";

const Contact = () => {
  return (
    <div>
      <SEO
        title="Start Your Creative Collaboration"
        description="Have a vision? Let’s bring it to life. Contact Aura Design Studio for professional web development and brand identity services."
        keywords="hire web developer, contact graphics designer, branding consultation, start a project"
        url="/contact"
      />
      <ContactHero />
      <ContactForm />
      <ContactInfo />
      <SocialConnect />
      <FAQ />
    </div>
  );
};

export default Contact;
