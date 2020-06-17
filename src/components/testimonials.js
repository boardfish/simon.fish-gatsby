import React from "react";
import useSiteMetadata from "../hooks/use-site-metadata";
import tinycolor from 'tinycolor2'
import { useStyletron } from "styletron-react";
import { graphql } from "gatsby";
import { CardBody } from "reactstrap";

export default (props) => {
  const colors = useSiteMetadata("colors")
  const [css] = useStyletron()
  return (
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
        {props.data.map((testimonial, index) => (
          <a
            className={`card ${css({
              fontWeight: "normal",
              "@media (min-width: 768px)": {
                gridRow: index + 1,
                gridColumn: `${index % 2 === 0 ? 1 : 2} / span 2`,
              },
              transition: "transform .5s",
              ":hover": {
                color: "#039",
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
                className={css({
                  borderLeft: `.5em solid ${colors.primary}`,
                  paddingLeft: ".5em",
                })}
                dangerouslySetInnerHTML={{
                  __html: testimonial.node.text.childMarkdownRemark.html,
                }}
              ></div>
              <div
                className={css({
                  fontSize: ".8em",
                  textAlign: "right",
                })}
              >
                // {testimonial.node.author}, {testimonial.node.authorRole}
              </div>
            </CardBody>
          </a>
        ))}
      </div>
    </section>
  );
};

export const query = graphql`
query AllTestimonial {
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
`