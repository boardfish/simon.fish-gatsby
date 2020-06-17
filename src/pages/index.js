import React, { useState } from "react";
import { graphql, Link } from "gatsby";
import get from "lodash/get";
import Helmet from "react-helmet";
import Hero from "../components/hero";
import Layout from "../components/layout";
import ArticlePreview from "../components/article-preview";
import tinycolor from "tinycolor2";
import { useStyletron } from "styletron-react";
import useSiteMetadata from "../hooks/use-site-metadata";
import Testimonials from '../components/testimonials'
import Portfolio from '../components/portfolio'
import { CardBody } from "reactstrap";
import { ReactSVG } from "react-svg";
import About from "../components/about";

export default (props) => {
  const posts = get(props, "data.allContentfulBlogPost.edges");
  const [author] = get(props, "data.allContentfulPerson.edges");
  const testimonials = get(props, "data.allContentfulTestimonial.edges");
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
  const [css] = useStyletron();
  const siteMetadata = useSiteMetadata()
  const siteTitle = get(siteMetadata, "title");
  const colors = get(siteMetadata, "colors");

  return (
    <Layout location={props.location}>
      <Helmet title={siteTitle} />
      <Hero data={author.node} />
      <About data={author.node} />
      <Testimonials data={testimonials} />
      <Portfolio data={portfolio} />
      <section
        id="blog"
        className={css({
          backgroundColor: "#ddd",
          minHeight: "100%",
          paddingTop: "1em",
        })}
      >
        <h2 className={css({ color: '#222'})}>Blog</h2>
        <p className={`lead ${css({ color: '#444'})}`}>Here, I'll be writing about things I've done and learned.</p>
        <ul className="article-list card-deck list-unstyled">
          {posts.map(({ node }) => {
            return <ArticlePreview article={node} key={node.slug} className={css({ margin: 0, color: '#222'})} />;
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
            fluid(quality: 60, resizingBehavior: FILL) {
              ...GatsbyContentfulFluid
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
    allContentfulPerson {
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
              ...GatsbyContentfulFixed
            }
          }
        }
      }
    }
    allContentfulTestimonial {
      edges {
        node {
          author
          authorRole
          link
          text {
            childMarkdownRemark {
              html
            }
          }
          attachment {
            file {
              url
            }
          }
        }
      }
    }
    allContentfulPortfolioItem(sort: { fields: [endDate, date], order: DESC }) {
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
