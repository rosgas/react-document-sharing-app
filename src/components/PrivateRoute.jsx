import { useState, useEffect } from "react";
import { Navigate, Outlet, Link, useNavigate } from "react-router-dom";
import { useAuthStatus } from "../hooks/useAuthStatus";
import Spinner from "./Spinner";
import ProfileNav from "./ProfileNav";
import Sidebar from "./Sidebar";
import arrowDown from "../assets/svg/arrow-down-triangle.svg";
import plusIcon from "../assets/svg/plus.svg";
import CollectionItems from "./CollectionItems";
import GalleryItem from "./GalleryItem";
import Modal from "./Modal";

const PrivateRoute = () => {
  const { loggedIn, checkingStatus } = useAuthStatus();
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    navigate("/u/gallery");
  }, []);

  const openModal = () => {
    setIsOpen(true);
    navigate("/u/gallery/create-document");
  };

  if (checkingStatus) {
    return <Spinner />;
  }

  if (loggedIn) {
    return (
      <div className="container">
        {isOpen && <Modal setIsOpen={setIsOpen} />}
        <ProfileNav />
        <Sidebar />
        <section className="collections">
          <div className="fixed">
            <div className="flex">
              <div className="collection-name">
                <h3>All Designs</h3>
                <img src={arrowDown} style={{ cursor: "pointer" }} />
              </div>
              <button
                className="btn btn-main add-btn btn-small"
                onClick={openModal}
              >
                <img src={plusIcon} height="16px" />
                Add new
              </button>
            </div>
            <div className="line"></div>
          </div>
          <div>
            <Outlet />
          </div>
        </section>
      </div>
    );
  } else {
    return <Navigate to="/" />;
  }
};

export default PrivateRoute;
