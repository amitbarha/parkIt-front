import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route index element={<Login />}></Route>
      <Route path="/" element={<Layout />}>
        <Route path="homePage" element={<HomePage />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
