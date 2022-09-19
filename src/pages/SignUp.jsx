import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config";
import logoIcon from "../assets/png/icons8-shared-folder-64.png";
import visibilityIcon from "../assets/svg/visibility.svg";

function SignUp() {
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState();
  const [formData, setFormData] = useState({
    name: "",
    jobTitle: "",
    email: "",
    password: "",
  });

  const { email, password, name, jobTitle } = formData;

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
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      updateProfile(auth.currentUser, {
        displayName: name,
      });

      const userFormData = { ...formData };
      delete userFormData.password;
      userFormData.timestamp = serverTimestamp();

      await setDoc(doc(db, "users", user.uid), { userFormData });

      navigate("/u");
    } catch (error) {
      console.log(error);
      if (error.code == "auth/weak-password") {
        setErrorMessage("Password should be at least 6 characters");
      } else if (error.code == "auth/email-already-in-use") {
        setErrorMessage("Email already in use");
      } else setErrorMessage("An error as occured. Please try again");
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

        <div className="card-form sign-up-form">
          <header>
            <h3 className="title fs-38 mb-15">Create account</h3>
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
                type="text"
                id="name"
                value={name}
                onChange={onChange}
              />
              <label htmlFor="name">Full name:</label>
            </div>
            <div className="form-group mb-15">
              <input
                autoComplete="off"
                type="text"
                id="jobTitle"
                value={jobTitle}
                onChange={onChange}
              />
              <label htmlFor="jobTitle">Job title:</label>
            </div>
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

            <button className="btn btn-main">Register</button>
          </form>

          <div className="sign-in">
            <p>
              Already have an account?{" "}
              <Link to="/" className="link register-link">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
