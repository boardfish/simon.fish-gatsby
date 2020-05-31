import React from "react";
import { Container } from "reactstrap";
import styles from "./container.module.scss";

export default ({ children }) => (
  <Container fluid className={styles.container}>
    {children}
  </Container>
);
