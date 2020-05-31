import React, { useState } from "react";
import { Link } from "gatsby";
import { Collapse, Navbar, NavbarToggler, Nav, NavItem } from "reactstrap";
import styles from "./navigation.module.scss";

export default ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  return (
    <Navbar expand="md" className={styles.navigation}>
      <Link to="/" className={styles.navbarBrand}>
        {data.name}
      </Link>
      <NavbarToggler onClick={toggle} className={styles.navbarTogglerIcon} />
      <Collapse isOpen={isOpen} navbar>
        <Nav navbar className={styles.navContent}>
          <NavItem className={styles.navLinkWrapper}>
            <Link to="/blog" className={styles.navLink}>
              Blog
            </Link>
          </NavItem>
          <NavItem>
            <a
              href={`https://github.com/${data.github}`}
              className={styles.navLink}
            >
              GitHub
            </a>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
};
