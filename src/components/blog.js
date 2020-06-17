import React from "react";
import { useStyletron } from "styletron-react";
import ArticlePreview from "../components/article-preview";

export default ({ data, backgroundColor, color }) => {
  const [css] = useStyletron()
  return (
    <section
      id="blog"
      className={css({
        backgroundColor,
        minHeight: "100%",
        paddingTop: "1em",
      })}
    >
      <h2 className={css({ color: color })}>Blog</h2>
      <p className={`lead ${css({ color: color })}`}>
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
