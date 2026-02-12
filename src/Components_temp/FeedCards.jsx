import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constant";
import { addFeed } from "../store/feedSlice";

const FeedCards = ({ user }) => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  if (!feed) return;
  const { _id, firstName, lastName, photoURL, about, age, gender } = user;

  const handleRequests = async (status, userId) => {
    try {
      await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true },
      );

      const removeUserFromFeed = feed.filter((user) => user._id !== _id);
      dispatch(addFeed(removeUserFromFeed));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    feed && (
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
              <button
                className="btn btn-error"
                onClick={() => handleRequests("ignored", _id)}
              >
                Ignore
              </button>
              <button
                className="btn btn-success"
                onClick={() => handleRequests("interested", _id)}
              >
                Interested
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default FeedCards;
