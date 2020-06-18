import React from "react";
import "./base.scss";
import Container from "./container";
import Navigation from "./navigation";
import useProfile from "../hooks/use-profile";
import { useStyletron } from "styletron-react";

export default (props) => {
  const { children } = props;
  const author = useProfile();
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
      <Container>
        {children}
        <footer className={css({
          display: 'flex',
          alignItems: 'center',
          minHeight: "5em",
          fontSize: '.8em'
        })}>
          Copyright © 2016-2020 Simon Fish
        </footer>
      </Container>
    </main>
  );
};
