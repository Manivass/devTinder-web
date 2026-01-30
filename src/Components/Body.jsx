import { Outlet, useNavigate } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../store/userSlice";

const Body = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getUser = async () => {
    if (user) return;
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (err) {
      if (err.status === 401) {
        navigate("/login");
      } else {
        console.log(err.status);
      }
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Main content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};
export default Body;
