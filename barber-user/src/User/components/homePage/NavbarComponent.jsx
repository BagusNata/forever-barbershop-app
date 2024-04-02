import { useState, useEffect } from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../../UserContext";
import { format } from "date-fns";
import Swal from "sweetalert2";

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

  function formatDate(dateString) {
    return format(new Date(dateString), "dd MMMM yyyy, p");
  }

  const handleBookingClick = () => {
    if (
      userData &&
      userData.freezeExpiryDate &&
      new Date(userData.freezeExpiryDate) > new Date()
    ) {
      // User has a freeze expiry date in the future
      // Show restricted message
      Swal.fire({
        icon: "error",
        title: "Restricted to access booking page",
        html: `Your account has been freeze until <strong>${formatDate(
          userData.freezeExpiryDate
        )}</strong>`,
      });
    } else {
      // If user doesn't have freeze expiry or it's already expired, navigate to booking page
      navigate("/booking");
    }
  };

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
              {/* home */}
              <div className={changeColor ? "nav-link-active" : "nav-link"}>
                <a href="#hero">Home</a>
              </div>
              {/* about */}
              <div className={changeColor ? "nav-link-active" : "nav-link"}>
                <a href="#about">About Us</a>
              </div>
              {/* service */}
              <div className={changeColor ? "nav-link-active" : "nav-link"}>
                <a href="#services">Services</a>
              </div>
              {/* booking */}
              <div
                className={changeColor ? "nav-link-active" : "nav-link"}
                onClick={handleBookingClick}
              >
                <a href="#booking">Booking</a>
              </div>
              {/* testimonial */}
              <div className={changeColor ? "nav-link-active" : "nav-link"}>
                <a href="#testimonial">Testimonial</a>
              </div>
              {/* FAQ */}
              <div className={changeColor ? "nav-link-active" : "nav-link"}>
                <a href="#faq">FAQ</a>
              </div>
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
