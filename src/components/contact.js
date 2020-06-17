import React from "react";
import SocialLinkGroup from "./SocialLinkGroup";
import { useStyletron } from "styletron-react";
import useColors from "../hooks/use-colors";

export default ({ data, color, backgroundColor, darkenAmount }) => {
  const [css] = useStyletron();
  const { bgColor, fgColor } = useColors({
    color,
    backgroundColor,
    darkenAmount,
  });
  return (
    <section
      id="contact"
      className={css({
        minHeight: "50vh",
        paddingTop: '1em',
        paddingBottom: '3em'
      })}
    >
      <h2>Want to get in touch?</h2>
      <p className="lead">
        If you're interested in working with me, I'd be happy to get in touch with
        you.
      </p>
      <div className={css({
        display: 'grid',
        gridTemplateColumns: '50% auto',
        gridGap: '1em'
      })}>
        <SocialLinkGroup data={data} />
      </div>
    </section>
  );
};
