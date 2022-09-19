import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

function Modal({ setIsOpen }) {
  const [formData, setFormData] = useState({
    project: "",
    name: "",
    description: "",
  });

  const [userDetails, setUserDetails] = useState({
    fullName: "",
    jobTitle: "",
    email: "",
  });

  const { project, name, description } = formData;

  const auth = getAuth();
  const navigate = useNavigate();
  const isMounted = useRef(true);

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

  useEffect(() => {
    if (isMounted) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setFormData({ ...formData, userRef: user.uid });
        } else {
          navigate("/");
        }
      });
    }

    return () => {
      isMounted.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted]);

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    const storage = getStorage();
    const file = e.target[3]?.files[0];
    const fileName = `${auth.currentUser.uid}-${file.name}-${uuidv4()}`;

    if (!file) return;

    const storageRef = ref(storage, `files/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log(downloadURL);
          const dataCopy = {
            ...userDetails,
            ...formData,
            timestamp: serverTimestamp(),
            imgUrl: downloadURL.toString(),
          };

          console.log(dataCopy);

          addDoc(collection(db, "designs"), { dataCopy });
        });
      }
    );

    setIsOpen(false);
    navigate("/u/gallery");
  };

  const onMutate = (e) => {
    /* Text */
    if (!e.target.file) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: e.target.value,
      }));
    }
  };

  return (
    <>
      <Link
        to="/u/gallery"
        className="bg-dark"
        onClick={() => setIsOpen(false)}
      ></Link>
      <form className="design-form" onSubmit={onSubmit}>
        <h5 className="title fs-24 mb-25">Add new design</h5>
        <div className="form-group">
          <input
            autoComplete="off"
            type="text"
            id="project"
            value={project}
            onChange={onMutate}
            required
          />
          <label htmlFor="project">Project:</label>
        </div>
        <div className="form-group">
          <input
            autoComplete="off"
            type="name"
            id="name"
            value={name}
            onChange={onMutate}
            required
          />
          <label htmlFor="name">Name:</label>
        </div>
        <div className="form-group">
          <textarea
            value={description}
            id="description"
            onChange={onMutate}
            rows="4"
            cols="50"
            required
          ></textarea>
          <label htmlFor="name">Description:</label>
        </div>
        <div className="form-group">
          <input type="file" id="img" accept=".jpg,.png,.jpeg" required />
          <label htmlFor="img">Image:</label>
        </div>
        <div className="btns">
          <Link
            to="/u/gallery"
            className="btn-basic"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Link>
          <button to="/u/gallery" className="btn btn-main btn-small">
            Add
          </button>
        </div>
      </form>
    </>
  );
}

export default Modal;
