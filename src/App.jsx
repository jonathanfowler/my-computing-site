// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar.jsx";

import Home from "./pages/Home.jsx";
import ActivitiesIndex from "./pages/ActivitiesIndex.jsx";
import ForTeachers from "./pages/ForTeachers.jsx";
import About from "./pages/About.jsx";

import AiLiteracyBasics from "./activities/AiLiteracyBasics.jsx";
import BinaryBasics from "./activities/BinaryBasics.jsx";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/activities" element={<ActivitiesIndex />} />
        <Route
          path="/activities/ai-literacy-basics"
          element={<AiLiteracyBasics />}
        />
        <Route
          path="/activities/binary-basics"
          element={<BinaryBasics />}
        />
        <Route path="/teachers" element={<ForTeachers />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

