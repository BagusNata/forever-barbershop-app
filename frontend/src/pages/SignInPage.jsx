import "../dist/css/SignInPage.css";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";

const SignInPage = () => {
  let navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

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
            </div>

            <div className="mb-4">
              <p>
                don&apos;t have account? <a href="/signup"> Sign up</a>
              </p>
            </div>

            <div className="mt-4">
              <button type="submit" className="btn btn-success">
                Submit
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

export default SignInPage;
