import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import Body from "./Components_temp/Body";
import Login from "./Components_temp/Login";
import Profile from "./Components_temp/Profile";
import { Provider } from "react-redux";
import appStore from "./store/appStore";
import Feed from "./Components_temp/Feed";
import Connections from "./Components_temp/Connections";
import Request from "./Components_temp/Request";
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
