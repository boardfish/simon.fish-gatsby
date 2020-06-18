import React from "react";
import { graphql } from "gatsby";
import get from "lodash/get";
import Helmet from "../components/helmet";
import Hero from "../components/hero";
import Layout from "../components/layout";
import useSiteMetadata from "../hooks/use-site-metadata";
import Testimonials from '../components/testimonials'
import Portfolio from '../components/portfolio'
import About from "../components/about";
import Blog from "../components/blog";
import Contact from '../components/contact'

export default (props) => {
  const blog = get(props, "data.allContentfulBlogPost.edges");
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
  const { title, helmet } = useSiteMetadata();

  return (
    <Layout location={props.location}>
      <Helmet title={title} {...helmet} />
      <Hero data={author.node} darkenAmount={10} />
      <About data={author.node} darkenAmount={8} />
      <Testimonials data={testimonials} darkenAmount={6} />
      <Portfolio data={portfolio} darkenAmount={4} />
      <Blog data={blog} darkenAmount={2} />
      <Contact data={props.data.allContentfulSocialLink.edges} />
    </Layout>
  );
};

export const pageQuery = graphql`
  query HomeQuery {
    allContentfulSocialLink {
      edges {
        node {
          link
          platform {
            color
            name
            linkPrefix
            icon {
              file {
                url
              }
            }
          }
        }
      }
    }
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
    allContentfulTestimonial(sort: {fields: id, order: DESC}) {
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
