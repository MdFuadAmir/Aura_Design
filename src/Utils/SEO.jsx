import { Helmet } from "react-helmet-async";

const SEO = ({ title, description, keywords, image, url }) => {
  const siteName = "Aura Design Studio";
  const defaultDesc =
    "Leading MERN Stack developer specializing in luxury UI/UX and scalable web solutions.";
  const siteUrl = "https://md-fuad-amir.web.app";

  return (
    <Helmet>
      {/* Basic Tags */}
      <title>{`${title} | ${siteName}`}</title>
      <meta name="description" content={description || defaultDesc} />
      <meta
        name="keywords"
        content={
          keywords ||
          "web developer, mern stack, react developer, luxury ui, fuad amir"
        }
      />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${siteUrl}${url}`} />
      <meta property="og:title" content={`${title} | ${siteName}`} />
      <meta property="og:description" content={description || defaultDesc} />
      <meta property="og:image" content={image || "/og-image.jpg"} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={`${title} | ${siteName}`} />
      <meta name="twitter:description" content={description || defaultDesc} />
      <meta name="twitter:image" content={image || "/og-image.jpg"} />

      <link rel="canonical" href={`${siteUrl}${url}`} />
    </Helmet>
  );
};

export default SEO;
