import React, { useState } from "react";
import { Link } from "gatsby";
import { Collapse, Navbar, NavbarToggler, Nav, NavItem } from "reactstrap";
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
        flexGrow: 1,
        gridColumnStart: 0,
        overflowY: 'auto',
        "@media (min-width: 768px)": {
          position: "sticky",
          width: "auto",
          flexDirection: "column !important",
          height: "100vh",
        },
      })}
    >
      <Link
        to="/#hero"
        className={css({
          textTransform: "uppercase",
          fontWeight: "bold",
          letterSpacing: "0.4rem",
          fontSize: "2rem",
        })}
      >
        {data.name}
      </Link>
      <NavbarToggler onClick={toggle} />
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
              to="#about"
              className={
                "nav-link " +
                css({
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: "1.5rem",
                })
              }
            >
              Hi there.
            </Link>
          </NavItem>
          <NavItem
            className={css({
              "@media (min-width: 768px)": {
                marginBottom: "2rem",
              },
            })}
          >
            <Link
              to="#testimonials"
              className={
                "nav-link " +
                css({
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: "1.5rem",
                })
              }
            >
              Testimonials
            </Link>
          </NavItem>
          <NavItem
            className={css({
              "@media (min-width: 768px)": {
                marginBottom: "2rem",
              },
            })}
          >
            <Link
              to="#portfolio"
              className={
                "nav-link " +
                css({
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: "1.5rem",
                })
              }
            >
              Portfolio
            </Link>
          </NavItem>
          <NavItem
            className={css({
              "@media (min-width: 768px)": {
                marginBottom: "2rem",
              },
            })}
          >
            <Link
              to="#blog"
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
          <NavItem
            className={css({
              "@media (min-width: 768px)": {
                marginBottom: "2rem",
              },
            })}
          >
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
          <NavItem
            className={css({
              "@media (min-width: 768px)": {
                marginBottom: "2rem",
              },
            })}
          >
            <a
              href='https://cv.simon.fish'
              className={
                "nav-link " +
                css({
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: "1.5rem",
                })
              }
            >
              CV/Resume
            </a>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
};
