import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase.config";

function GalleryItem() {
  const { id } = useParams();

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const userRef = doc(db, "designs", id);
        const docSnap = await getDoc(userRef);
        const itemData = docSnap.data();

        if (docSnap.exists()) {
          console.log("ross");
        }
      } catch (error) {
        console.log("Could not fetch collections");
      }
    };

    fetchItem();
  }, []);

  return <div className="absolute">ciao</div>;
}

export default GalleryItem;
