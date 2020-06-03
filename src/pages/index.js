import React from "react";
import { graphql } from "gatsby";
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
        })}
      >
        <h2
          className={css({
            fontWeight: "bold",
            gridColumn: 1,
            fontSize: "2rem",
            "@media (min-width: 768px)": {
              fontSize: "4rem",
            },
          })}
        >
          Hi, I'm Simon.
        </h2>
        <p>
          I'm a <b>software engineer</b> with a{" "}
          <b>year of industry experience</b> and a{" "}
          <b>Computer Science degree</b>.
        </p>
        <p>I'm motivated to:</p>
        <ul>
          <li>
            support <b>free and open source software</b>
          </li>
          <li>
            <b>learn</b> new things, and use those findings to{" "}
            <b>teach and empower others</b>
          </li>
          <li>
            make a <b>positive difference to the world</b> through technology
          </li>
        </ul>
        <p>
          I'm determined to stick to these principles and use my power as a
          force for good.
        </p>
        <p>
          Most of my experience lies with <b>Ruby</b> and <b>React.JS</b>, but I
          have supporting experience in <b>Node.JS</b> and <b>Python</b>. I'm a
          fast learner, so I'm equally ready to learn new tools.
        </p>
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
          shortBio {
            shortBio
          }
          title
          heroImage: image {
            fluid(
              maxWidth: 1180
              maxHeight: 480
              resizingBehavior: PAD
              background: "rgb:000000"
            ) {
              ...GatsbyContentfulFluid_tracedSVG
            }
          }
        }
      }
    }
  }
`;
