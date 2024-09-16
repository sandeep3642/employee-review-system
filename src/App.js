import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./component/Home";
import "./App.css";
import AddEmployee from "./component/AddEmployee";
import Login from "./component/login";
import EditEmployee from "./component/EditEmployee";
import ViewEmployee from "./component/viewEmployee";


function App() {
  return (
    <div className="App">
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/addEmployee" element={<AddEmployee />} />
        <Route path="/editEmployee/:id" element={<EditEmployee />} />{" "}
        <Route path="/ViewEmployee/:id" element={<ViewEmployee />} />{" "}


      </Routes>
    </Router>
  </div> 
  );
}

export default App;
