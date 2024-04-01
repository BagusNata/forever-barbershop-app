import { Container, Row, Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import "../assets/AdminContent.css";
import Swal from "sweetalert2";
import { useUserContext } from "../../UserContext";

const UsersContent = () => {
  const [data, setData] = useState([]);
  const { userData } = useUserContext();

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/users`,
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

    // Execute only if userData.accessToken exists
    if (userData.accessToken) {
      getUser();
    }
  }, [userData]);

  // Freeze user
  const handleFreezeUser = async (userId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/${userId}/freeze`,
        {
          method: "POST",
          headers: {
            "x-access-token": userData.accessToken,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        // Show a success notification
        Swal.fire({
          icon: "success",
          title: "The user has been successfully frozen!",
          text: "The user has been successfully set to freeze mode",
          timer: 3000, // 3 seconds
        });
      } else {
        console.error("Failed to freeze user:", response.statusText);
        // Show an error notification
        Swal.fire({
          icon: "error",
          title: "Error when setting user to freeze mode",
          text: "Please try again later.",
        });
      }
    } catch (error) {
      console.error("Error when setting user to freeze mode:", error);
      // Show an error notification
      Swal.fire({
        icon: "error",
        title: "Error when setting user to freeze mode",
        text: "Please try again later.",
      });
    }
  };

  // Delete user
  const handleDeleteUser = async (userId) => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/users/${userId}`, {
        method: "DELETE",
        headers: {
          "x-access-token": userData.accessToken,
          "Content-Type": "application/json",
        },
      });

      // After successful deletion, update the data state to re-render without the deleted user
      setData((prevData) => prevData.filter((user) => user.id !== userId));

      // Show a success notification
      Swal.fire({
        icon: "success",
        title: "User deleted successfully!",
        text: "User that you delete will be removed from the list.",
        timer: 3000, // 3 seconds
      });
    } catch (error) {
      console.error("Error deleting user:", error);
      // Show an error notification
      Swal.fire({
        icon: "error",
        title: "Error deleting user",
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
            <div className="card-total-admin d-flex justify-content-evenly">
              <div className="d-grid">
                <span className="fs-4">{data.length}</span>
                <span>Users</span>
              </div>
              {/* Icon */}
              <i className="fa fa-fas fa-users icon fs-3" />
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
                  <th scope="col">Email</th>
                  <th scope="col">No. Telepon</th>
                  <th scope="col">Batas akun dibekukan</th>
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
                    <td colSpan="9">
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
                      <td>{data.username}</td>
                      <td>{data.email}</td>
                      <td>{data.phone}</td>
                      <td>
                        {data.freezeExpiryDate
                          ? formatDate(data.freezeExpiryDate)
                          : ""}
                      </td>
                      <td>
                        {data.createdAt ? formatDate(data.createdAt) : ""}
                      </td>
                      <td>
                        {data.updatedAt ? formatDate(data.updatedAt) : ""}
                      </td>
                      <td className="text-center">
                        <a href="" onClick={() => handleFreezeUser(data.id)}>
                          <i className="fas fa-snowflake fs-6" />
                          <p>Freeze</p>
                        </a>
                      </td>
                      <td className="text-center">
                        <a href="" onClick={() => handleDeleteUser(data.id)}>
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

export default UsersContent;
