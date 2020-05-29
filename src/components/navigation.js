import React, { useState } from "react";
import { Link } from "gatsby";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
} from "reactstrap";

export default ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  return (
    <Navbar color="primary" expand="md">
      <Link to="/" className="navbar-brand">{data.name}</Link>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <Link to="/blog" className="nav-link">
              Blog
            </Link>
          </NavItem>
          <NavItem>
            <a href={`https://github.com/${data.github}`} className="nav-link">
              GitHub
            </a>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
};
