// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar.jsx";

import Home from "./pages/Home.jsx";
import ActivitiesIndex from "./pages/ActivitiesIndex.jsx";
import ActivityPage from "./pages/ActivityPage.jsx";
import UnitsIndex from "./pages/UnitsIndex.jsx";
import UnitPage from "./pages/UnitPage.jsx";
import ForTeachers from "./pages/ForTeachers.jsx";
import About from "./pages/About.jsx";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/activities" element={<ActivitiesIndex />} />
        <Route path="/activities/:slug" element={<ActivityPage />} />
        <Route path="/units" element={<UnitsIndex />} />
        <Route path="/units/:slug" element={<UnitPage />} />
        <Route path="/teachers" element={<ForTeachers />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
