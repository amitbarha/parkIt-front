import "./Profile.css";
import { modeContext } from "../../App"
import { useContext, useEffect, useState } from "react";
import axios from "axios";


function Profile() {
  const { colorMode, setColorMode } = useContext(modeContext)
  const [info, setInfo] = useState([])
  const [data, setData] = useState([])
  useEffect(() => {
    axios
      .post("http://localhost:5000/user/translateToken",
        {
          token: localStorage.getItem("loggedUser")
        })
      .then(({ data }) => {
        setData(data)
      }
      )
      .catch((err) => console.log(err.message));
  }, [])
  return (
    <div id={`${colorMode}-profile-page`}>
      <div id="profile-info-container">
        <div id={`${colorMode}-profile-info`}>
          <h1>Personal info {colorMode}</h1>
          <div className="profile-personal-info">Name:{data.firstName}  {data.LastName}</div>
          <div className="profile-personal-info">Email:{data.email}</div>
          <div className="profile-personal-info">Phone:{data.phoneNumber}</div>
          <div className="profile-personal-info">username: {data.username}</div>
          <div className="profile-personal-info">Car liesence plate: XX-XXX-XX</div>
        </div>
      </div>
      <div id="profile-buttons-container">
        <div id="profile-edit-info">Edit Profile</div>
        <div id="profile-parking-history">Parking history</div>
      </div>
    </div>
  );
}
export default Profile;
