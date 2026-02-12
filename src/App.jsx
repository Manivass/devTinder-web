import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Body from "./Components/Body.jsx";
import Login from "./Components/Login.jsx";
import Profile from "./Components/Profile.jsx";
import { Provider } from "react-redux";
import appStore from "./store/appStore";
import Feed from "./Components/Feed.jsx";
import Connections from "./Components/Connections.jsx";
import Request from "./Components/Request.jsx";
const App = () => {
  return (
    <div>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<Feed />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/connections" element={<Connections />} />
              <Route path="/request/received" element={<Request />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
};

export default App;
