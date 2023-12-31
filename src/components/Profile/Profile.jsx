import "./Profile.css";
import { modeContext } from "../../App";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { HOST } from "../../Utils/host";

function Profile() {
  const { colorMode, setColorMode, forRestart, setForRestart } =
    useContext(modeContext);
  const [data, setData] = useState([]);
  const [platesArr, setPlatesArr] = useState([]);
  useEffect(() => {
    axios
      .post(`${HOST}/user/translateToken`, {
        token: localStorage.getItem("loggedUser"),
      })
      .then(({ data }) => {
        setData(data);
        setPlatesArr(data.licensePlates);
      })
      .catch((err) => console.log(err.message));
  }, []);

  return (
    <div id="profile-page">
      <div id="profile-info-container">
        <div id="profile-page-header-container">
          <h1 id="profile-page-header">Personal info</h1>
        </div>
        <div id="profile-info">
          <div className="profile-detail">
            <div className="profile-detail-divforicon">
              {colorMode == "light" ? (
                <img
                  className="icon-con-profile"
                  src="https://img.icons8.com/ios/50/user-male-circle--v1.png"
                  alt="user-male-circle--v1"
                />
              ) : (
                <img
                  className="icon-con-profile"
                  src="https://img.icons8.com/ios/50/FFFFFF/user-male-circle--v1.png"
                  alt="user-male-circle--v1"
                />
              )}
              <span className="make-stick-color">|</span>
            </div>
            <div className="profile-detail-divfortext">
              {data.firstName} {data.LastName}
            </div>
          </div>
          <div className="profile-detail">
            <div className="profile-detail-divforicon">
              {colorMode == "light" ? (
                <img
                  className="icon-con-profile"
                  src="https://img.icons8.com/external-tanah-basah-glyph-tanah-basah/48/external-email-social-media-ui-tanah-basah-glyph-tanah-basah.png"
                  alt="external-email-social-media-ui-tanah-basah-glyph-tanah-basah"
                />
              ) : (
                <img
                  className="icon-con-profile"
                  src="https://img.icons8.com/external-tanah-basah-glyph-tanah-basah/48/FFFFFF/external-email-social-media-ui-tanah-basah-glyph-tanah-basah.png"
                  alt="external-email-social-media-ui-tanah-basah-glyph-tanah-basah"
                />
              )}
              <span className="make-stick-color">|</span>
            </div>
            <div className="profile-detail-divfortext">{data.email}</div>
          </div>
          <div className="profile-detail">
            <div className="profile-detail-divforicon">
              {colorMode == "light" ? (
                <img
                  className="icon-con-profile"
                  src="https://img.icons8.com/external-others-inmotus-design/67/external-Phone-game-play-others-inmotus-design-2.png"
                  alt="external-Phone-game-play-others-inmotus-design-2"
                />
              ) : (
                <img
                  className="icon-con-profile"
                  src="https://img.icons8.com/external-others-inmotus-design/67/FFFFFF/external-Phone-game-play-others-inmotus-design-2.png"
                  alt="external-Phone-game-play-others-inmotus-design-2"
                />
              )}
              <span className="make-stick-color">|</span>
            </div>
            <div className="profile-detail-divfortext">{data.phoneNumber}</div>
          </div>

          <h5 id="profile-liesence-plate-header">Car license plate:</h5>
          {platesArr?.length != 0 ? (
            platesArr.map((index, plate) => {
              return (
                <div className="profile-detail index">
                  <div className="profile-detail-divforicon">
                     {colorMode=="light"?
                     <img
                      className="icon-con-profile"
                      src="https://img.icons8.com/ios/50/licence-plate.png"
                      alt="licence-plate"
                    /> 
                    :
                    <img className="icon-con-profile" src="https://img.icons8.com/ios/50/FFFFFF/licence-plate.png" alt="licence-plate"/>}
                    <span className="make-stick-color">|</span>
                  </div>
                  <div className="profile-detail-divfortext">
                    {platesArr[plate]}
                  </div>
                </div>
              );
            })
          ) : (
            <div id="profile-no-plates-header">
              You do not have any license plates
            </div>
          )}
        </div>
      </div>
      <div id="profile-buttons-container">
        {data?.currentParking ? (
          <div
            onClick={() => alert("Please end parking before editing profile")}
            className="profile-edit-info"
          >
            Edit Profile
          </div>
        ) : (
          <Link to={"/editProfile"} className="profile-edit-info">
            Edit Profile
          </Link>
        )}

        <Link to={"/payingHistory"} id="profile-parking-history">
          Parking history
        </Link>
      </div>
    </div>
  );
}
export default Profile;
