import "../../assets/adminAdd.css";
import { useEffect, useState } from "react";
import { useUserContext } from "../../../UserContext";
import { Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import Swal from "sweetalert2";

const validate = (values) => {
  const errors = {};
  if (!values.image) {
    errors.image = "Required!";
  } else if (values.image.length > 225) {
    errors.image = "maximum 225 characters!";
  }

  if (!values.name) {
    errors.name = "Required!";
  } else if (values.name.length > 225) {
    errors.name = "maximum 225 characters!";
  }

  if (!values.price) {
    errors.price = "Required!";
  }

  if (!values.description) {
    errors.description = "Required!";
  } else if (values.description.length > 225) {
    errors.description = "maximum 225 characters!";
  }

  if (values.detail.length > 225) {
    errors.detail = "maximum 225 characters!";
  }

  return errors;
};

const AdminEditServicePage = () => {
  const navigate = useNavigate();
  const { userData } = useUserContext();
  const { serviceId } = useParams();
  const [isLoading, setIsLoading] = useState(false);

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
          `${import.meta.env.VITE_API_URL}/api/services/${serviceId}`,
          {
            method: "PUT",
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
        if (data.message && data.message.toLowerCase().includes("found")) {
          console.error("Error update service:", 404);
          Swal.fire({
            icon: "error",
            title: "Failed update service",
            text: "Service not found!",
          });
          return;
        }
        // Show success alert
        Swal.fire({
          icon: "success",
          title: "Service updated successfully!",
          text: "You will be redirected to the admin service page.",
          timer: 3000, // 3 seconds
        }).then(() => {
          // Redirect to the admin service page
          navigate("/admin/services");
        });
      } catch (error) {
        // Handle add service error
        console.error("Error update service:", error);
        Swal.fire({
          icon: "error",
          title: "Error update service",
          text: "Please try again later.",
        });
      } finally {
        setIsLoading(false);
      }
    },
  });

  // Fetch service data when the component mounts
  useEffect(() => {
    const fetchSessionData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/services`,
          {
            method: "GET",
            headers: {
              "x-access-token": userData.accessToken,
            },
          }
        );
        if (!response.ok) {
          throw new Error(
            `Failed to fetch service data: ${response.statusText}`
          );
        }
        const data = await response.json();
        if (data && data.length) {
          const currentCapster = data.find(
            (value) => value.id === Number(serviceId)
          );
          formik.setValues({
            image: currentCapster.image,
            name: currentCapster.name,
            price: currentCapster.price,
            description: currentCapster.description,
            detail: currentCapster.detail,
          });
        }
      } catch (error) {
        console.error("Error fetching service data:", error.message);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to fetch service data. Please try again later.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchSessionData();
  }, [serviceId, userData.accessToken]);

  return userData && userData.roles && userData.roles.includes("ROLE_ADMIN") ? (
    <div className="admin-add w-100 min-vh-100">
      <Container>
        <div className="position-absolute top-50 start-50 translate-middle form-box">
          <form onSubmit={formik.handleSubmit}>
            <h3 className="text-center mb-5">Update Data Service</h3>
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
                onClick={formik.handleSubmit}
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

export default AdminEditServicePage;
