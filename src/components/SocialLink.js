import React from "react";
import { useStyletron } from "styletron-react";
import useColors from "../hooks/use-colors";
import { ReactSVG } from "react-svg";

export default ({ node, backgroundColor, color, darkenAmount }) => {
  const [css] = useStyletron();
  const { bgColor, fgColor } = useColors({
    backgroundColor: node.platform.color,
    color,
    darkenAmount,
  });
  return (
    <a
      href={`${node.platform.linkPrefix}${node.link}`}
      target="_blank"
      rel="noopener noreferrer"
      className={css({
        backgroundColor: bgColor,
        color: fgColor,
        padding: "1rem",
        borderRadius: ".5rem",
        alignItems: "center",
        display: 'inline-block',
      })}
    >
      {typeof node.platform.icon === 'undefined' ? '' : <ReactSVG
        className={css({ display: "inline-block" })}
        src={node.platform.icon.file.url}
        beforeInjection={(svg) => {
          var classes = css({
            height: "3rem",
            width: "3rem",
            padding: ".1em .25em",
            marginRight: ".25em",
            display: "inline",
          }).split(" ");
          console.log(classes);
          svg.classList.add(...classes);
        }}
        wrapper="span"
      />}

      {node.platform.name}
      <small className={css({ marginLeft: "1em" })}>{node.link}</small>
    </a>
  );
};
