import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addConnectionsList } from "../store/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connections);

  const dispatch = useDispatch();
  const getConnections = async () => {
    try {
      let res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnectionsList(res?.data?.connector));
    } catch (err) {
      console.log(err?.response);
    }
  };
  useEffect(() => {
    getConnections();
  }, []);
  if (!connections) return;
  if (connections.length === 0)
    return (
      <div>
        <p>No connections found</p>
      </div>
    );
  return (
    <div className="mx-auto  max-w-175 my-2">
      <h2 className="text-2xl mb-3 text-center font-semibold">
        Connection List
      </h2>
      {connections.map((user) => {
        return (
          <div className="flex flex-row gap-5 px-6 py-5 bg-base-300 rounded-lg my-2 shadow-md shadow-base-200">
            <img className="w-19 h-19 rounded-full" src={user.photoURL} />
            <ul>
              <li className="text-xl font-semibold ">
                {user.firstName + " " + user.lastName}
              </li>
              {user.age && user.gender && (
                <li>{user.age + "," + user.gender}</li>
              )}
              <li>{user.about}</li>
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
