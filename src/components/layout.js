import React from "react";
import "../../node_modules/bootstrap/scss/bootstrap.scss";
import Container from "./container";
import Navigation from "./navigation";
import useProfile from "../hooks/use-profile";
import useSiteMetadata from "../hooks/use-site-metadata";
import styles from "./main.module.scss";

export default (props) => {
  const { children } = props;
  const author = useProfile();
  const colors = useSiteMetadata("colors");

  return (
    <main className={styles.main}>
      <Navigation data={author} color={colors.primary} />
      <Container>{children}</Container>
    </main>
  );
};
