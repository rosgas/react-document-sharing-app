import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import logoIcon from "../assets/png/icons8-shared-folder-64.png";
import visibilityIcon from "../assets/svg/visibility.svg";

function SignIn() {
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;
  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (userCredential.user) {
        navigate("/profile");
      }
    } catch (error) {
      setErrorMessage("Incorrect email address or password");
    }
  };

  return (
    <>
      <div className="home-container">
        <div id="logo">
          <img
            src={logoIcon}
            alt=""
            style={{
              transform: "scale(0.6) translateX(10px)translateY(35px)",
            }}
          />
          <p className="title" style={{ fontSize: "24px" }}>
            ShareDoc
          </p>
        </div>

        <div className="card-form sign-in-form">
          <header>
            <h3 className="title fs-38 mb-15">Sign in</h3>
            <p className="c-medium-grey fs-16">
              Lorem ipsum dolor sit amet consectetur adipisicing elit enim non
              magni. <br /> Officiis iusto quisquam facilis ratione asperiores.
            </p>
          </header>
          <form onSubmit={onSubmit}>
            {errorMessage && (
              <div className="error-box">
                <h1>{errorMessage}</h1>
              </div>
            )}
            <div className="form-group mb-15">
              <input
                autoComplete="off"
                type="email"
                id="email"
                value={email}
                onChange={onChange}
              />
              <label htmlFor="email">Email:</label>
            </div>

            <div className="form-group password-input">
              <input
                autoComplete="off"
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={onChange}
              />
              <label htmlFor="password">Password:</label>
              <img
                src={visibilityIcon}
                alt="show password"
                className="show-password"
                onClick={() => setShowPassword((prevState) => !prevState)}
              />
            </div>

            <Link to="/forgot-password" className="link forgot-password-link">
              Forgot password
            </Link>
            <button className="btn btn-main">Login</button>
          </form>

          <div className="sign-up">
            <p>
              Not registered?{" "}
              <Link to="/sign-up" className="link register-link">
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignIn;
