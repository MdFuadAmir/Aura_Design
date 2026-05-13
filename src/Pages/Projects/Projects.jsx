import ProjectGrid from "./ProjectGrid";
import ProjectsHero from "./ProjectsHero";
import NextChapterCTA from "./NextChapterCTA";
import SEO from "../../Utils/SEO";

const Projects = () => {
  return (
    <div>
      <SEO
        title="Gallery of Visual Excellence"
        description="Explore a curated showcase of luxury websites, brand guidelines, and graphics design projects built with precision and passion."
        keywords="graphics design portfolio, web development projects, react portfolio, visual design showcase"
        url="/project"
      />
      <ProjectsHero />
      <ProjectGrid />
      <NextChapterCTA />
    </div>
  );
};

export default Projects;
