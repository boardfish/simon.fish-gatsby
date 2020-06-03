import React from "react";
import { graphql } from "gatsby";
import Img from "gatsby-image";
import get from "lodash/get";
import Helmet from "react-helmet";
import Hero from "../components/hero";
import Layout from "../components/layout";
import ArticlePreview from "../components/article-preview";
import tinycolor from "tinycolor2";
import { useStyletron } from "styletron-react";
import useSiteMetadata from "../hooks/use-site-metadata";

export default (props) => {
  const siteTitle = get(props, "data.site.siteMetadata.title");
  const posts = get(props, "data.allContentfulBlogPost.edges");
  const [author] = get(props, "data.allContentfulPerson.edges");
  const [css] = useStyletron();
  const colors = useSiteMetadata("colors");

  return (
    <Layout location={props.location}>
      <Helmet title={siteTitle} />
      <Hero data={author.node} />
      <section
        id="about"
        className={css({
          backgroundColor: tinycolor(colors.primary).darken(4).toString(),
          height: "100%",
          paddingTop: "3em",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          "@media (min-width: 768px)": {
            display: "grid",
            gridTemplateColumns: "35% auto",
            gridGap: "1em",
          },
        })}
      >
        <div
          dangerouslySetInnerHTML={{
            __html: author.node.longBio.childMarkdownRemark.html,
          }}
        ></div>
        <Img fixed={author.node.heroImage.fixed} />
      </section>
      <section
        id="blog"
        className={css({
          backgroundColor: tinycolor(colors.primary).darken(5).toString(),
          height: "100%",
        })}
      >
        <h2 className="section-headline">My posts</h2>
        <ul className="article-list card-deck list-unstyled">
          {posts.map(({ node }) => {
            return <ArticlePreview article={node} key={node.slug} />;
          })}
        </ul>
      </section>
    </Layout>
  );
};

export const pageQuery = graphql`
  query HomeQuery {
    allContentfulBlogPost(sort: { fields: [publishDate], order: DESC }) {
      edges {
        node {
          title
          slug
          publishDate(formatString: "MMMM Do, YYYY")
          tags
          heroImage {
            fluid(maxWidth: 350, maxHeight: 196, resizingBehavior: SCALE) {
              ...GatsbyContentfulFluid_tracedSVG
            }
          }
          description {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
    allContentfulPerson(
      filter: { contentful_id: { eq: "15jwOBqpxqSAOy2eOO4S0m" } }
    ) {
      edges {
        node {
          name
          tagline {
            childMarkdownRemark {
              html
            }
          }
          shortBio {
            childMarkdownRemark {
              html
            }
          }
          longBio {
            childMarkdownRemark {
              html
            }
          }
          title
          heroImage: image {
            fixed(width: 400, height: 400) {
              ...GatsbyContentfulFixed_tracedSVG
            }
          }
        }
      }
    }
  }
`;
