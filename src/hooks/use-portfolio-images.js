import { useStaticQuery, graphql } from "gatsby";

export default () => {
  const { allContentfulPortfolioItem } = useStaticQuery(
    graphql`
      query GetPortfolioImages {
        allContentfulPortfolioItem(
          filter: { includeInHero: { eq: true } }
          sort: { fields: date, order: DESC }
        ) {
          edges {
            ...portfolioImage
          }
        }
      }
    `
  );
  return [].concat(...allContentfulPortfolioItem.edges
    .map(({ node }) => node.images)
    .filter((images) => images)
  )
};
