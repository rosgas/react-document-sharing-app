import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import Profile from "../pages/Profile";
import logoIcon from "../assets/png/icons8-shared-folder-64.png";

function Sidebar() {
  const auth = getAuth();
  const navigate = useNavigate();
  const onLogout = () => {
    auth.signOut(navigate("/"));
  };

  return (
    <>
      <div id="sidebar">
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
        <button
          type="button"
          className="btn btn-sidebar logout"
          onClick={onLogout}
        >
          Logout
        </button>
      </div>
    </>
  );
}

export default Sidebar;
