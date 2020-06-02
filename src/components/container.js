import React from "react";
import { Container } from "reactstrap";
import { useStyletron } from "styletron-react";
import useSiteMetadata from "../hooks/use-site-metadata";

export default ({ children }) => {
  const [css] = useStyletron();
  const colors = useSiteMetadata("colors");
  return (
    <Container
      fluid
      className={css({
        flexDirection: "column",
        backgroundColor: colors.primary,
        color: "white",
        height: "100vh",
        overflowY: "auto",
      })}
    >
      {children}
    </Container>
  );
};
