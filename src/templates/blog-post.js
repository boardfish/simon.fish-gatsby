import React from "react";
import { graphql, Link } from "gatsby";
import Helmet from "react-helmet";
import get from "lodash/get";
import Img from "gatsby-image";
import Layout from "../components/layout";
import { useStyletron } from "styletron-react";
import useSiteMetadata from "../hooks/use-site-metadata";

  export default (props) => {
    const post = get(props, "data.contentfulBlogPost");
    const { title, helmet } = useSiteMetadata();
    const [css] = useStyletron()

    return (
      <Layout location={props.location}>
        <section id="post" className={css({
          paddingTop: '3em',
          minHeight: '100vh',
          color: '#222',
          backgroundColor: '#ddd'
          })}>
          <Helmet title={`${post.title} | ${title}`} {...helmet} />
          <div>
            <Img alt={post.title} fluid={post.heroImage.fluid} />
          </div>
          <div>
            <h1 className={css({textAlign: "center"})}>{post.title}</h1>
            <p
              style={{
                display: "block",
                textAlign: 'center'
              }}
            >
              {post.publishDate}
            </p>
            <hr />
            <div
              className={css({ a: { color: "red" }})}
              dangerouslySetInnerHTML={{
                __html: post.body.childMarkdownRemark.html,
              }}
            />
            <hr />
            Thanks for reading. Want to head <Link to="/#blog">back to the blog?</Link>
          </div>
        </section>
      </Layout>
    );
  }


export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    contentfulBlogPost(slug: { eq: $slug }) {
      title
      publishDate(formatString: "MMMM Do, YYYY")
      heroImage {
        fluid(maxWidth: 1180, background: "rgb:000000") {
          ...GatsbyContentfulFluid_tracedSVG
        }
      }
      body {
        childMarkdownRemark {
          html
        }
      }
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`;
