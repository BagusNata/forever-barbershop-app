import "../../assets/adminAdd.css";
import { useEffect } from "react";
import { useUserContext } from "../../../UserContext";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useState } from "react";
import Swal from "sweetalert2";

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

const AdminAddCapsterPage = () => {
  const navigate = useNavigate();
  const { userData, setUserData } = useUserContext();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if user role = admin
    if (userData && userData.roles && userData.roles.includes("ROLE_ADMIN")) {
      // Render admin page
      return;
    } else {
      // Check if user data exists in local storage
      const storedUserData = JSON.parse(localStorage.getItem("userData"));
      if (
        storedUserData &&
        storedUserData.roles &&
        storedUserData.roles.includes("ROLE_ADMIN")
      ) {
        // Update context with stored user data
        setUserData(storedUserData);
      } else {
        // Show restricted message
        Swal.fire({
          icon: "error",
          title: "Restricted to access admin page",
          text: `Your account doesn't have admin role`,
        }).then(() => {
          // Redirect to the home page
          navigate("/");
        });
      }
    }
  }, [userData, navigate, setUserData]);

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
          `${import.meta.env.VITE_API_URL}/api/capsters`,
          {
            method: "POST",
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
        if (data.message && data.message.toLowerCase().includes("failed")) {
          console.error("Error add capster:", 400);
          Swal.fire({
            icon: "error",
            title: "Failed add new capster",
            text: "Failed! Gender does not exist!",
          });
          return;
        }
        // Show success alert
        Swal.fire({
          icon: "success",
          title: "New capster added successfully!",
          text: "You will be redirected to the admin capster page.",
          timer: 3000, // 3 seconds
        }).then(() => {
          // Redirect to the admin capster page
          navigate("/admin/capsters");
        });
      } catch (error) {
        // Handle add capster error
        console.error("Error add capster:", error);
        Swal.fire({
          icon: "error",
          title: "Error add new capster",
          text: "Please try again later.",
        });
      } finally {
        setIsLoading(false);
      }
    },
  });

  const handleAddCapster = async () => {
    // This function should be defined outside of the useFormik callback
    formik.handleSubmit();
  };

  return userData && userData.roles && userData.roles.includes("ROLE_ADMIN") ? (
    <div className="admin-add w-100 min-vh-100">
      <Container>
        <div className="position-absolute top-50 start-50 translate-middle form-box">
          <form onSubmit={formik.handleSubmit}>
            <h3 className="text-center mb-5">Tambah Capster Baru</h3>
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
                onClick={handleAddCapster}
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

export default AdminAddCapsterPage;
