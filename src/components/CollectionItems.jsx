import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { doc, getDocs, query, orderBy, collection } from "firebase/firestore";
import { db } from "../firebase.config";
import CollectionItem from "./CollectionItem";
import Spinner from "./Spinner";

function CollectionItems() {
  const [loading, setLoading] = useState(true);
  const [collections, setCollections] = useState();
  /* const [isShown, setIsShown] = useState(true); */

  const auth = getAuth();

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "designs"));

        const collections = [];

        querySnapshot.forEach((doc) => {
          return collections.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setCollections(collections);
        setLoading(false);
        console.log(collections);
      } catch (error) {
        console.log("Could not fetch collections");
      }
    };

    fetchCollections();
  }, []);

  if (!loading) {
    return (
      <>
        <div className="collections-items">
          {collections.map((item) => (
            <CollectionItem
              item={item.data.dataCopy}
              id={item.id}
              key={item.id}
            />
          ))}
          {/* {isShown &&
            collections.map((item) => (
              <CollectionItem
                item={item.data.dataCopy}
                id={item.id}
                key={item.id}
                setIsShown={setIsShown}
              />
            ))} */}
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="relative">
          <Spinner />
        </div>
      </>
    );
  }
}

export default CollectionItems;
