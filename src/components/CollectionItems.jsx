import { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase.config";
import CollectionItem from "./CollectionItem";
import Spinner from "./Spinner";

function CollectionItems() {
  const [loading, setLoading] = useState(true);
  const [collections, setCollections] = useState();

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
      } catch (error) {
        console.log("Could not fetch collections");
      }
    };

    fetchCollections();
  }, []);

  if (!loading) {
    return (
      <>
        <div className="collection-items">
          {collections.map((item) => (
            <CollectionItem
              item={item.data.dataCopy}
              id={item.id}
              key={item.id}
            />
          ))}
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
