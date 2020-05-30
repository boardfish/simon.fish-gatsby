import React from "react";
import { Container } from "reactstrap";

export default ({ children }) => (
  <Container fluid className="d-flex flex-column" style={{
    // maxWidth: 1180,
    height: '100vh',
    overflowY: 'auto',
    }}>
    {children}
  </Container>
);
