import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase.config";

function Profile() {
  const auth = getAuth();
  const [userDetails, setUserDetails] = useState({
    fullName: "",
    jobTitle: "",
    email: "",
  });

  const { fullName, jobTitle, email } = userDetails;

  useEffect(() => {
    const fetchuserFormData = async () => {
      const userRef = doc(db, "users", auth.currentUser.uid);
      const docSnap = await getDoc(userRef);
      const userData = docSnap.data().userFormData;

      if (docSnap.exists()) {
        setUserDetails({
          fullName: userData.name,
          jobTitle: userData.jobTitle,
          email: userData.email,
        });
      } else {
        console.log("No such document!");
      }
    };

    fetchuserFormData();
  }, [auth.currentUser.uid]);

  const navigate = useNavigate();

  const onLogout = () => {
    auth.signOut(navigate("/"));
  };

  return (
    <div className="profile">
      <header>
        <h2>My profile</h2>
        <p>{fullName}</p>
        <p>{jobTitle}</p>
        <p>{email}</p>
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
