import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import Account from "../components/Account";
import ProfileNav from "../components/ProfileNav";
import Sidebar from "../components/Sidebar";
import Modal from "../components/Modal";
import CollectionItems from "../components/CollectionItems";
import arrowDown from "../assets/svg/arrow-down-triangle.svg";
import plusIcon from "../assets/svg/plus.svg";

function Profile() {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    navigate("/profile/gallery");
  }, []);

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
              onClick={() => setIsOpen(true)}
            >
              <img src={plusIcon} height="16px" />
              Add new
            </button>
          </div>
          <div className="line"></div>
        </div>
        <CollectionItems />
      </section>
    </div>
  );
}

export default Profile;
