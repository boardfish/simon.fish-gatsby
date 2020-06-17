import React from "react";
import { useStyletron } from "styletron-react";
import ArticlePreview from "../components/article-preview";
import tinycolor from 'tinycolor2'

export default ({ data, backgroundColor, color }) => {
  const [css] = useStyletron()
  const bgColor = backgroundColor || "#ddd"
  const fgColor = color || (tinycolor(bgColor).isLight() ? "black" : "white")
  return (
    <section
      id="blog"
      className={css({
        backgroundColor: bgColor,
        minHeight: "100%",
        paddingTop: "1em",
      })}
    >
      <h2 className={css({ color: fgColor })}>Blog</h2>
      <p className={`lead ${css({ color: fgColor })}`}>
        Here, I'll be writing about things I've done and learned.
      </p>
      <ul className="article-list card-deck list-unstyled">
        {data.map(({ node }) => {
          return (
            <ArticlePreview
              article={node}
              key={node.slug}
              className={css({ margin: 0, color: color })}
            />
          );
        })}
      </ul>
    </section>
  );
};
