import "./Profile.css";
import { modeContext } from "../../App";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Profile() {
  const { colorMode, setColorMode } = useContext(modeContext);
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .post("http://localhost:5000/user/translateToken", {
        token: localStorage.getItem("loggedUser"),
      })
      .then(({ data }) => {
        setData(data);
      })
      .catch((err) => console.log(err.message));
  }, []);

  return (
    <div id={`${colorMode}-profile-page`}>
      <div id="profile-info-container">
        <div id="profile-page-header-container">
          <h1 id={`${colorMode}-profile-page-header`}>Personal info</h1>
        </div>
        <div id={`${colorMode}-profile-info`}>
          <div className={`${colorMode}-profile-detail`}>
            <div className="profile-detail-divforicon">
              <img
                className="icon-con"
                src="https://img.icons8.com/ios/50/user-male-circle--v1.png"
                alt="user-male-circle--v1"
              />
              |
            </div>
            <div className="profile-detail-divfortext">
            {data.firstName} {data.LastName}
            </div>
          </div>
          <div className={`${colorMode}-profile-detail`}>
            <div className="profile-detail-divforicon">
              <img
                className="icon-con"
                src="https://img.icons8.com/external-tanah-basah-glyph-tanah-basah/48/external-email-social-media-ui-tanah-basah-glyph-tanah-basah.png"
                alt="external-email-social-media-ui-tanah-basah-glyph-tanah-basah"
              />
              |
            </div>
            <div className="profile-detail-divfortext">
            {data.email}
            </div>
          </div>
          <div className={`${colorMode}-profile-detail`}>
            <div className="profile-detail-divforicon">
              <img
                className="icon-con"
                src="https://img.icons8.com/external-others-inmotus-design/67/external-Phone-game-play-others-inmotus-design-2.png"
                alt="external-Phone-game-play-others-inmotus-design-2"
              />
              |
            </div>
            <div className="profile-detail-divfortext">{data.phoneNumber}</div>
          </div>
          <div className={`${colorMode}-profile-detail`}>
            <div className="profile-detail-divforicon">
              <img
                className="icon-con"
                src="https://img.icons8.com/ios/50/password--v1.png"
                alt="password--v1"
              />
              |
            </div>
            <div className="profile-detail-divfortext">Password: EXAMPLE</div>
          </div>
          <h6 id="license-pate-semi-header">License plate</h6>
          <div className={`${colorMode}-profile-detail`}>
            
            <div className="profile-detail-divforicon">
              <img
                className="icon-con"
                src="https://img.icons8.com/ios/50/licence-plate.png"
                alt="licence-plate"
              />
              |
            </div>
            <div className="profile-detail-divfortext">
              Car liesence plate:{data?.licensePlates[0]}
            </div>
          </div>
        </div>
      </div>
      <div id="profile-buttons-container">
        <Link to={"/editProfile"} id="profile-edit-info">
          Edit Profile
        </Link>
        <Link to={"/payingHistory"} id="profile-parking-history">
          Parking history
        </Link>
      </div>
    </div>
  );
}
export default Profile;

{
  /* <h1>Personal info {colorMode}</h1>
<div className="profile-personal-info">Name:{data.firstName}  {data.LastName}</div>
<div className="profile-personal-info">Email:{data.email}</div>
<div className="profile-personal-info">Phone:{data.phoneNumber}</div>
<div className="profile-personal-info">username: {data.username}</div>
<div className="profile-personal-info">Car liesence plate: XX-XXX-XX</div> */
}
