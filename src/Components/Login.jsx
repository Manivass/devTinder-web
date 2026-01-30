import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";
import { useNavigate } from "react-router";
import { BASE_URL } from "../utils/constant";
const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogIn = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true },
      );
      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      setError(err?.response?.data);
    }
  };
  return (
    <div className="flex justify-center my-20">
      <div className="card w-96 bg-base-300 card-lg shadow-sm">
        <div className="card-body">
          <h2 className="card-title text-2xl justify-center ">Login</h2>
          <div className="">
            <fieldset className="fieldset my-3">
              <legend className="fieldset-legend">EmailId</legend>
              <input
                type="text"
                className="input"
                placeholder="Type here"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset mb-1">
              <legend className="fieldset-legend">Password</legend>
              <input
                type="password"
                className="input"
                placeholder="Type here"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </fieldset>
          </div>
          <p className="text-sm text-red-400">{error}</p>
          <div className="justify-center card-actions">
            <button className="btn btn-primary" onClick={handleLogIn}>
              Login
            </button>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Login;
