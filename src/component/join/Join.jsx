import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./sass/join.css";

const ENDPOINT = "http://localhost:3000";

const JoinPage = () => {
  const [name, setName] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = (event) => {
    let nameInput = document.getElementById("name");
    if (nameInput.value === "") {
      event.preventDefault();
      alert("Enter your name");
    } else {
      sessionStorage.setItem("name", nameInput.value);
    }
  };

  return (
    <div className="main_join">
      <form>
        <div className="header">
          <h1>MATE</h1>
          <p>{`chat here online 🟢`}</p>
        </div>
        <input
          type="text"
          id="name"
          className="spacing"
          value={name}
          onChange={handleNameChange}
          placeholder="Enter your name"
        />

        <Link to="/chat">
          <button type="submit" className="spacing" onClick={handleSubmit}>
            Join
          </button>
        </Link>
      </form>
    </div>
  );
};

export default JoinPage;
