import React from "react";
import Helmet from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";

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
        contentfulPerson {
          image {
            file {
              details {
                image {
                  height
                  width
                }
              }
              url
            }
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
      <meta property="og:image" content={data.contentfulPerson.image.file.url} />
      <meta property="og:image:height" content={data.contentfulPerson.image.file.details.image.height} />
      <meta property="og:image:width" content={data.contentfulPerson.image.file.details.image.width} />

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={data.contentfulSocialLink.link} />
      <meta name="twitter:title" content={data.site.siteMetadata.title} />
      <meta name="twitter:description" content={data.site.siteMetadata.description} />
      <meta property="twitter:image" content={data.contentfulPerson.image.file.url} />
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
