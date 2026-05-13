import SEO from "../../Utils/SEO";
import AboutCTA from "./AboutCTA";
import AboutHero from "./AboutHero";
import ExperienceTimeline from "./ExperienceTimeline";
import MyPhilosophy from "./MyPhilosophy";
import SkillsToolkit from "./SkillsToolkit";

const About = () => {
  return (
    <div>
      <SEO
        title="My Creative Journey & Vision"
        description="Discover the story of Md Fuad Amir—a Junior MERN Developer and Creative Designer dedicated to turning concepts into visual realities."
        keywords="about fuad amir, creative designer profile, web development expert, visual storyteller"
        url="/about"
      />
      <AboutHero />
      <MyPhilosophy />
      <SkillsToolkit />
      <ExperienceTimeline />
      <AboutCTA />
    </div>
  );
};

export default About;
