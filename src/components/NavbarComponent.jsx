import { useState, useEffect } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { navLinks } from "../data/index";
import { NavLink } from "react-router-dom";

const NavbarComponent = () => {
  const [changeColor, setChangeColor] = useState(false);

  const changeBgNavbar = () => {
    if (window.scrollY > 10) {
      setChangeColor(true);
    } else {
      setChangeColor(false);
    }
  };

  useEffect(() => {
    changeBgNavbar();

    window.addEventListener("scroll", changeBgNavbar);
  });

  return (
    <div>
      <Navbar
        fixed="top"
        expand="lg"
        className={changeColor ? "color-active" : ""}
      >
        <Container>
          <Navbar.Brand href="/">
            <img
              src="./brand-transparent.png"
              className={changeColor ? "brand-active" : "brand"}
              alt="brand"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto text-center">
              {navLinks.map((link) => {
                return (
                  <div
                    className={changeColor ? "nav-link-active" : "nav-link"}
                    key={link.id}
                  >
                    <NavLink
                      to={link.path}
                      className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? "active" : ""
                      }
                      end
                    >
                      {link.text}
                    </NavLink>
                  </div>
                );
              })}
            </Nav>

            <div className="text-center">
              <button
                className={
                  changeColor
                    ? "btn btn-dark rounded-2 mx-1"
                    : "btn btn-light rounded-2 mx-1"
                }
              >
                Login
              </button>
              <button
                className={
                  changeColor
                    ? "btn btn-outline-dark rounded-2 mx-1"
                    : "btn btn-outline-light rounded-2 mx-1"
                }
              >
                Sign up
              </button>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavbarComponent;
