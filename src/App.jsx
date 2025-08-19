import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import CreateBlog from "./pages/CreateBlog";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { url } from "./constants/config";
import { userExist, userNotExist } from "./redux/reducers/auth";
import Loader from "./components/Loader";
import ProtectedRoute from "../../../Chatterly/chatterly-frontend/src/components/auth/ProtectedRoute";
import BlogDetails from "./pages/BlogDetails";
import MyBlogs from "./pages/MyBlogs";

const App = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);
  useEffect(() => {
    axios
      .get(`${url}/users/me`, { withCredentials: true })
      .then(({ data }) => {
        dispatch(userExist(data?.user));
      })
      .catch(() => {
        dispatch(userNotExist());
      });
  }, []);

  if (loading) return <Loader />;
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route element={<ProtectedRoute user={user} redirect="/" />}>
          <Route path="/create" element={<CreateBlog />} />
          <Route path="/blogs" element={<MyBlogs />} />
        </Route>
        <Route path="/blogs/:id" element={<BlogDetails />} />
        <Route
          path="/login"
          element={
            <ProtectedRoute user={!user} redirect="/">
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path="/register"
          element={
            <ProtectedRoute user={!user} redirect="/">
              <Signup />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Toaster />
    </Router>
  );
};

export default App;
