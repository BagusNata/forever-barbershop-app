import "../../assets/adminAdd.css";
import { useEffect, useState } from "react";
import { useUserContext } from "../../../UserContext";
import { Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import { format } from "date-fns";

const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = "Required!";
  } else if (values.name.length < 5) {
    errors.name = "Must be 5 characters or more!";
  }

  if (!values.placeOfBirth) {
    errors.placeOfBirth = "Required!";
  }

  if (!values.dateOfBirth) {
    errors.dateOfBirth = "Required!";
  }

  if (!values.gender) {
    errors.gender = "Required!";
  }

  return errors;
};

const AdminEditCapsterPage = () => {
  const navigate = useNavigate();
  const { userData } = useUserContext();
  const { capsterId } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  // Form logic
  const formik = useFormik({
    initialValues: {
      name: "",
      placeOfBirth: "",
      dateOfBirth: "",
      gender: "",
    },
    validate,
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/capsters/${capsterId}`,
          {
            method: "PUT",
            headers: {
              "x-access-token": userData.accessToken,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: values.name,
              placeOfBirth: values.placeOfBirth,
              dateOfBirth: values.dateOfBirth,
              gender: values.gender,
            }),
          }
        );
        const data = await response.json();
        console.log(data);
        if (data.message && data.message.toLowerCase().includes("found")) {
          console.error("Error update capster:", 404);
          Swal.fire({
            icon: "error",
            title: "Failed update capster",
            text: "Capster not found!",
          });
          return;
        }
        // Show success alert
        Swal.fire({
          icon: "success",
          title: "Capster updated successfully!",
          text: "You will be redirected to the admin capster page.",
          timer: 3000, // 3 seconds
        }).then(() => {
          // Redirect to the admin capster page
          navigate("/admin/capsters");
        });
      } catch (error) {
        // Handle add capster error
        console.error("Error update capster:", error);
        Swal.fire({
          icon: "error",
          title: "Error update capster",
          text: "Please try again later.",
        });
      } finally {
        setIsLoading(false);
      }
    },
  });

  // Fetch capster data when the component mounts
  useEffect(() => {
    function formatDate(dateString) {
      return format(new Date(dateString), "yyyy-MM-dd");
    }

    const fetchSessionData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/capsters`,
          {
            method: "GET",
            headers: {
              "x-access-token": userData.accessToken,
            },
          }
        );
        if (!response.ok) {
          throw new Error(
            `Failed to fetch capster data: ${response.statusText}`
          );
        }
        const data = await response.json();
        if (data && data.length) {
          const currentCapster = data.find(
            (value) => value.id === Number(capsterId)
          );
          formik.setValues({
            name: currentCapster.name,
            placeOfBirth: currentCapster.placeOfBirth,
            dateOfBirth: formatDate(currentCapster.dateOfBirth),
            gender: currentCapster.gender,
          });
        }
      } catch (error) {
        console.error("Error fetching capster data:", error.message);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to fetch capster data. Please try again later.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    // If the accessToken already exists then run it
    if (userData.accessToken) {
      fetchSessionData();
    }
  }, [capsterId, userData.accessToken]);

  return userData && userData.roles && userData.roles.includes("ROLE_ADMIN") ? (
    <div className="admin-add w-100 min-vh-100">
      <Container>
        <div className="position-absolute top-50 start-50 translate-middle form-box">
          <form onSubmit={formik.handleSubmit}>
            <h3 className="text-center mb-5">Update Data Capster</h3>
            <div className="mb-3">
              <label className="form-label">Nama</label>
              <input
                className="form-control"
                autoFocus
                type="text"
                placeholder="Contoh : (Bagus Nata)"
                id="name"
                name="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="error">{formik.errors.name}</div>
              ) : null}
            </div>
            <div className="mb-3">
              <label className="form-label">Tempat lahir</label>
              <input
                className="form-control"
                type="text"
                placeholder="Contoh : (Denpasar)"
                id="placeOfBirth"
                name="placeOfBirth"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.placeOfBirth}
              />
              {formik.touched.placeOfBirth && formik.errors.placeOfBirth ? (
                <div className="error">{formik.errors.placeOfBirth}</div>
              ) : null}
            </div>
            <div className="mb-3">
              <label className="form-label">Tanggal lahir</label>
              <input
                className="form-control"
                type="date"
                placeholder="Contoh : (1998-12-2)"
                id="dateOfBirth"
                name="dateOfBirth"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.dateOfBirth}
              />
              {formik.touched.dateOfBirth && formik.errors.dateOfBirth ? (
                <div className="error">{formik.errors.dateOfBirth}</div>
              ) : null}
            </div>
            <div className="mb-3">
              <label className="form-label">Gender</label>
              <input
                className="form-control"
                type="text"
                placeholder="Contoh : (M = laki-laki, F = perempuan)"
                id="gender"
                name="gender"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.gender}
              />
              {formik.touched.gender && formik.errors.gender ? (
                <div className="error">{formik.errors.gender}</div>
              ) : null}
            </div>

            <div className="mt-4">
              <button
                type="button"
                className="btn btn-success"
                disabled={isLoading}
                onClick={formik.handleSubmit}
              >
                {isLoading ? "Loading..." : "Submit"}
              </button>
              <button
                type="button"
                onClick={() => navigate("/admin/capsters")}
                className="btn btn-outline-danger"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </Container>
    </div>
  ) : null;
};

export default AdminEditCapsterPage;
