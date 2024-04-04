import { Container, Row, Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import "../assets/adminContent.css";
import Swal from "sweetalert2";
import { useUserContext } from "../../UserContext";
import { useNavigate } from "react-router-dom";

const CapstersContent = () => {
  let navigate = useNavigate();
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { userData } = useUserContext();

  useEffect(() => {
    const getCapster = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/capsters`,
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

    // If the accessToken already exists then run it
    if (userData.accessToken) {
      getCapster();
    }
  }, [userData]);

  // Function to update search values
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // function to direct users to the add page
  const handleClickAdd = () => {
    navigate("/admin/capsters/add");
  };

  // function to direct users to the add page
  const handleClickEdit = (capsterId) => {
    navigate(`/admin/capsters/edit/${capsterId}`);
  };

  //Delete capster
  const handleDeleteCapster = async (capsterId) => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/capsters/${capsterId}`, {
        method: "DELETE",
        headers: {
          "x-access-token": userData.accessToken,
          "Content-Type": "application/json",
        },
      });

      // After successful deletion, update the data state to re-render without the deleted capster
      setData((prevData) =>
        prevData.filter((capster) => capster.id !== capsterId)
      );

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
                <span>Capsters</span>
              </div>
              <i className="fa fa-fas fa-user-tie icon fs-3" />
            </div>
          </Card>
        </Row>
        <Row>
          <div className="d-flex justify-content-end mb-3">
            <div className="searchbar input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search capster..."
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
              <i className="fa fa-fas fa-plus icon-plus" /> add new capster
            </button>
          </div>
        </Row>
        <Row>
          <div className="table-responsive">
            <table className="table table-striped table-hover table-bordered">
              <thead className="table-dark">
                <tr className="text-center">
                  <th scope="col">Id</th>
                  <th scope="col">Nama</th>
                  <th scope="col">Tempat Lahir</th>
                  <th scope="col">Tanggal Lahir</th>
                  <th scope="col">Gender</th>
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
                  data
                    // Filter data based on search value
                    .filter((data) =>
                      [
                        data.name,
                        data.placeOfBirth,
                        data.dateOfBirth,
                        data.gender,
                      ]
                        .map((property) => property.toLowerCase())
                        .join(" ")
                        .includes(searchTerm.toLowerCase())
                    )
                    .map((data) => (
                      <tr key={data.id}>
                        <th className="text-center">{data.id}</th>
                        <td>{data.name}</td>
                        <td>{data.placeOfBirth}</td>
                        <td>
                          {data.dateOfBirth ? formatDate(data.dateOfBirth) : ""}
                        </td>
                        <td>{data.gender}</td>
                        <td>
                          {data.createdAt ? formatDate(data.createdAt) : ""}
                        </td>
                        <td>
                          {data.updatedAt ? formatDate(data.updatedAt) : ""}
                        </td>
                        <td className="text-center">
                          <a href="" onClick={() => handleClickEdit(data.id)}>
                            <i className="fas fa-edit fs-6" />
                            <p>Edit</p>
                          </a>
                        </td>
                        <td className="text-center">
                          <a
                            href=""
                            onClick={() => handleDeleteCapster(data.id)}
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

export default CapstersContent;
