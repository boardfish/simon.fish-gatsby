import { useStaticQuery, graphql } from "gatsby";

export default (key) => {
  const { site } = useStaticQuery(
    graphql`
      query GetSiteMetadata {
        site {
          siteMetadata {
            colors {
              primary
            }
          }
        }
      }
    `
  );
  if (typeof key === "string") {
    return site.siteMetadata[key];
  } else {
    return site.siteMetadata;
  }
};
