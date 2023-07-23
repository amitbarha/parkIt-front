import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login/Login";
import Layout from "./components/Layout/Layout";
import HomePage from "./components/HomePage/HomePage";

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
