import { useStaticQuery, graphql } from "gatsby"

export default () => {
  const { allContentfulPerson } = useStaticQuery(
    graphql`
      query GetAuthor {
        allContentfulPerson {
          edges {
            node {
              name
              github
            }
          }
        }
      }
    `
  )
  return allContentfulPerson.edges[0].node
}