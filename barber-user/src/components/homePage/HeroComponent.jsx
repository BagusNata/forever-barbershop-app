import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


const HeroComponent = () => {
  let navigate = useNavigate();

  const handleClick = () => {
    const accessToken = localStorage.getItem("userData");

    if (accessToken) {
      // If user has accessToken, navigate to bookingPage
      navigate("/booking");
    } else {
      // If user doesn't have accessToken, navigate to signInPage
      navigate("/signin");
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
