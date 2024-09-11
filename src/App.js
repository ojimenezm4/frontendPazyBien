import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home/homes";
import Login from "./components/auth/Login";
import DashBoard from "./components/dashBoard/DashBoard";
import PrivateRoute from "./components/privateRoute/PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashBoard />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
