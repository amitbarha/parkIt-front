import { Route, Routes } from "react-router-dom";
import { useState, createContext } from "react";
import "./App.css";
import Login from "./components/Login/Login";
import HomePage from "./components/HomePage/HomePage";
import Layout from "./components/Layout/Layout";
import Register from "./components/Register/Register";
import EditProfile from "./components/EditProfile/EditProfile";
import HomeAfterStart from "./components/HomeAfterParking/HomeAfterStart";
import Profile from "./components/Profile/Profile";
import AddParking from "./components/AddParking/AddParking";


export const modeContext = createContext();


function App() {
  const [colorMode, setColorMode] = useState("light");

  return (
 <modeContext.Provider value={{colorMode, setColorMode}}>
    <div className="app-container">
      <Routes>
        <Route index element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route element={<Layout />}>
          <Route index element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/EditProfile" element={<EditProfile />}></Route>
          <Route path="/homePage/:userId" element={<HomePage />}></Route>
          <Route path="homePage" element={<HomePage />}></Route>
          <Route path="homePageAfterStart" element={<HomeAfterStart />}></Route>
          <Route path="Profile" element={<Profile />}></Route>
          <Route path="addParking" element={<AddParking />}></Route>
          </Route>
        </Routes>
      </div>
    </modeContext.Provider>
  );
}

export default App;
