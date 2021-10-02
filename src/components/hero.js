import React from "react";
import Img from "gatsby-image";
import { graphql } from "gatsby";
import usePortfolioImages from "../hooks/use-portfolio-images";
import { useStyletron } from "styletron-react";
import useColors from "../hooks/use-colors";

export default ({ data, id = "hero", backgroundColor, color, darkenAmount }) => {
  const images = usePortfolioImages();
  const [css] = useStyletron();
  const { bgColor, fgColor } = useColors({ color, backgroundColor, darkenAmount })
  return (
    <section
      id={id}
      className={css({
        backgroundColor: bgColor,
        color: fgColor,
        "@media (min-width: 1024px)": {
          height: "100vh",
        },
        display: "grid",
        alignItems: "center"
      })}
    >
      <div className={css({

        "@media (min-width: 1024px)": {
          display: "grid",
          alignItems: "center",
        }
      })}>
      <div
        className={css({
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr'
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
      <div
        className={css({
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          "@media (min-width: 1024px)": {
            margin: "0 3rem",
            width: "90%",
          },
        })}
      >
        <div
          className={css({textAlign: "center"})}
          dangerouslySetInnerHTML={{
            __html: data.tagline.childMarkdownRemark.html,
          }}
        ></div>
        <div
          className={`lead ${css({maxWidth: '75ch', textAlign: "center"})}`}
          dangerouslySetInnerHTML={{
            __html: data.shortBio.childMarkdownRemark.html,
          }}
        ></div>
        <a href="#about" className={css({
          background: fgColor,
          color: bgColor,
          padding: " 0.5rem 1rem",
          borderRadius: "0.25rem",
          fontWeight: "normal"
        })}>
          👋 Say hi!
        </a>
      </div>

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
