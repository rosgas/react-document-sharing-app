import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import logoIcon from "../assets/png/icons8-shared-folder-64.png";
import compassIcon from "../assets/svg/compass.svg";
import teamIcon from "../assets/svg/team.svg";
import dashboardIcon from "../assets/svg/dash.svg";

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

        <div className="actions">
          <div className="line mb-15"></div>
          <button type="button" className="btn btn-sidebar btn-top">
            <img src={dashboardIcon} alt="" /> Dashboard
          </button>
          <button type="button" className="btn btn-sidebar btn-top">
            <img src={teamIcon} alt="" /> Teams
          </button>
          <button type="button" className="btn btn-sidebar btn-bottom">
            <img src={compassIcon} alt="" /> My docs
          </button>
          <button
            type="button"
            className="btn btn-sidebar logout"
            onClick={onLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
