import React from "react";
import useSiteMetadata from "../hooks/use-site-metadata";
import useColors from "../hooks/use-colors";
import { useStyletron } from "styletron-react";
import { CardBody } from "reactstrap";

export default ({ data, backgroundColor, color, darkenAmount }) => {
  const colors = useSiteMetadata("colors")
  const [css] = useStyletron()
  const { bgColor, fgColor } = useColors({ color, backgroundColor, darkenAmount })
  return (
    <section
      id="testimonials"
      className={css({
        backgroundColor: bgColor,
        color: fgColor,
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
        {data.map((testimonial, index) => (
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