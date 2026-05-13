import HomeHero from "./HomeHero";
import Featured from "./Featured";
import HomeServices from "./HomeServices";
import AboutOverview from "./AboutOverview";
import WorkProcess from "./WorkProcess";
import Testimonials from "../Testmonials/Testmonials";
import LatestBlog from "./LatestBlog";
import Pricing from "./Pricing";
import SEO from "../../Utils/SEO";

const Home = () => {
  return (
    <div>
      <SEO
        title="Expert Web Developer & Visual Designer"
        description="Elevate your brand with Md Fuad Amir. Specialized in high-end Web Development and Strategic Graphic Design, blending aesthetics with functionality."
        keywords="graphics designer portfolio, mern stack developer, luxury ui design, brand identity designer, react developer bangladesh"
        url="/"
      />
      <HomeHero />
      <HomeServices />
      <AboutOverview />
      <Featured />
      <Pricing />
      <WorkProcess />
      <Testimonials />
      <LatestBlog />
    </div>
  );
};

export default Home;
