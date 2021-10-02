import React from "react";
import useSiteMetadata from "../hooks/use-site-metadata";
import useColors from "../hooks/use-colors";
import { autoComposeDeep, useStyletron } from "styletron-react";
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
        paddingBottom: "5em",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
      })}
    >
      <div className={css({
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
      })}>
      <h2>Testimonials</h2>
      <p className="lead">Don't just take it from me - here's what others have to say.</p>
      <div
        className={css({
          justifyItems: "center",
          alignItems: "center",
          display: "grid",
          gridTemplateColumns: "auto",
          gridTemplateRows: "auto",
          "@media (min-width: 1024px)": {
            gridTemplateColumns: "50% 50%",
            gridTemplateRows: "auto auto",
            marginBottom: "3em"
          },
        })}
      >
        {data.map((testimonial, index) => (
          <a
            className={`card ${css({
              maxWidth: '65ch',
              fontWeight: "normal",
              transform: "rotateX(-15deg) rotateY(15deg)",
              boxShadow: ".5em .5em 0.2em 0.2em rgba($gray-700, 0.4)",
              "@media (min-width: 1024px)": {
                transform: `rotateX(-15deg) rotateY(15deg)${index % 2 !== 0 ? '' : ' translateY(1.25rem)'}`
              },
              transition: "transform .5s",
              ":hover": {
                color: "#039",
                textDecoration: "none",
                transform: `rotateX(-15deg) rotateY(15deg) translateY(${index % 2 !== 0 ? '-0.5' : '1.5'}em)`
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
                  marginTop: "2em",
                  marginBottom: "0.5em",
                  transform: "rotateX(15deg) rotateY(15deg)",
                  boxShadow: ".5em .5em 0.2em 0.2em rgba($gray-700, 0.4)",
                })}
                dangerouslySetInnerHTML={{
                  __html: testimonial.node.text.childMarkdownRemark.html,
                }}
              ></div>
              <div>
                <div
                  className={css({
                    display: "inline-block",
                    background: bgColor,
                    color: 'white',
                    fontSize: ".8em",
                    marginLeft: "auto",
                    padding: "1em"
                  })}
                >
                  // {testimonial.node.author}, {testimonial.node.authorRole}
                </div>
              </div>
            </CardBody>
          </a>
        ))}
      </div>
      <a href="#contact" className={css({
        background: fgColor,
        color: bgColor,
        padding: " 0.5rem 1rem",
        alignSelf: "start",
        borderRadius: "0.25rem",
        fontWeight: "normal",
        marginTop: "3em",
        "@media (min-width: 1024px)": {
          marginTop: "0"
        }
      })}>
        Sold? Get in touch!
      </a>
      </div>
    </section>
  );
};
