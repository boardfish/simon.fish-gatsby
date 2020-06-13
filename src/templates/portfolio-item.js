import React from "react";
import { graphql } from "gatsby";
import Img from "gatsby-image";
import Helmet from "react-helmet";
import get from "lodash/get";
import Layout from "../components/layout";
import { useStyletron } from "styletron-react";
import { ReactSVG } from "react-svg";
import tinycolor from "tinycolor2";

export default (props) => {
  const [css] = useStyletron();
  const item = get(props, "data.contentfulPortfolioItem");
  const siteTitle = get(props, "data.site.siteMetadata.title");

  return (
    <Layout location={props.location}>
      <Helmet title={`${item.title} | ${siteTitle}`} />
      <div
        className={css({
          minHeight: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        })}
      >
        <h1 className="section-headline">{item.title}</h1>
        {(item.images || []).map((image) => (
          <div className={css({ height: "40vh" })}>
            <Img
              fluid={image.fluid}
              imgStyle={{ objectFit: "contain" }}
              className={css({ height: "100%" })}
            />
          </div>
        ))}
        <p>
          {item.date}
          {item.year === item.endYear ? "" : ` ${item.year}`}
          {item.endDate ? `-${item.endDate} ` : " "}
          {item.endYear}
        </p>
        <p className={css({ display: "flex" })}>
          {(item.tools || []).map((tool) => {
            if (tool.icon) {
              return (
                <ReactSVG
                  className={css({ display: "block" })}
                  src={tool.icon.file.url}
                  beforeInjection={(svg) => {
                    var classes = css({
                      height: "1.5rem",
                      width: "auto",
                      backgroundColor: tool.color,
                      borderRadius: ".2em",
                      padding: ".1em .25em",
                      marginRight: ".25em",
                      display: "inline",
                      color: tinycolor(tool.color).isLight()
                        ? "black"
                        : "white",
                    }).split(" ");
                    console.log(classes);
                    svg.classList.add(...classes);
                  }}
                  wrapper="span"
                />
              );
            } else {
              return (
                <span
                  className={css({
                    height: "1.5rem",
                    width: "auto",
                    backgroundColor: tool.color || "#ddd",
                    borderRadius: ".2em",
                    padding: ".1em .25em",
                    marginRight: ".25em",
                    display: "inline",
                    color: tinycolor(tool.color || "#ddd").isLight()
                      ? "black"
                      : "white",
                  })}
                >
                  {tool.name}
                </span>
              );
            }
          })}
        </p>
        <div
          dangerouslySetInnerHTML={{
            __html: item.description.childMarkdownRemark.html,
          }}
        />
      </div>
    </Layout>
  );
};

export const pageQuery = graphql`
  query PortfolioItemById($id: String!) {
    contentfulPortfolioItem(id: { eq: $id }) {
      title
      date(formatString: "Do MMMM")
      endDate(formatString: "Do MMMM")
      year: date(formatString: "'YY")
      endYear: endDate(formatString: "'YY")
      images {
        fluid(maxHeight: 500) {
          ...GatsbyContentfulFluid
        }
      }
      description {
        childMarkdownRemark {
          html
        }
      }
      tools {
        icon {
          file {
            url
          }
        }
        color
        name
      }
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`;
