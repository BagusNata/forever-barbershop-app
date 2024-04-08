import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { format } from "date-fns";

const HeroComponent = () => {
  let navigate = useNavigate();

  function formatDate(dateString) {
    return format(new Date(dateString), "dd MMMM yyyy, p");
  }

  const handleClick = () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (!userData) {
      // If user doesn't have userData, navigate to signInPage
      navigate("/signin");
    } else if (
      userData &&
      userData.freezeExpiryDate &&
      new Date(userData.freezeExpiryDate) > new Date()
    ) {
      // show failed alert because account user has been freeze
      Swal.fire({
        icon: "error",
        title: "Restricted to access booking page",
        html: `Your account has been freeze until <strong>${formatDate(
          userData.freezeExpiryDate
        )}</strong>`,
      });
    } else if (
      (userData && userData.freezeExpiryDate === null) ||
      new Date(userData.freezeExpiryDate) < new Date()
    ) {
      // If user has userData and no freeze, navigate to bookingPage
      navigate("/booking");
    }
  };

  return (
    <header className="cover w-100 min-vh-100 d-flex align-items-center">
      <Container>
        <Row className="header-box">
          <Col lg="7">
            <h1 className="mb-4 animate__animated animate__fadeInUp">
              Wujudkan <br /> <span>Rambut Impianmu</span> <br />
              Bersama Kami!
            </h1>
            <p className="mb-4 animate__animated animate__fadeInUp animate__delay-0.5s">
              -Forever barbershop, professional barber-
            </p>
            <div className="animate__animated animate__fadeInUp animate__delay-0.7s">
              <button
                className="btn btn-light btn-lg rounded-2 me-2 mb-mx-0 mb-2"
                onClick={handleClick}
              >
                Book Now
              </button>
              <button
                className="btn btn-outline-light btn-lg rounded-2 me-2 mb-mx-0 mb-2"
                onClick={() => {
                  document.getElementById("testimonial").scrollIntoView();
                }}
              >
                Lihat Testimonial
              </button>
            </div>
          </Col>
        </Row>
      </Container>
    </header>
  );
};

export default HeroComponent;
