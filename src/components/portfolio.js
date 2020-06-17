import React, { useState } from "react";
import { useStyletron } from "styletron-react";
import tinycolor from 'tinycolor2'
import useSiteMetadata from "../hooks/use-site-metadata";
import { Link } from "gatsby";

export default ({ data, backgroundColor, color }) => {
  const [css] = useStyletron()
  const colors = useSiteMetadata("colors")
  const [techIndicator, setTechIndicator] = useState({ id: null, text: null, timeout: null });
  const bgColor = backgroundColor || tinycolor(colors.primary).darken(6).toString()
  const fgColor = color || (tinycolor(bgColor).isLight() ? "black" : "white")
  return (
    <section
      id="portfolio"
      className={css({
        backgroundColor: bgColor,
        minHeight: "100%",
        display: "grid",
        gridGap: "1em",
        paddingTop: "1em",
        paddingBottom: "1em",
        gridTemplateColumns: "auto",
        "@media (min-width: 768px": {
          gridTemplateColumns: "50% 50%",
        },
        "@media (min-width: 992px": {
          gridTemplateColumns: "33% 33% auto",
        },
      })}
    >
      <div
        className={`${css({
          "@media (min-width: 768px": {
            gridColumn: "1 / span 2",
          },
          "@media (min-width: 992px": {
            gridColumn: "1 / span 3",
          },
        })}`}
      >
        <h2 className={css({ color: fgColor })}>Portfolio</h2>
        <p className={`lead ${css({ color: fgColor })}`}>Here are some examples of what I've been up to.</p>
      </div>
      {Object.entries(data).map(([category, items]) => (
        <div className={`portfolio-card`}>
          <h4 className="card-header">{category}</h4>
          <ul
            className={`list-group list-group-flush ${css({
              color: "black",
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
            })}`}
          >
            {items.map((item) => (
              <li
                className={`list-group-item ${css({
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  transition: ".2s transform",
                  ":hover": {
                    backgroundColor: "#ccc",
                    transform: "translateX(.5em)",
                  },
                })}`}
              >
                <Link
                  to={`/portfolio/${item.node.id}`}
                  className={css({
                    color: "#222",
                    ":hover": {
                      textDecoration: "none",
                      color: "#039",
                    },
                    display: "flex",
                    width: "100%",
                    flexDirection: "column",
                    justifyContent: "center",
                    marginBottom: ".5em",
                    "@media (min-width: 992px": {
                      flexDirection: "row",
                      alignItems: "center",
                    },
                  })}
                >
                  <h5
                    className={css({
                      marginBottom: 0,
                      flexBasis: "75%",
                    })}
                  >
                    {item.node.title}
                    <br />
                    <small className={css({ color: "#777" })}>
                      {item.node.projectName}
                    </small>
                  </h5>
                  <small className={css({ marginLeft: "auto" })}>
                    {item.node.date}
                  </small>
                </Link>
                <div
                  className={css({
                    display: "flex",
                    flexDirection: "column",
                  })}
                >
                  <p
                    className={css({
                      width: "100%",
                      display:
                        techIndicator.id === item.node.id ? "block" : "none",
                      marginBottom: 0,
                      backgroundColor: techIndicator.color,
                      color: tinycolor(techIndicator.color).isLight()
                        ? "#222"
                        : "#ddd",
                      transition: ".2s color, .2s background-color",
                      borderRadius: ".5em .5em 0 0",
                      textAlign: "center",
                    })}
                  >
                    {techIndicator.text}
                  </p>
                  <div
                    className={css({
                      display: "flex",
                      alignItems: "center",
                      overflowY: "auto",
                      width: "100%",
                      borderRadius:
                        techIndicator.id === item.node.id
                          ? " 0 0 .5em .5em"
                          : 0,
                    })}
                  >
                    {(item.node.tools || []).map((tool) => {
                      return (
                        <hr
                          className={css({
                            flexBasis: "2em",
                            height: ".5em",
                            backgroundColor: tool.color || "#ddd",
                            margin: 0,
                            padding:
                              techIndicator.id === item.node.id ? ".5em 0" : 0,
                            transition: ".2s all",
                          })}
                          onMouseOver={() => {
                            clearTimeout(techIndicator.timeout);
                            setTechIndicator({
                              id: item.node.id,
                              text: tool.name,
                              color: tool.color || "#ddd",
                            });
                          }}
                          onMouseOut={() => {
                            setTechIndicator((prevState) => ({
                              ...prevState,
                              timeout: setTimeout(
                                () =>
                                  setTechIndicator({ id: null, text: null }),
                                5000
                              ),
                            }));
                          }}
                        />
                      );
                    })}
                  </div>
                </div>
                <p className={css({ marginBottom: 0 })}>{item.node.summary}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
};
