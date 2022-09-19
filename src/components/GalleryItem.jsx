import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import CommentsBox from "./CommentsBox";
import shareIcon from "../assets/svg/share.svg";

function GalleryItem() {
  const { id } = useParams();
  const [itemData, setItemData] = useState({
    description: "",
    email: "",
    fullName: "",
    imgUrl: "",
    jobTitle: "",
    name: "",
    project: "",
  });

  const name = itemData.fullName;
  const firstLetterName = name.charAt(0);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const designRef = doc(db, "designs", id);
        const docSnap = await getDoc(designRef);
        const docData = docSnap.data().dataCopy;

        if (docSnap.exists()) {
          setItemData({
            description: docData.description,
            email: docData.email,
            fullName: docData.fullName,
            imgUrl: docData.imgUrl,
            jobTitle: docData.jobTitle,
            name: docData.name,
            project: docData.project,
          });
        }
      } catch (error) {
        console.log("Could not fetch collections");
      }
    };

    fetchItem();
  }, []);

  return (
    <>
      <div className="doc-container">
        <div className="doc-content">
          <div className="doc-image">
            <img src={itemData.imgUrl} alt={itemData.name} />
          </div>
          <div className="doc-flex">
            <div className="author-image">{firstLetterName}</div>
            <div>
              <p className="author-name title">{itemData.fullName}</p>
              <p className="author-job-title">{itemData.jobTitle}</p>
            </div>
            <div className="share">
              <img src={shareIcon} height="26px" width="26px" alt="" />
            </div>
          </div>
          <div className="doc-text">
            <h4 className="doc-title">{itemData.name}</h4>
            <h5 className="doc-subtitle">{itemData.project}</h5>
            <p className="doc-description">{itemData.description}</p>
          </div>
          <div className="doc-attachment ">
            <button className="attachment-btn">Attachment A</button>
            <button className="attachment-btn">Attachment B</button>
            <button className="attachment-btn">Attachment C</button>
          </div>
        </div>
        <CommentsBox docId={id} />
      </div>
    </>
  );
}

export default GalleryItem;
