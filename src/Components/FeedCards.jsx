import React from "react";

const FeedCards = ({ user }) => {
  const { firstName, lastName, photoURL, about, age, gender } = user;

  return (
    <div>
      <div className="card bg-base-300 w-92 shadow-sm">
        <figure className=" pt-5">
          <img src={photoURL} alt={firstName} className=" h-64 w-64" />
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
  );
};

export default FeedCards;
