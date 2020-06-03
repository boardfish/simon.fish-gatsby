import React from "react";
import Img from "gatsby-image";
import { graphql } from "gatsby";
import usePortfolioImages from "../hooks/use-portfolio-images";
import { useStyletron } from "styletron-react";

export default ({ data, id = "hero" }) => {
  const images = usePortfolioImages();
  const [css] = useStyletron();
  return (
    <section
      id={id}
      className={css({
        "@media (min-width: 768px)": {
          display: "grid",
          gridTemplateColumns: "75% auto",
          alignItems: "center",
          height: "100vh",
        },
      })}
    >
      <div
        className={css({
          height: "100vh",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          "@media (min-width: 768px)": {
            margin: "0 3rem",
            width: "90%",
          },
        })}
      >
        <div
          dangerouslySetInnerHTML={{
            __html: data.tagline.childMarkdownRemark.html,
          }}
        ></div>
        <div
          className="lead"
          dangerouslySetInnerHTML={{
            __html: data.shortBio.childMarkdownRemark.html,
          }}
        ></div>
      </div>
      <div
        className={css({
          height: "inherit",
          overflowY: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        })}
      >
        {images.slice(0, 3).map((image) => (
          <Img
            fluid={image.fluid}
            aspectRatio={image.fluid.aspectRatio}
            className={css({
              transform: "rotateX(-15deg) rotateY(15deg)",
              boxShadow: ".5em .5em 0.2em 0.2em rgba($gray-700, 0.4)",
              marginBottom: "2em",
              width: "auto",
              height: "auto",
              animationDuration: "1s",
              animationTimingFunction: "ease-in-out",
              animationName: {
                from: {
                  transform: "translateY(2em) rotateX(0) rotateY(0deg)",
                  opacity: 0,
                },
                to: {
                  transform: "translateY(0) rotateX(-15deg) rotateY(15deg)",
                  opacity: 1,
                },
              },
            })}
            imgStyle={{ objectFit: "contain" }}
          />
        ))}
      </div>
    </section>
  );
};

export const query = graphql`
  fragment portfolioImage on ContentfulPortfolioItemEdge {
    node {
      images {
        fluid {
          sizes
          src
          srcSet
          srcWebp
          srcSetWebp
          tracedSVG
          base64
          aspectRatio
        }
      }
    }
  }
`;
