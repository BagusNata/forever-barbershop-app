import "../../assets/adminAdd.css";
import { useUserContext } from "../../../UserContext";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useState } from "react";
import Swal from "sweetalert2";

const validate = (values) => {
  const errors = {};
  if (!values.time) {
    errors.time = "Required!";
  }

  return errors;
};

const AdminAddSession = () => {
  let navigate = useNavigate();
  const { userData } = useUserContext();
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      time: "",
    },
    validate,
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/sessions`,
          {
            method: "POST",
            headers: {
              "x-access-token": userData.accessToken,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              time: values.time,
            }),
          }
        );
        const data = await response.json();
        console.log(data);
        if (data.message && data.message.toLowerCase().includes("failed")) {
          console.error("Error add session:", 400);
          Swal.fire({
            icon: "error",
            title: "Failed add new session",
            text: "Failed! Gender does not exist!",
          });
          return;
        }
        // Show success alert
        Swal.fire({
          icon: "success",
          title: "New session added successfully!",
          text: "You will be redirected to the admin session page.",
          timer: 3000, // 3 seconds
        }).then(() => {
          // Redirect to the admin session page
          navigate("/admin/sessions");
        });
      } catch (error) {
        // Handle add session error
        console.error("Error add session:", error);
        Swal.fire({
          icon: "error",
          title: "Error add new session",
          text: "Please try again later.",
        });
      } finally {
        setIsLoading(false);
      }
    },
  });

  const handleAddSession = async () => {
    // This function should be defined outside of the useFormik callback
    formik.handleSubmit();
  };

  return (
    <div className="admin-add w-100 min-vh-100">
      <Container>
        <div className="position-absolute top-50 start-50 translate-middle form-box">
          <form onSubmit={formik.handleSubmit}>
            <h3 className="text-center mb-5">Tambah Sesi Booking</h3>
            <div className="mb-3">
              <label className="form-label">Jam</label>
              <input
                className="form-control"
                type="number"
                placeholder="Contoh : (10 = 10:00, 11 = 11:00, 12 = 12:00)"
                id="time"
                name="time"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.time}
              />
              {formik.touched.time && formik.errors.time ? (
                <div className="error">{formik.errors.time}</div>
              ) : null}
            </div>

            <div className="mt-4">
              <button
                type="button"
                className="btn btn-success"
                disabled={isLoading}
                onClick={handleAddSession}
              >
                {isLoading ? "Loading..." : "Submit"}
              </button>
              <button
                type="button"
                onClick={() => navigate("/admin/sessions")}
                className="btn btn-outline-danger"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default AdminAddSession;
