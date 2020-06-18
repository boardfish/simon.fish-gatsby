import React from "react";
import Helmet from "react-helmet";
import { useStaticQuery } from "gatsby";

export default (props) => {
  const data = useStaticQuery(
    graphql`
      query GetHelmetMetadata {
        contentfulSocialLink(platform: {name: {eq: "Twitter"}}) {
          link
        }
        site {
          siteMetadata {
            colors {
              primary
            }
            title
            description
          }
        }
      }
    `
  );
  return (
    <Helmet {...props}>
      {props.children}
      {/* General tags */}
      <title>{data.site.siteMetadata.title}</title>
      <meta name="description" content={data.site.siteMetadata.description} />
      {/* <meta name="image" content={image} /> */}

      {/* OpenGraph tags */}
      <meta property="og:url" content={data.site.siteMetadata.siteUrl} />
      {/* {isBlogPost ? <meta property="og:type" content="article" /> : null} */}
      <meta property="og:title" content={data.site.siteMetadata.title} />
      <meta property="og:description" content={data.site.siteMetadata.description} />
      {/* <meta property="og:image" content={image} /> */}

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={data.contentfulSocialLink.link} />
      <meta name="twitter:title" content={data.site.siteMetadata.title} />
      <meta name="twitter:description" content={data.site.siteMetadata.description} />
      {/* <meta name="twitter:image" content={image} /> */}
      <script type="application/ld+json">
        {`
        {
          "@context": "https://schema.org",
          "@type": "Person",
          "url": "https://simon.fish",
          "email": "si@mon.fish",
          "familyName": "Fish",
          "givenName": "Simon",
          "gender": "GenderType::Male"
        }
      `}
      </script>
    </Helmet>
  );
};
