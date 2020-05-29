import React from "react";
import "./base.scss";
import Container from "./container";
import Navigation from "./navigation";
import useProfile from "../hooks/use-profile";

export default (props) => {
  const { children } = props;
  const author = useProfile();

  return (
    <Container>
      <Navigation data={author} />
      {children}
    </Container>
  );
};
