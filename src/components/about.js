import React from "react";
import useSiteMetadata from "../hooks/use-site-metadata";
import { useStyletron } from "styletron-react";
import tinycolor from "tinycolor2"
import Img from "gatsby-image";

export default ({ data, backgroundColor, color }) => {
  const [css] = useStyletron()
  const colors = useSiteMetadata("colors")
  const bgColor = backgroundColor || tinycolor(colors.primary).darken(4).toString()
  const fgColor = color || (tinycolor(bgColor).isLight() ? "black" : "white")
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
        "@media (min-width: 992px)": {
          display: "grid",
          gridTemplateColumns: "auto auto",
          gridGap: "1em",
        },
      })}
    >
      <div
        dangerouslySetInnerHTML={{
          __html: data.longBio.childMarkdownRemark.html,
        }}
      ></div>
      <Img fixed={data.heroImage.fixed} />
    </section>
  );
};
