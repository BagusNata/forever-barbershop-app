import { Container, Row, Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import "../assets/BookingsContent.css";
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

    //kalau accesToken sudah ada baru di jalankan
    if (userData.accessToken) {
      getbookings();
    }
  }, [userData]);

  function formatDate(dateString) {
    return format(new Date(dateString), "dd MMMM yyyy");
  }

  //Delete booking
  const handleDeleteBooking = async (bookingId) => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/bookings/${bookingId}`, {
        method: "DELETE",
        headers: {
          "x-access-token": userData.accessToken,
          "Content-Type": "application/json",
        },
      });

      // After successful deletion, update the data state to re-render without the deleted booking
      setData((prevData) => prevData.filter((booking) => booking.id));

      // Show a success notification
      Swal.fire({
        icon: "success",
        title: "Capster deleted successfully!",
        text: "Capster that you delete will be removed from the list.",
        timer: 3000, // 3 seconds
      });
    } catch (error) {
      console.error("Error deleting capster:", error);
      // Show an error notification
      Swal.fire({
        icon: "error",
        title: "Error deleting capster",
        text: "Please try again later.",
      });
    }
  };

  return (
    <div className="w-100 min-vh-100 content-body">
      <Container>
        <Row className="py-5">
          <Card>
            <div className="card-total-booking d-flex justify-content-evenly">
              <div className="d-grid">
                <span className="fs-4">{data.length}</span>
                <span>On Going Bookings</span>
              </div>
              <i className="fa fa-fas fa-coins icon fs-3" />
            </div>
          </Card>
        </Row>
        <Row>
          <div className="table-responsive">
            <table className="table table-striped table-hover table-bordered">
              <thead className="table-dark">
                <tr className="text-center">
                  <th scope="col">Id</th>
                  <th scope="col">Nama</th>
                  <th scope="col">Layanan</th>
                  <th scope="col">Tanggal</th>
                  <th scope="col">Jam</th>
                  <th scope="col">Status</th>
                  <th scope="col">CreatedAt</th>
                  <th scope="col">UpdatedAt</th>
                  <th scope="col" colSpan={2}>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.length === 0 ? (
                  <tr>
                    <td colSpan="10">
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
                    .filter((booking) => userData.id === booking.userId)
                    .sort((a, b) => {
                      const dateComparison =
                        new Date(formatDate(a.date)) -
                        new Date(formatDate(b.date));
                      if (dateComparison === 0) {
                        return new Date(a.time) - new Date(b.time);
                      }
                      return dateComparison;
                    })
                    .map((booking) => (
                      <tr key={booking.id}>
                        <th className="text-center">{booking.id}</th>
                        <td>{booking.user.username}</td>
                        <td>{booking.service.name}</td>
                        <td>{booking.date}</td>
                        <td>{booking.time}:00</td>
                        <td>{booking.isDone}</td>
                        <td>{booking.createdAt}</td>
                        <td>{booking.updatedAt}</td>
                        <td className="text-center">
                          <a href="">
                            <i className="fas fa-edit fs-6" />
                            <p>Edit</p>
                          </a>
                        </td>
                        <td className="text-center">
                          <a
                            href=""
                            onClick={() => handleDeleteBooking(booking.id)}
                          >
                            <i className="fa-solid fa-trash-can fs-6" />
                            <p>Delete</p>
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
