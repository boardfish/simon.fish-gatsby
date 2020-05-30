import React from "react";
import "./base.scss";
import Container from "./container";
import Navigation from "./navigation";
import useProfile from "../hooks/use-profile";
import styles from './main.module.scss'

export default (props) => {
  const { children } = props;
  const author = useProfile();

  return (
    <main className={styles.main}>
      <Navigation data={author} />
      <Container>
        {children}
      </Container>
    </main>
  );
};
