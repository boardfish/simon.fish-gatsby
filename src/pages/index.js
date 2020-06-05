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
import { Card, CardBody } from "reactstrap";

export default (props) => {
  const siteTitle = get(props, "data.site.siteMetadata.title");
  const posts = get(props, "data.allContentfulBlogPost.edges");
  const [author] = get(props, "data.allContentfulPerson.edges");
  const testimonials = get(props, "data.allContentfulTestimonial.edges");
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
          minHeight: "100%",
          paddingTop: "3em",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          "@media (min-width: 768px)": {
            display: "grid",
            gridTemplateColumns: "auto auto",
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
        id="testimonials"
        className={css({
          backgroundColor: tinycolor(colors.primary).darken(5).toString(),
          minHeight: "100%",
          paddingTop: "1em",
          paddingBottom: "1em",
          display: "flex",
          flexDirection: "column",
        })}
      >
        <h2>Testimonials</h2>
        <p className="lead">Here's what folks I've worked with have to say.</p>
        <div
          className={css({
            flexGrow: 1,
            justifyContent: "center",
            alignItems: "center",
            display: "grid",
            gridGap: "1em",
            gridTemplateColumns: "auto",
            gridTemplateRows: "auto",
            "@media (min-width: 768px)": {
              gridTemplateColumns: "33% 33% auto",
              gridTemplateRows: "auto auto auto",
            },
          })}
        >
          {testimonials.map((testimonial, index) => (
            <a
              className={`card ${css({
                color: "white",
                "@media (min-width: 768px)": {
                  gridRow: index + 1,
                  gridColumn: `${index % 2 === 0 ? 1 : 2} / span 2`,
                },
                transition: "transform .5s",
                ":hover": {
                  color: "white",
                  textDecoration: "none",
                  transform: "translateY(-1em)",
                },
              })}`}
              href={
                testimonial.node.attachment
                  ? testimonial.node.attachment.file.url
                  : testimonial.node.link
              }
              target="blank"
              rel="noopener"
            >
              <CardBody>
                <div
                  dangerouslySetInnerHTML={{
                    __html: testimonial.node.text.childMarkdownRemark.html,
                  }}
                ></div>
                <div>
                  <small>
                    {testimonial.node.author}, {testimonial.node.authorRole}
                  </small>
                </div>
              </CardBody>
            </a>
          ))}
        </div>
      </section>
      <section
        id="blog"
        className={css({
          backgroundColor: tinycolor(colors.primary).darken(6).toString(),
          minHeight: "100%",
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
  }
`;
