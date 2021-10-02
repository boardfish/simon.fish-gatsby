import React from "react";
import useSiteMetadata from "../hooks/use-site-metadata";
import { useStyletron } from "styletron-react";
import useColors from "../hooks/use-colors"
import Img from "gatsby-image";

export default ({ data, backgroundColor, color, darkenAmount }) => {
  const [css] = useStyletron()
  const colors = useSiteMetadata("colors")
  const { bgColor, fgColor } = useColors({ color, backgroundColor, darkenAmount })
  return (
    <section
      id="about"
      className={css({
        backgroundColor: bgColor,
        color: fgColor,
        minHeight: "100%",
        paddingTop: "3em",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        "@media (min-width: 1024px)": {
          display: "grid",
          gridTemplateColumns: "auto auto",
          gridGap: "1em",
        },
      })}
    >
      <div>
        <div
          className={css({
            maxWidth: "65ch"
          })}
          dangerouslySetInnerHTML={{
            __html: data.longBio.childMarkdownRemark.html,
          }}
        ></div>
        <a href="#testimonials" className={css({
          background: fgColor,
          color: bgColor,
          padding: " 0.5rem 1rem",
          alignSelf: "start",
          borderRadius: "0.25rem",
          fontWeight: "normal"
        })}>
          What do other folks think?
        </a>
      </div>
      <div className={css({
        marginTop: "3em",
        "@media (min-width: 1024px)": {
          marginTop: "0"
        }
      })}>
        <Img fixed={data.heroImage.fixed} />
      </div>

    </section>
  );
};
