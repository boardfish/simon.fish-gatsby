import React, { useState } from "react";
import { Link } from "gatsby";
import { Collapse, Navbar, NavbarToggler, Nav, NavItem } from "reactstrap";
import styles from "./navigation.module.scss";
import { useStyletron } from "styletron-react";
import tinycolor from "tinycolor2";

export default ({ data, color }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [css] = useStyletron();

  const toggle = () => setIsOpen(!isOpen);
  return (
    <Navbar
      expand="md"
      className={css({
        backgroundColor: tinycolor(color).darken(3).toString(),
        position: "fixed",
        width: "100vw",
        flexDirection: "column",
        flexGrow: 1,
        gridColumnStart: 0,
        "@media (min-width: 768px)": {
          position: "static",
          width: "auto",
        },
      })}
    >
      <Link
        to="/"
        className={css({
          color: "white",
          textTransform: "uppercase",
          fontWeight: "bold",
          letterSpacing: "0.4rem",
          fontSize: "2rem",
        })}
      >
        {data.name}
      </Link>
      <NavbarToggler onClick={toggle} className={styles.navbarTogglerIcon} />
      <Collapse isOpen={isOpen} navbar>
        <Nav
          navbar
          className={css({
            "@media (min-width: 768px)": {
              flexDirection: "column !important",
            },
          })}
        >
          <NavItem
            className={css({
              "@media (min-width: 768px)": {
                marginBottom: "2rem",
              },
            })}
          >
            <Link
              to="/blog"
              className={
                "nav-link " +
                css({
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: "1.5rem",
                })
              }
            >
              Blog
            </Link>
          </NavItem>
          <NavItem>
            <a
              href={`https://github.com/${data.github}`}
              className={
                "nav-link " +
                css({
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: "1.5rem",
                })
              }
            >
              GitHub
            </a>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
};
