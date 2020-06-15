import React from "react";
import { graphql } from "gatsby";
import Helmet from "react-helmet";
import get from "lodash/get";
import Img from "gatsby-image";
import Layout from "../components/layout";
import { useStyletron } from "styletron-react";

  export default (props) => {
    const post = get(props, "data.contentfulBlogPost");
    const siteTitle = get(props, "data.site.siteMetadata.title");
    const [css] = useStyletron()

    return (
      <Layout location={props.location}>
        <section id="post" className={css({
          paddingTop: '3em',
          minHeight: '100vh',
          color: '#222',
          backgroundColor: '#ddd'
          })}>
          <Helmet title={`${post.title} | ${siteTitle}`} />
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
              dangerouslySetInnerHTML={{
                __html: post.body.childMarkdownRemark.html,
              }}
            />
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
