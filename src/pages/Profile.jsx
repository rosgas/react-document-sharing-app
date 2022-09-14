import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

function Profile() {
  const auth = getAuth();
  const [changeDetails, setChangeDetails] = useState();
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    jobTitle: auth.currentUser.jobTitle,
    email: auth.currentUser.email,
  });

  const { name, jobTitle, email } = formData;

  const navigate = useNavigate();

  const onLogout = () => {
    auth.signOut(navigate("/"));
  };

  return (
    <div className="profile">
      <header>
        <h2>My profile</h2>
        <button type="button" className="btn btn-main" onClick={onLogout}>
          Logout
        </button>
      </header>
    </div>
  );
}

export default Profile;

/* function Profile() {
  return <></>;
}

export default Profile; */
