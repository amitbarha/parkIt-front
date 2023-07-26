import "./Profile.css";
import { modeContext } from "../../App";
import { useContext } from "react";
import { Link } from "react-router-dom";

function Profile() {
  const { colorMode, setColorMode } = useContext(modeContext);
  return (
    <div id={`${colorMode}-profile-page`}>
      <div id="profile-info-container">
        <h1 id={`${colorMode}-profile-page-header`}>Personal info</h1>
        <div id={`${colorMode}-profile-info`}>
          <div className={`${colorMode}-profile-detail`}>
            <div className="profile-detail-divforicon">
              <img className="icon-con" src="https://img.icons8.com/ios/50/user-male-circle--v1.png" alt="user-male-circle--v1"/>
              |
            </div>
            <div className="profile-detail-divfortext">
              first name +last name
            </div>
          </div>
          <div className={`${colorMode}-profile-detail`}>
            <div className="profile-detail-divforicon">
              <img className="icon-con" src="https://img.icons8.com/external-tanah-basah-glyph-tanah-basah/48/external-email-social-media-ui-tanah-basah-glyph-tanah-basah.png" alt="external-email-social-media-ui-tanah-basah-glyph-tanah-basah"/>
              |
            </div>
            <div className="profile-detail-divfortext">
              Email:EXAMPLE@GMAIL.COM
            </div>
          </div>
          <div className={`${colorMode}-profile-detail`}>
            <div className="profile-detail-divforicon">
            <img className="icon-con" src="https://img.icons8.com/external-others-inmotus-design/67/external-Phone-game-play-others-inmotus-design-2.png" alt="external-Phone-game-play-others-inmotus-design-2"/>
              |
            </div>
            <div className="profile-detail-divfortext">Phone:XXX-XXX-XXXX</div>
          </div>
          <div className={`${colorMode}-profile-detail`}>
            <div className="profile-detail-divforicon">
            <img className="icon-con" src="https://img.icons8.com/ios/50/password--v1.png" alt="password--v1"/>
              |
            </div>
            <div className="profile-detail-divfortext">Password: EXAMPLE</div>
          </div>
          <div className={`${colorMode}-profile-detail`}>
            <div className="profile-detail-divforicon">
            <img className="icon-con" src="https://img.icons8.com/ios/50/licence-plate.png" alt="licence-plate"/>
              |
            </div>
            <div className="profile-detail-divfortext">
              Car liesence plate: XX-XXX-XX
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
