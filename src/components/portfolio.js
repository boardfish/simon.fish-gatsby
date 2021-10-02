import React, { useState } from "react";
import { useStyletron } from "styletron-react";
import tinycolor from 'tinycolor2'
import useColors from "../hooks/use-colors";
import { Link } from "gatsby";

export default ({ data, backgroundColor, color, darkenAmount }) => {
  const [css] = useStyletron()
  const [techIndicator, setTechIndicator] = useState({ id: null, text: null, timeout: null });
  const { bgColor, fgColor } = useColors({ color, backgroundColor, darkenAmount })
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
        "@media (min-width: 1024px": {
          gridTemplateColumns: "50% 50%",
        },
        "@media (min-width: 992px": {
          gridTemplateColumns: "33% 33% auto",
        },
      })}
    >
      <div
        className={`${css({
          "@media (min-width: 1024px": {
            gridColumn: "1 / span 2",
          },
          "@media (min-width: 992px": {
            gridColumn: "1 / span 3",
          },
        })}`}
      >
        <h2 className={css({ color: fgColor })}>Portfolio</h2>
        <p className={`lead ${css({ color: fgColor })}`}>
          Here are some examples of what I've been up to. You might also want to
          check out my <a href="https://github.com/boardfish">GitHub profile</a>.
        </p>
      </div>
      <div className={`portfolio-card`}>
          <h4 className="card-header">Key Projects</h4>
          <ul
            className={`list-group list-group-flush ${css({
              color: "black",
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
            })}`}
          >
            {data["Key Projects"].map((item) => (
                <Link
                  to={`/portfolio/${item.node.id}`}
                  className={`list-group-item ${css({
                    color: "#222",
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  transition: ".2s transform",
                  ":hover": {
                    color: "#222 !important",
                    backgroundColor: "#ccc",
                    transform: "translateX(.5em)",
                      textDecoration: "none",
                      color: "#039",
                  },
                  })}`}
                >
                <div className={css({
                    display: "flex",
                    width: "100%",
                    flexDirection: "column",
                    justifyContent: "center",
                    marginBottom: ".5em",
                    "@media (min-width: 992px": {
                      flexDirection: "row",
                      alignItems: "center",
                    },
                })}>
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
                </div>
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
                <p className={css({ marginBottom: 0, fontWeight: 'normal',  })}>{item.node.summary}</p>
                </Link>
            ))}
          </ul>
        </div>
      {Object.entries(data).map(([category, items]) => (
        category === "Key Projects" ? '' :
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
                <Link
                  to={`/portfolio/${item.node.id}`}
                  className={`list-group-item ${css({
                    color: "#222",
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  transition: ".2s transform",
                  ":hover": {
                    color: "#222 !important",
                    backgroundColor: "#ccc",
                    transform: "translateX(.5em)",
                      textDecoration: "none",
                      color: "#039",
                  },
                  })}`}
                >
                <div className={css({
                    display: "flex",
                    width: "100%",
                    flexDirection: "column",
                    justifyContent: "center",
                    marginBottom: ".5em",
                    "@media (min-width: 992px": {
                      flexDirection: "row",
                      alignItems: "center",
                    },
                })}>
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
                </div>
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
                <p className={css({ marginBottom: 0, fontWeight: 'normal',  })}>{item.node.summary}</p>
                </Link>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
};
