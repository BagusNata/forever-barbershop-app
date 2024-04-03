import "../../assets/css/addTestimonial.css";
import { useEffect } from "react";
import { useUserContext } from "../../../UserContext";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useState } from "react";
import Swal from "sweetalert2";
import { format } from "date-fns";

const validate = (values) => {
  const errors = {};
  if (!values.rating) {
    errors.rating = "Required!";
  }

  if (!values.description) {
    errors.description = "Required!";
  }

  return errors;
};

const AddTestimonial = () => {
  const navigate = useNavigate();
  const { userData, setUserData } = useUserContext();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if user role = user
    if (userData && userData.roles && userData.roles.includes("ROLE_USER")) {
      // Render add testimonial page
      return;
    } else {
      // Check if user data exists in local storage
      const storedUserData = JSON.parse(localStorage.getItem("userData"));
      if (
        storedUserData &&
        storedUserData.roles &&
        storedUserData.roles.includes("ROLE_USER")
      ) {
        // Update context with stored user data
        setUserData(storedUserData);
      } else {
        // Show restricted message
        Swal.fire({
          icon: "error",
          title: "Restricted to access add testimonial page",
          text: `Your account doesn't have user role`,
        }).then(() => {
          // Redirect to the home page
          navigate("/");
        });
      }
    }
  }, [userData, navigate, setUserData]);

  function formatDate(dateString) {
    return format(new Date(dateString), "dd MMMM yyyy, p");
  }

  // Form logic
  const formik = useFormik({
    initialValues: {
      name: userData.username,
      date: formatDate(new Date()),
      rating: "",
      description: "",
    },
    validate,
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/testimonies`,
          {
            method: "POST",
            headers: {
              "x-access-token": userData.accessToken,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: userData.username,
              date: formatDate(new Date()),
              rating: values.rating,
              description: values.description,
            }),
          }
        );
        const data = await response.json();
        console.log(data);

        // Show success alert
        Swal.fire({
          icon: "success",
          title: "New testimony added successfully!",
          text: "You will be redirected to the testimonial page.",
          timer: 3000, // 3 seconds
        }).then(() => {
          // Redirect to the testimonial page
          navigate("/testimonial");
        });
      } catch (error) {
        // Handle add service error
        console.error("Error add testimonial:", error);
        Swal.fire({
          icon: "error",
          title: "Error add new testimonial",
          text: "Please try again later.",
        });
      } finally {
        setIsLoading(false);
      }
    },
  });

  const handleAddTestimonial = async () => {
    // This function should be defined outside of the useFormik callback
    formik.handleSubmit();
  };

  return userData && userData.roles && userData.roles.includes("ROLE_USER") ? (
    <div className="testimonial-add w-100 min-vh-100">
      <Container>
        <div className="position-absolute top-50 start-50 translate-middle form-box">
          <form onSubmit={formik.handleSubmit}>
            <h3 className="text-center mb-5">Kesan & Pesan Konsumen</h3>
            <div className="mb-3">
              <label className="form-label">rating</label>
              <input
                className="form-control"
                autoFocus
                type="number"
                placeholder="Contoh : (5)"
                id="rating"
                name="rating"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.rating}
              />
              {formik.touched.rating && formik.errors.rating ? (
                <div className="error">{formik.errors.rating}</div>
              ) : null}
            </div>
            <div className="mb-3">
              <label className="form-label">Kesan dan Pesan Anda</label>
              <input
                className="form-control"
                type="text"
                placeholder="Contoh : (Layanan yang diberikan sangat bagus, blablabla.)"
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

            <div className="mt-4">
              <button
                type="button"
                className="btn btn-success"
                disabled={isLoading}
                onClick={handleAddTestimonial}
              >
                {isLoading ? "Loading..." : "Submit"}
              </button>
              <button
                type="button"
                onClick={() => navigate("/testimonial")}
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

export default AddTestimonial;
