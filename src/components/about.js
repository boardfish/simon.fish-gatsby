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
