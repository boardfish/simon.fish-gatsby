import React from "react";
import { graphql } from "gatsby";
import Helmet from "react-helmet";
import get from "lodash/get";
import Img from "gatsby-image";
import Layout from "../components/layout";

class PortfolioItemTemplate extends React.Component {
  render() {
    const item = get(this.props, "data.contentfulPortfolioItem");
    const siteTitle = get(this.props, "data.site.siteMetadata.title");

    return (
      <Layout location={this.props.location}>
        <div>
          <Helmet title={`${item.title} | ${siteTitle}`} />
          <div>
            {/* <Img alt={item.title} fluid={item.images.fluid} /> */}
          </div>
          <div className="wrapper">
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
        </div>
      </Layout>
    );
  }
}

export default PortfolioItemTemplate;

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
  }
`;
