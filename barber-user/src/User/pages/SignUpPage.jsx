import "../assets/css/signUpPage.css";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useState } from "react";
import Swal from "sweetalert2";

const validate = (values) => {
  const errors = {};

  if (!values.userName) {
    errors.userName = "Required!";
  } else if (values.userName.length < 5) {
    errors.userName = "Must be 5 characters or more!";
  } else if (values.userName.length > 225) {
    errors.userName = "maximum 225 characters!";
  }

  if (!values.email) {
    errors.email = "Required!";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address!";
  }

  if (!values.phone) {
    errors.phone = "Required!";
  } else if (
    !/^\+?([0-9]{4})\)?[-.●]?([0-9]{4})[-.●]?([0-9]{4})$/.test(values.phone)
  ) {
    errors.phone = "Invalid phone number!";
  }

  if (!values.password) {
    errors.password = "Required!";
  } else if (values.password.length < 3) {
    errors.password = "Must be 3 characters or more!";
  }

  return errors;
};

const SignUpPage = () => {
  let navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      phone: "",
      password: "",
    },
    validate,
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/auth/signup`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: values.userName,
              email: values.email,
              phone: values.phone,
              password: values.password,
            }),
          }
        );
        const data = await response.json();
        console.log(data);
        if (data.message && data.message.toLowerCase().includes("failed")) {
          console.error("Error signing up:", 400);
          Swal.fire({
            icon: "error",
            title: "Failed signing up",
            text: "Username or email or phone number has been used!",
          });
          return;
        }
        // Show success alert
        Swal.fire({
          icon: "success",
          title: "Sign up successful!",
          text: "You will be redirected to the sign in page.",
          timer: 3000, // 3 seconds
        }).then(() => {
          // Redirect to the sign in page
          navigate("/signin");
        });
      } catch (error) {
        // Handle sign-up error
        console.error("Error signing up:", error);
        Swal.fire({
          icon: "error",
          title: "Error signing up",
          text: "Please try again later.",
        });
      } finally {
        setIsLoading(false);
      }
    },
  });

  const handleSignUp = async () => {
    // This function should be defined outside of the useFormik callback
    formik.handleSubmit();
  };

  return (
    <div className="signup w-100 min-vh-100">
      <Container>
        <div className="position-absolute top-50 start-50 translate-middle form-box">
          <form onSubmit={formik.handleSubmit}>
            <div className="d-flex justify-content-center logo-box">
              <div className="logo rounded-circle d-flex justify-content-center">
                <img
                  src="./brand-transparent.webp"
                  width={"75px"}
                  height={"40px"}
                  alt="Forever Barbershop"
                />
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                className="form-control"
                autoFocus
                type="text"
                id="userName"
                name="userName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.userName}
              />
              {formik.touched.userName && formik.errors.userName ? (
                <div className="error">{formik.errors.userName}</div>
              ) : null}
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                className="form-control"
                type="email"
                id="email"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="error">{formik.errors.email}</div>
              ) : null}
            </div>
            <div className="mb-3">
              <label className="form-label">Phone Number</label>
              <input
                className="form-control"
                type="text"
                id="phone"
                name="phone"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone}
              />
              {formik.touched.phone && formik.errors.phone ? (
                <div className="error">{formik.errors.phone}</div>
              ) : null}
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                className="form-control"
                type="password"
                id="password"
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="error">{formik.errors.password}</div>
              ) : null}
            </div>

            <div className="mb-4">
              <p>
                already have account? <a href="/signin"> Sign in</a>
              </p>
            </div>

            <div className="mt-4">
              <button
                type="button"
                className="btn btn-success"
                disabled={isLoading}
                onClick={handleSignUp}
              >
                {isLoading ? "Loading..." : "Submit"}
              </button>
              <button
                type="button"
                onClick={() => navigate("/")}
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

export default SignUpPage;
