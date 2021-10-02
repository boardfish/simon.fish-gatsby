import React, { Fragment } from "react";
import { graphql } from "gatsby";
import get from "lodash/get";
import flat from "lodash/flatten"
import Helmet from "../components/helmet";
import Layout from "../components/layout";
import useSiteMetadata from "../hooks/use-site-metadata";
import { useStyletron } from "styletron-react";
import Portfolio from '../components/portfolio'

export default (props) => {
  const [css] = useStyletron();
  const groupBy = function (xs, key) {
    return xs.reduce(function (rv, x) {
      (rv[get(x, key)] = rv[get(x, key)] || []).push(x);
      return rv;
    }, {});
  };
  const portfolio = groupBy(
    get(props, "data.allContentfulPortfolioItem.edges"),
    "node.category"
  );
  const { title, helmet } = useSiteMetadata();

  return (
    <Layout location={props.location}>
      <Helmet title={title} {...helmet} />
      <main
        className={css({
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        })}
      >
        <Portfolio data={portfolio} />
      </main>
    </Layout>
  );
};

export const pageQuery = graphql`
  query PortfolioQuery {
    allContentfulPortfolioItem(sort: { fields: [priority, endDate, date], order: [DESC, DESC, DESC] }) {
      edges {
        node {
          id
          date(formatString: "MMM Do, 'YY")
          endDate(formatString: "MMM Do, 'YY")
          location
          projectName
          summary
          title
          category
          images {
            fluid {
              src
            }
          }
          tools {
            icon {
              file {
                url
              }
            }
            color
            name
          }
        }
      }
    }
  }
`;
