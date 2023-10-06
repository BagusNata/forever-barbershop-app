import { useState, useEffect } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { section } from "../data/index";
import { useNavigate } from "react-router-dom";

const NavbarComponent = () => {
  //navigate page
  let navigate = useNavigate();

  //styling for navbar color
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
              className={changeColor ? "nav-color-active" : "nav-color"}
              alt="brand"
            />
          </Navbar.Brand>
          <Navbar.Toggle
            className={changeColor ? "nav-color-active" : "nav-color"}
            aria-controls="basic-navbar-nav"
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto text-center">
              {section.map((link) => {
                return (
                  <div
                    className={changeColor ? "nav-link-active" : "nav-link"}
                    key={link.id}
                  >
                    <a
                      href={link.path}
                      className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? "active" : ""
                      }
                      end
                    >
                      {link.text}
                    </a>
                  </div>
                );
              })}
            </Nav>

            <div className="text-center">
              <button
                className={
                  changeColor
                    ? "btn btn-dark rounded-2 m-2"
                    : "btn btn-light rounded-2 m-2"
                }
                onClick={() => {
                  navigate("/login");
                }}
              >
                Login
              </button>
              <button
                className={
                  changeColor
                    ? "btn btn-outline-dark rounded-2 m-2 "
                    : "btn btn-outline-light rounded-2 m-2"
                }
                onClick={()=>{
                  navigate("/register");
                }}
              >
                Register
              </button>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavbarComponent;
