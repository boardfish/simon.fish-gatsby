import React from "react";
import { graphql } from "gatsby";
import Helmet from "react-helmet";
import get from "lodash/get";
import Layout from "../components/layout";
import { useStyletron } from "styletron-react";

export default (props) => {
  const [css] = useStyletron();
  const item = get(props, "data.contentfulPortfolioItem");
  const siteTitle = get(props, "data.site.siteMetadata.title");

  return (
    <Layout location={props.location}>
      <Helmet title={`${item.title} | ${siteTitle}`} />
      <div
        className={css({
          minHeight: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        })}
      >
        <h1 className="section-headline">{item.title}</h1>
        <p
          style={{
            display: "block",
          }}
        >
          {item.publishDate}
        </p>
        <div
          dangerouslySetInnerHTML={{
            __html: item.description.childMarkdownRemark.html,
          }}
        />
      </div>
    </Layout>
  );
};

export const pageQuery = graphql`
  query PortfolioItemById($id: String!) {
    contentfulPortfolioItem(id: { eq: $id }) {
      title
      images {
        fluid {
          ...GatsbyContentfulFluid_tracedSVG
        }
      }
      description {
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
