import "./Profile.css";
function Profile() {
  return (
    <div id="profile-page">
      <div id="profile-info-container">
        <div id="profile-info">
          <h1>Personal info</h1>
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
