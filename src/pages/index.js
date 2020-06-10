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
import { CardBody } from "reactstrap";
import { ReactSVG } from "react-svg";

export default (props) => {
  const siteTitle = get(props, "data.site.siteMetadata.title");
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
        id="portfolio"
        className={css({
          backgroundColor: tinycolor(colors.primary).darken(6).toString(),
          minHeight: "100%",
          display: "grid",
          gridGap: "1em",
          paddingTop: "1em",
          paddingBottom: "1em",
          gridTemplateColumns: "auto",
          "@media (min-width: 768px": {
            gridTemplateColumns: "33% 33% auto",
          },
        })}
      >
        <div
          className={`${css({
            "@media (min-width: 768px": {
              gridColumn: "1 / span 3",
            },
          })}`}
        >
          <h2 className={`section-headline`}>Portfolio</h2>
          <p className="lead">
            Here are some examples of what I've been up to.
          </p>
        </div>
        {Object.entries(portfolio).map(([category, items]) => (
          <div className={`card`}>
            <h4 className="card-header">{category}</h4>
            <ul
              className={`list-group list-group-flush ${css({
                color: "black",
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
              })}`}
            >
              {items.map((item) => (
                <li
                  className={`list-group-item ${css({
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    transition: ".2s transform",
                    ":hover": {
                      backgroundColor: "#ccc",
                      transform: "translateX(.5em)",
                    },
                  })}`}
                >
                  <div
                    className={css({
                      display: "flex",
                      width: "100%",
                      alignItems: "center",
                      marginBottom: ".5em",
                    })}
                  >
                    <h5 className={css({ marginBottom: 0 })}>
                      {item.node.title}
                      <br />
                      <small className={css({ color: "#777" })}>
                        {item.node.projectName}
                      </small>
                    </h5>
                    <small className={css({ marginLeft: "auto" })}>
                      {item.node.date}
                    </small>
                  </div>
                  <div
                    className={css({ display: "flex", alignItems: "center" })}
                  >
                    {(item.node.tools || []).map((tool) => (
                      <ReactSVG
                        src={tool.icon.file.url}
                        beforeInjection={(svg) => {
                          var classes = css({
                            height: "1.5rem",
                            width: "auto",
                            backgroundColor: tool.color,
                            borderRadius: ".2em",
                            padding: ".1em .25em",
                            marginRight: ".25em",
                            display: "inline",
                            color: tinycolor(tool.color).isLight()
                              ? "black"
                              : "white",
                          }).split(" ");
                          console.log(classes);
                          svg.classList.add(...classes);
                        }}
                        wrapper="span"
                      />
                    ))}
                  </div>
                  <p className={css({ marginBottom: 0 })}>
                    {item.node.summary}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ))}
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
    allContentfulPortfolioItem(sort: { fields: [endDate, date], order: DESC }) {
      edges {
        node {
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
