import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import FeedCards from "./FeedCards";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";
import { useNavigate } from "react-router";
const EditProfile = (user) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState(user?.user?.firstName);
  const [lastName, setLastName] = useState(user?.user?.lastName);
  const [age, setAge] = useState(user?.user?.age || "");
  const [about, setAbout] = useState(user?.user?.about);
  const [gender, setGender] = useState(user?.user?.gender || "");
  const [photoURL, setPhotoUrl] = useState(user?.user?.photoURL);
  const [error, setError] = useState("");
  const [toast, setToast] = useState(false);

  const handleSave = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, age, about, gender, photoURL },
        { withCredentials: true },
      );
      dispatch(addUser(res?.data?.data));
      setToast(true);

      setTimeout(() => {
        setToast(false);
      }, 3000);
      navigate("/");
    } catch (err) {
      setError(err?.response?.data);
    }
  };
  return (
    <div className="flex gap-4 justify-center my-3">
      <div className="card w-90 bg-base-300 card-md shadow-sm ">
        <div className="card-body">
          <h2 className="card-title">
            Edit Profile{" "}
            <span>
              <FaEdit />
            </span>
          </h2>
          <fieldset className="fieldset">
            <legend className="fieldset-legend ">FirstName</legend>
            <input
              type="text"
              className="input"
              placeholder="Type here"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend ">Last Name</legend>
            <input
              type="text"
              className="input"
              placeholder="Type here"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend ">PhotoUrl</legend>
            <input
              type="text"
              className="input"
              placeholder="Type here"
              value={photoURL}
              onChange={(e) => setPhotoUrl(e.target.value)}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend ">Gender</legend>
            <input
              type="text"
              className="input"
              placeholder="Type here"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend ">Age</legend>
            <input
              type="text"
              className="input"
              placeholder="Type here"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend ">About</legend>
            <input
              type="text"
              className="input"
              placeholder="Type here"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />
          </fieldset>
          <p className="text-red-500 my-1">{error}</p>
          <div className="card-actions flex justify-center">
            <button className="btn btn-primary" onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      </div>
      <div>
        <div>
          <div className="card bg-base-300 w-92 shadow-sm">
            <figure className=" pt-5">
              <img src={photoURL} alt={firstName} className=" h-54 w-54" />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">{firstName + " " + lastName}</h2>
              {age && gender && <p>{age + " " + gender}</p>}
              <p>{about}</p>
              <div className="card-actions">
                <button className="btn btn-error">Ignore</button>
                <button className="btn btn-success">Interested</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {toast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Changes saved successfully</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
