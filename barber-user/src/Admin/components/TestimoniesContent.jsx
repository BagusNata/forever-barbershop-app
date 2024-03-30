import { Container, Row, Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import "../assets/TestimoniesContent.css";
import Swal from "sweetalert2";
import { useUserContext } from "../../UserContext";

const TestimoniesContent = () => {
  const [data, setData] = useState([]);
  const { userData } = useUserContext();

  useEffect(() => {
    const getTestimonies = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/testimonies`,
          {
            method: "GET",
            headers: {
              "x-access-token": userData.accessToken,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 401) {
          console.error("Unauthorized access.");
          return;
        }

        setData(await response.json());
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    //kalau accesToken sudah ada baru di jalankan
    if (userData.accessToken) {
      getTestimonies();
    }
  }, [userData]);

  //Delete testimony
  const handleDeleteTestimony = async (testimonyId) => {
    try {
      await fetch(
        `${import.meta.env.VITE_API_URL}/api/testimonies/${testimonyId}`,
        {
          method: "DELETE",
          headers: {
            "x-access-token": userData.accessToken,
            "Content-Type": "application/json",
          },
        }
      );

      // After successful deletion, update the data state to re-render without the deleted testimony
      setData((prevData) => prevData.filter((testimony) => testimony.id));

      // Show a success notification
      Swal.fire({
        icon: "success",
        title: "Testimony deleted successfully!",
        text: "Testimony that you delete will be removed from the list.",
        timer: 3000, // 3 seconds
      });
    } catch (error) {
      console.error("Error deleting testimony:", error);
      // Show an error notification
      Swal.fire({
        icon: "error",
        title: "Error deleting testimony",
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
          <Card>
            <div className="card-total-testimony d-flex justify-content-evenly">
              <div className="d-grid">
                <span className="fs-4">{data.length}</span>
                <span>Testimonies</span>
              </div>
              <i className="fa fa-fas fa-comments icon fs-3" />
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
                  <th scope="col">Tanggal</th>
                  <th scope="col">Rating</th>
                  <th scope="col">Deskripsi</th>
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
                  data.map((data) => (
                    <tr key={data.id}>
                      <th className="text-center">{data.id}</th>
                      <td>{data.user.username}</td>
                      <td>{data.date}</td>
                      <td>{data.rating}</td>
                      <td>{data.description}</td>
                      <td>
                        {data.createdAt ? formatDate(data.createdAt) : ""}
                      </td>
                      <td>
                        {data.updatedAt ? formatDate(data.updatedAt) : ""}
                      </td>
                      <td className="text-center">
                        <a href="">
                          <i className="fas fa-edit fs-6" />
                          <p>Edit</p>
                        </a>
                      </td>
                      <td className="text-center">
                        <a
                          href=""
                          onClick={() => handleDeleteTestimony(data.id)}
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

export default TestimoniesContent;
