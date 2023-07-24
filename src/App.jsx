import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login/Login";
import HomePage from "./components/HomePage/HomePage";
import HomeAfterStart from "./components/HomeAfterParking/HomeAfterStart";
import Profile from "./components/Profile/Profile";

function App() {
  return (
    <Routes>
      <Route index element={<Login />}></Route>
      <Route path="homePage" element={<HomePage />}></Route>
      <Route path="homePageAfterStart" element={<HomeAfterStart />}></Route>
      <Route path="Profile" element={<Profile />}></Route>
    </Routes>
  );
}

export default App;
