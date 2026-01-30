import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../store/feedSlice";
import FeedCards from "./FeedCards";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  const getFeed = async () => {
    try {
      if (feed) return;
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.feed));
    } catch (err) {
      console.log(err?.response?.data);
    }
  };
  useEffect(() => {
    getFeed();
  }, []);
  if (!feed) return;
  if (feed.length === 0)
    return (
      <div>
        <p className="text-md">No Users found</p>
      </div>
    );
  return (
    <div className="flex justify-center my-8">
      <FeedCards user={feed[0]} />
    </div>
  );
};

export default Feed;
