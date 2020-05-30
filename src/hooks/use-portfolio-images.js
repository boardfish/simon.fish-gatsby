import { useStaticQuery, graphql } from "gatsby"

export default () => {
  const { allContentfulPortfolioItem } = useStaticQuery(
    graphql`
      query GetPortfolioImages {
        allContentfulPortfolioItem {
          edges {
            node {
              images {
                fluid {
                  sizes
                  src
                  srcSet
                  srcWebp
                  srcSetWebp
                  tracedSVG
                  base64
                  aspectRatio
                }
              }
            }
          }
        }
      }
    `
  )
  return allContentfulPortfolioItem.edges.map(({ node }) => node.images).filter(images => images).flat()
}