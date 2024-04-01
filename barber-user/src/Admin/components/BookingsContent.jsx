import { Container, Row, Col, Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import "../assets/AdminContent.css";
import { format } from "date-fns";
import Swal from "sweetalert2";
import { useUserContext } from "../../UserContext";

const BookingsContent = () => {
  const [data, setData] = useState([]);
  const { userData } = useUserContext();

  useEffect(() => {
    const getbookings = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/bookings`,
          {
            method: "GET",
            headers: {
              "x-access-token": userData.accessToken,
              "Content-Type": "application/json",
            },
          }
        );
        const bookings = await response.json();
        if (bookings && bookings.length) {
          setData(bookings);
        }
      } catch (error) {
        setData([]);
        console.error("Error fetching data:", error);
      }
    };

    // Execute only if userData.accessToken exists
    if (userData.accessToken) {
      getbookings();
    }
  }, [userData]);

  // Set booking status
  const handleDoneBooking = async (bookingId) => {
    try {
      await fetch(
        `${import.meta.env.VITE_API_URL}/api/bookings/${bookingId}/done`,
        {
          method: "POST",
          headers: {
            "x-access-token": userData.accessToken,
            "Content-Type": "application/json",
          },
        }
      );

      // After successful set status to Done, update the data state to re-render only on-going booking
      setData((prevData) =>
        prevData.filter((booking) => booking.id !== bookingId)
      );

      // Show a success notification
      Swal.fire({
        icon: "success",
        title: "Booking status set successfully!",
        text: "Booking status will be removed from the list.",
        timer: 3000, // 3 seconds
      });
    } catch (error) {
      console.error("Error set booking status:", error);
      // Show an error notification
      Swal.fire({
        icon: "error",
        title: "Error set booking status",
        text: "Please try again later.",
      });
    }
  };

  function formatDate(dateString) {
    return format(new Date(dateString), "PPpp");
  }

  return (
    <div className="w-100 min-vh-100 content-body">
      <Container>
        <Row className="py-5">
          <Col>
            <Card>
              <div className="card-total-admin d-flex justify-content-evenly">
                <div className="d-grid">
                  <span className="fs-4">{data.length}</span>
                  <span>On Going Bookings</span>
                </div>
                <i className="fa fa-fas fa-coins icon fs-3" />
              </div>
            </Card>
          </Col>
        </Row>
        <Row>
          <div className="table-responsive">
            <table className="table table-striped table-hover table-bordered">
              <thead className="table-dark">
                <tr className="text-center">
                  <th scope="col">#</th>
                  <th scope="col">Nama</th>
                  <th scope="col">Layanan</th>
                  <th scope="col">Tanggal</th>
                  <th scope="col">Jam</th>
                  <th scope="col">CreatedAt</th>
                  <th scope="col">UpdatedAt</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {data.length === 0 ? (
                  <tr>
                    <td colSpan="8">
                      <div className="d-flex align-items-center">
                        <strong>Loading...</strong>
                        <div
                          className="spinner-border ms-auto"
                          role="status"
                          aria-hidden="true"
                        ></div>
                      </div>
                    </td>
                  </tr>
                ) : (
                  data
                    .sort((a, b) => {
                      const dateComparison =
                        new Date(formatDate(a.date)) -
                        new Date(formatDate(b.date));
                      if (dateComparison === 0) {
                        return new Date(a.time) - new Date(b.time);
                      }
                      return dateComparison;
                    })
                    .map((data, index) => (
                      <tr key={data.id}>
                        <th className="text-center">{index + 1}</th>
                        <td>{data.user.username}</td>
                        <td>{data.service.name}</td>
                        <td>{data.date ? formatDate(data.date) : ""}</td>
                        <td>{data.session.time}:00</td>
                        <td>
                          {data.createdAt ? formatDate(data.createdAt) : ""}
                        </td>
                        <td>
                          {data.updatedAt ? formatDate(data.updatedAt) : ""}
                        </td>

                        {/* Action */}
                        <td className="text-center">
                          <a href="" onClick={() => handleDoneBooking(data.id)}>
                            <i className="fas fa-check fs-6" />
                            <p>Done</p>
                          </a>
                        </td>
                      </tr>
                    ))
                )}
              </tbody>
            </table>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default BookingsContent;
