import "./Profile.css";
import {modeContext} from"../../App"
import { useContext } from "react";

function Profile() {
    const {colorMode , setColorMode}=useContext(modeContext)
  return (
    <div id={`${colorMode}-profile-page`}>
      <div id="profile-info-container">
        <div id={`${colorMode}-profile-info`}>
          <h1>Personal info {colorMode}</h1>
          <div className="profile-personal-info">Name:EXAMPLE</div>
          <div className="profile-personal-info">Email:EXAMPLE@GMAIL.COM</div>
          <div className="profile-personal-info">Phone:XXX-XXX-XXXX</div>
          <div className="profile-personal-info">Password: EXAMPLE</div>
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
