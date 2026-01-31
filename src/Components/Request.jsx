import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addRequestReceived } from "../store/requestReceivedSlice";
import Connections from "./Connections";

const Request = () => {
  const request = useSelector((store) => store.requestReceived);
  console.log(request);

  const dispatch = useDispatch();
  const fetchConnectionRequest = async () => {
    try {
      let res = await axios.get(BASE_URL + "/user/request/received", {
        withCredentials: true,
      });
      dispatch(addRequestReceived(res?.data?.connections));
    } catch (err) {
      console.log(err.response.data);
    }
  };

  useEffect(() => {
    fetchConnectionRequest();
  }, []);

  const handleConnectionStatus = async (status, id) => {
    try {
      await axios.post(
        BASE_URL + "/request/review/" + status + "/" + id,
        {},
        { withCredentials: true },
      );
      const removeFromRequest = request.filter((user) => user._id !== id);
      dispatch(addRequestReceived(removeFromRequest));
    } catch (err) {
      console.log(err);
    }
  };

  if (!request) return;
  if (request.length === 0)
    return (
      <div>
        <p>No Request Received</p>
      </div>
    );
  return (
    <div className="max-w-2/5  mx-auto my-6">
      <h2 className="text-center text-xl font-semibold">Connection Requests</h2>
      {request.map((user) => {
        return (
          <div
            key={user._id}
            className="flex flex-row   justify-between items-center px-6 py-2 bg-base-300 rounded-lg my-2 shadow-md shadow-base-200 "
          >
            <img
              className="w-19 h-19 rounded-full"
              alt="photo"
              src={user.fromUserId.photoURL}
            />
            <ul>
              <li className="text-xl font-semibold ">
                {user.fromUserId.firstName + " " + user.fromUserId.lastName}
              </li>
              {user.age && user.gender && (
                <li>{user.fromUserId.age + "," + user.fromUserId.gender}</li>
              )}
              <li>{user.fromUserId.about.slice(0, 30) + "..."}</li>
            </ul>
            <div className="card-actions flex gap-4 my-auto   ">
              <button
                className="btn btn-success"
                onClick={() => handleConnectionStatus("accepted", user._id)}
              >
                accept
              </button>
              <button
                className="btn btn-error w-19 "
                onClick={() => handleConnectionStatus("rejected", user._id)}
              >
                reject
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Request;
