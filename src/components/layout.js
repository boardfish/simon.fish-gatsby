import React from "react";
import "./base.scss";
import Container from "./container";
import Navigation from "./navigation";
import useProfile from "../hooks/use-profile";
import useSiteMetadata from "../hooks/use-site-metadata";
import { useStyletron } from "styletron-react";

export default (props) => {
  const { children } = props;
  const author = useProfile();
  const colors = useSiteMetadata("colors");
  const [css] = useStyletron();

  return (
    <main
      className={css({
        display: "flex",
        flexDirection: "column",
        "@media (min-width: 768px)": {
          display: "grid",
          gridTemplateColumns: "25% auto",
        },
      })}
    >
      <Navigation data={author} />
      <Container>{children}</Container>
    </main>
  );
};
