import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login/Login";
import HomePage from "./components/HomePage/HomePage";
import HomeAfterStart from "./components/HomeAfterParking/HomeAfterStart";
import Profile from "./components/Profile/Profile";
import AddParking from "./components/AddParking/AddParking";


function App() {
  return (
    <div className="app-container">
    <Routes>
      <Route index element={<Login />}></Route>
      <Route path="homePage" element={<HomePage />}></Route>
      <Route path="homePageAfterStart" element={<HomeAfterStart />}></Route>
      <Route path="Profile" element={<Profile />}></Route>
      <Route path="addParking" element={<AddParking />}></Route>
    </Routes>
    </div>
  );
}

export default App;
