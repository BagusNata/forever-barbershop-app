import { useState, useEffect } from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { section } from "../../data/index";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../../UserContext";

const NavbarComponent = () => {
  //navigate page
  let navigate = useNavigate();

  //styling for navbar color
  const [changeColor, setChangeColor] = useState(false);
  const { userData } = useUserContext();

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
              src="./brand-transparent.webp"
              className={changeColor ? "nav-color-active" : "nav-color"}
              alt="Forever Barbershop"
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
                    <a href={link.path}>{link.text}</a>
                  </div>
                );
              })}
            </Nav>

            {!userData.username ? (
              <div className="text-center">
                <button
                  className={
                    changeColor
                      ? "btn btn-dark rounded-2 m-2"
                      : "btn btn-light rounded-2 m-2"
                  }
                  onClick={() => {
                    navigate("/signin");
                  }}
                >
                  Sign in
                </button>
                <button
                  className={
                    changeColor
                      ? "btn btn-outline-dark rounded-2 m-2 "
                      : "btn btn-outline-light rounded-2 m-2"
                  }
                  onClick={() => {
                    navigate("/signup");
                  }}
                >
                  Sign up
                </button>
              </div>
            ) : (
              <div className="text-center">
                <Navbar.Collapse id="user-info">
                  <Nav>
                    <NavDropdown
                      className={changeColor ? "dropdown-active" : "dropdown"}
                      title={userData.username}
                      menuVariant="light"
                    >
                      <NavDropdown.Item
                        onClick={() => {
                          navigate("/myBooking");
                        }}
                      >
                        My booking
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        onClick={() => {
                          navigate("/myTestimony");
                        }}
                      >
                        My testimony
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item
                        onClick={() => {
                          navigate("/signout");
                        }}
                      >
                        Sign out
                      </NavDropdown.Item>
                    </NavDropdown>
                  </Nav>
                </Navbar.Collapse>
              </div>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavbarComponent;
