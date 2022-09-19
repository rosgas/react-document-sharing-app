import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./pages/PrivateRoute";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import GalleryItem from "./components/GalleryItem";
import CollectionItems from "./components/CollectionItems";
import Modal from "./components/Modal";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/u" element={<PrivateRoute />}>
            <Route path="gallery" element={<CollectionItems />}>
              <Route path="create-document" element={<Modal />} />
            </Route>
            <Route exact path="document/:id" element={<GalleryItem />} />
          </Route>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
