import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Provider from "../pages/Provider";

function Routers() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/home" element={<Home />} />
      <Route path="/provider" element={<Provider />} />
    </Routes>
  );
}

export default Routers;
