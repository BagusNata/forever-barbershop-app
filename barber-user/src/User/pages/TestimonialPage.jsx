import "../assets/css/testimonialPage.css";
import { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { useUserContext } from "../../UserContext";
import Swal from "sweetalert2";

const TestimonialPage = () => {
  const navigate = useNavigate();
  const { userData, setUserData } = useUserContext();
  const [data, setData] = useState([]);
  const [initialLoad, setInitialLoad] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const getTestimonies = async () => {
      try {
        if (!userData || !userData.roles) {
          if (!initialLoad) {
            // Check if it's not the initial load
            Swal.fire({
              icon: "error",
              title: "Restricted to access testimonial page",
              text: `You must sign in first!`,
            }).then(() => {
              navigate("/");
            });
          }
          return;
        }

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/testimonies`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch testimonies");
        }

        const testimoniesData = await response.json();
        setData(testimoniesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setInitialLoad(false); // Set initialLoad to false after fetching user data
      }
    };

    getTestimonies();
  }, [userData, navigate, setUserData, initialLoad]);

  // Function to update search values
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // function to direct users to the add page
  const handleClickAdd = () => {
    navigate("/testimonial/add");
  };

  // Format date
  function formatDate(dateString) {
    return format(new Date(dateString), "dd MMMM yyyy, p");
  }

  return userData ? (
    <div className="testimonial-page w-100 min-vh-100">
      <Container>
        <Row className="py-5">
          <img
            data-aos="zoom-in-up"
            src="./brand-transparent.webp"
            alt="Forever Barbershop"
            onClick={() => navigate("/")}
          />
        </Row>
        <Row className="header">
          <Col data-aos="zoom-in-up">
            <h1 className="text-center fw-bold">Semua Testimonial</h1>
            <p className="text-center">
              Kesan dan pesan dari pelanggan setelah menggunakan jasa layanan
              Forever Barbershop.
            </p>
          </Col>
        </Row>
        <Row>
          <div className="d-flex justify-content-end mb-3">
            <div className="searchbar input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search testimonial..."
                value={searchTerm}
                onChange={handleSearch}
              />
              <span className="input-group-text" id="inputGroup-sizing-sm">
                <i className="fa fa-fas fa-search" />
              </span>
            </div>
            <button
              type="button"
              className="btn btn-primary-add"
              onClick={() => handleClickAdd()}
            >
              <i className="fa fa-fas fa-plus icon-plus" /> add new testimonial
            </button>
          </div>
        </Row>
        {data.length === 0 ? (
          <h5 className="no-testimony">
            Belum ada pelanggan yang menulis testimoni...
          </h5>
        ) : (
          <Row className="row-cols-1">
            {data
              // Filter data based on search value
              .filter((data) =>
                [
                  data.user.username,
                  formatDate(data.date),
                  data.rating,
                  data.description,
                ]
                  .toString()
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())
              )
              .map((data) => {
                return (
                  <Col key={data.id}>
                    <Card data-aos="fade-down" className="shadow">
                      <Card.Body>
                        <div>
                          <Col>
                            <Card.Title className="d-flex align-items-center">
                              <p className="m-0">{data.user.username}</p>
                            </Card.Title>
                            <Card.Text className="d-flex align-items-center pb-3 detail">
                              {[...Array(data.rating)].map((_, index) => (
                                <i
                                  key={index}
                                  className="fa-solid fa-star rating"
                                ></i>
                              ))}
                              <i className="fas fa-dot-circle dot"></i>
                              <span>{formatDate(data.date)}</span>
                            </Card.Text>
                          </Col>
                        </div>
                        <Card.Text>{data.description}</Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })}
          </Row>
        )}
      </Container>
    </div>
  ) : null;
};

export default TestimonialPage;
