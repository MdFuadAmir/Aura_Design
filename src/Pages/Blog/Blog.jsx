import SEO from "../../Utils/SEO";
import ArticleGrid from "./ArticleGrid";
import BlogHero from "./BlogHero";
import Newsletter from "./Newsletter";

const Blog = () => {
  return (
    <div>
      <SEO
        title="Insights on Tech & Design Trends"
        description="Stay updated with the latest trends in MERN Stack, UI/UX principles, and graphic design strategies for modern digital growth."
        keywords="web design blog, graphics design tips, mern stack tutorials, tech insights"
        url="/blog"
      />
      <BlogHero />
      <ArticleGrid />
      <Newsletter />
    </div>
  );
};

export default Blog;
