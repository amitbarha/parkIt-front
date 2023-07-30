import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useState, createContext, useEffect } from "react";
import Login from "./components/Login/Login";
import HomePage from "./components/HomePage/HomePage";
import Layout from "./components/Layout/Layout";
import Register from "./components/Register/Register";
import EditProfile from "./components/EditProfile/EditProfile";
import Profile from "./components/Profile/Profile";
import AddParking from "./components/AddParking/AddParking";
import SoloParking from "./components/SoloParking/SoloParking";
import FindParking from "./components/FindParking/FindParking";
import PayingHistory from "./components/PayingHistory/PayingHistory";
import NotFound from "./components/NotFound/NotFound";
import Onepick from "./components/ChoosenParking/Onepick";
import Receipt from "./components/Receipt/Receipt";
import * as React from "react"
import axios from "axios";

export const modeContext = createContext();
export const gooleAutoLocation = createContext();
export const CloudinaryContext = createContext();
export const userDataContext = createContext();
export const ChosenParkingContext = createContext();
const croods = {
  lat: "",
  lng: "",
  fullAddress: "",
};


function App() {
  const [colorMode, setColorMode] = useState("light");
  const [googleLocation, setGoogleLocation] = useState(croods);
  const [cloudinaryImg, setCloudinaryImg] = useState([]);
  const [userData, setUserData] = useState();
  const [openSpring, setOpenSpring] = useState(false);
  const [parkingId, setParkingId] = useState();
  const [parkingIdData, setParkingIdData] = useState();
  const mapToSpring = 
  {
    openSpring: openSpring,
    setOpenSpring: setOpenSpring,
    parkingId: parkingId,
    setParkingId: setParkingId
  }


  useEffect(() => {
  if(localStorage.getItem('loggedUser'))
  {
      axios
        .post("http://localhost:5000/user/translateToken",{token: localStorage.getItem('loggedUser') })
        .then(({ data }) => setUserData(data))
        .catch((err) => console.log(err.message));
    ;
  }
  },[])



  return (
    <userDataContext.Provider value={{userData, setUserData}}>
    <modeContext.Provider value={{ colorMode, setColorMode }}>
      <gooleAutoLocation.Provider value={{ googleLocation, setGoogleLocation }}>
        <CloudinaryContext.Provider value={{ cloudinaryImg, setCloudinaryImg }}>
          <ChosenParkingContext.Provider value={{openSpring, setOpenSpring, parkingId, setParkingId,parkingIdData, setParkingIdData}}>
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
                <Route path="Profile" element={<Profile />}></Route>
                <Route path="addParking" element={<AddParking />}></Route>
                <Route path="FindParking" element={<FindParking />}></Route>
                <Route path="FindParking/:parkingId" element={<Onepick />}></Route>
                <Route path="payingHistory" element={<PayingHistory />}></Route>
                <Route path="SoloParking/:parkingId" element={<SoloParking />}></Route>
                <Route path="Onepick" element={<Onepick />}></Route>
                <Route path="Receipt" element={<Receipt/>}></Route>
                <Route path="*" element={<NotFound />}></Route>
              </Route>
            </Routes>
          </div>
          </ChosenParkingContext.Provider>
        </CloudinaryContext.Provider>
      </gooleAutoLocation.Provider>
    </modeContext.Provider>
    </userDataContext.Provider>
  );
}

export default App;
