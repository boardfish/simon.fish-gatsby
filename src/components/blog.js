import React from "react";
import { useStyletron } from "styletron-react";
import ArticlePreview from "../components/article-preview";
import useColors from '../hooks/use-colors'

export default ({ data, backgroundColor, color, darkenAmount }) => {
  const [css] = useStyletron()
  const { bgColor, fgColor } = useColors({ color, backgroundColor, darkenAmount }, { colorLight: "#222", colorDark: "#eee", backgroundColor: '#ddd' })
  return (
    <section
      id="blog"
      className={css({
        backgroundColor: bgColor,
        minHeight: "100%",
        paddingTop: "1em",
        paddingBottom: "1em"
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
