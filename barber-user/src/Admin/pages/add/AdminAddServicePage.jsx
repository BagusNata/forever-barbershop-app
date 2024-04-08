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
  if (!values.image) {
    errors.image = "Required!";
  } else if (values.image.length > 225) {
    errors.image = "Maximum 225 characters!";
  }

  if (!values.name) {
    errors.name = "Required!";
  } else if (values.name.length > 225) {
    errors.name = "Maximum 225 characters!";
  }

  if (!values.price) {
    errors.price = "Required!";
  }

  if (!values.description) {
    errors.description = "Required!";
  } else if (values.description.length > 225) {
    errors.description = "Maximum 225 characters!";
  }

  if (values.detail.length > 225) {
    errors.detail = "Maximum 225 characters!";
  }

  return errors;
};

const AdminAddServicePage = () => {
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
      image: "",
      name: "",
      price: "",
      description: "",
      detail: "",
    },
    validate,
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/services`,
          {
            method: "POST",
            headers: {
              "x-access-token": userData.accessToken,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              image: values.image,
              name: values.name,
              price: values.price,
              description: values.description,
              detail: values.detail,
            }),
          }
        );
        const data = await response.json();
        console.log(data);
        if (data.message && data.message.toLowerCase().includes("failed")) {
          console.error("Error add service:", 400);
          Swal.fire({
            icon: "error",
            title: "Failed add new service",
            text: "Failed! Gender does not exist!",
          });
          return;
        }
        // Show success alert
        Swal.fire({
          icon: "success",
          title: "New service added successfully!",
          text: "You will be redirected to the admin service page.",
          timer: 3000, // 3 seconds
        }).then(() => {
          // Redirect to the admin service page
          navigate("/admin/services");
        });
      } catch (error) {
        // Handle add service error
        console.error("Error add service:", error);
        Swal.fire({
          icon: "error",
          title: "Error add new service",
          text: "Please try again later.",
        });
      } finally {
        setIsLoading(false);
      }
    },
  });

  const handleAddService = async () => {
    // This function should be defined outside of the useFormik callback
    formik.handleSubmit();
  };

  return userData && userData.roles && userData.roles.includes("ROLE_ADMIN") ? (
    <div className="admin-add w-100 min-vh-100">
      <Container>
        <div className="position-absolute top-50 start-50 translate-middle form-box">
          <form onSubmit={formik.handleSubmit}>
            <h3 className="text-center mb-5">Tambah Service Baru</h3>
            <div className="mb-3">
              <label className="form-label">Link Gambar</label>
              <input
                className="form-control"
                autoFocus
                type="text"
                placeholder="Contoh : (https://blablabla)"
                id="image"
                name="image"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.image}
              />
              {formik.touched.image && formik.errors.image ? (
                <div className="error">{formik.errors.image}</div>
              ) : null}
            </div>
            <div className="mb-3">
              <label className="form-label">Nama layanan</label>
              <input
                className="form-control"
                type="text"
                placeholder="Contoh : (Basic Cut)"
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
              <label className="form-label">Harga</label>
              <input
                className="form-control"
                type="number"
                placeholder="Contoh : (35000)"
                id="price"
                name="price"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.price}
              />
              {formik.touched.price && formik.errors.price ? (
                <div className="error">{formik.errors.price}</div>
              ) : null}
            </div>
            <div className="mb-3">
              <label className="form-label">Deskripsi</label>
              <input
                className="form-control"
                type="text"
                placeholder="Contoh : (Paket layanan yang paling bagus, blablabla.)"
                id="description"
                name="description"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.description}
              />
              {formik.touched.description && formik.errors.description ? (
                <div className="error">{formik.errors.description}</div>
              ) : null}
            </div>
            <div className="mb-3">
              <label className="form-label">Detail</label>
              <input
                className="form-control"
                type="text"
                placeholder="Contoh : (Hair cut, Hair wash, Styling)"
                id="detail"
                name="detail"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.detail}
              />
              {formik.touched.detail && formik.errors.detail ? (
                <div className="error">{formik.errors.detail}</div>
              ) : null}
            </div>

            <div className="mt-4">
              <button
                type="button"
                className="btn btn-success"
                disabled={isLoading}
                onClick={handleAddService}
              >
                {isLoading ? "Loading..." : "Submit"}
              </button>
              <button
                type="button"
                onClick={() => navigate("/admin/services")}
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

export default AdminAddServicePage;
