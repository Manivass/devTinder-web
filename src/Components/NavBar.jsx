import { useDispatch, useSelector } from "react-redux";
import logo from "../img/logo.png";
import { Link, useNavigate } from "react-router";
import { removeUser } from "../store/userSlice";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
const Navbar = () => {
  const user = useSelector((store) => store.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogOut = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  const handleFeed = () => {
    if (user) {
      navigate("/");
    }
  };
  return (
    <div className="navbar bg-base-200 shadow-sm min-h-20">
      <div className="flex-1">
        <a onClick={handleFeed} className="btn btn-ghost text-xl">
          <img className="w-32" src={logo} />
        </a>
      </div>
      {user && (
        <div className="flex">
          <div className=" my-auto  text-xl ">Welcome , {user.firstName}</div>
          <div className="dropdown dropdown-end mx-6">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="photoUrl" src={user.photoURL} />
              </div>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link to="/connections">Connections</Link>
              </li>
              <li>
                <Link to="/request/received">Requests</Link>
              </li>
              <li>
                <a onClick={handleLogOut}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
