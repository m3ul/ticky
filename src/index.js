import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Ticky from "./components/Ticky";
import HomePage from "./components/HomePage";
import Undercover from "./components/Undercover";
import "./index.css";

ReactDOM.render(
  <Router basename="/ticky">
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/ticky" element={<Ticky />} />
      <Route path="/undercover" element={<Undercover />} />
    </Routes>
  </Router>,
  document.getElementById("root"),
);
