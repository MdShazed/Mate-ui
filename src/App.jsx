import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import JoinPage from "./component/join/Join";
import ChatBox from "./component/chatbox/Chatbox";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<JoinPage />} />
          <Route path="/chat" exact element={<ChatBox />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
