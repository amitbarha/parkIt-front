import "./EditProfile.css";
import axios from "axios";
import { modeContext } from "../../App";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
function EditProfile() {
  const { colorMode, setColorMode } = useContext(modeContext);
  const { userId } = useParams();

  useEffect(() => {
    axios
      .post("", {userId})
      .then(({ data }) => {
        console.log(data);
        setUserInfoToEdit(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

function tryToEdit(){

}
  

  return (
    <div id={`${colorMode}-edit-profile-page`}>
      <form
        id={`${colorMode}-edit-profile-form`}
        onSubmit={(e) => handleSubmitForm(e)}
      >
        <h1 id="edit-profile-header">Edit personal info</h1>
        <input
          className={`${colorMode}-edit-input-bar`}
          type="text"
          placeholder="First Name"
        />
        <input
          className={`${colorMode}-edit-input-bar`}
          type="text"
          placeholder="Last Name"
        />
        <input
          className={`${colorMode}-edit-input-bar`}
          type="text"
          placeholder="Phone Number"
        />
        <input
          className={`${colorMode}-edit-input-bar`}
          type="Email"
          placeholder="Email"
        />
        <input
          className={`${colorMode}-edit-input-bar`}
          type="password"
          placeholder="Password"
        />
        <button onClick={()=>tryToEdit} id="reg-btn" type="submit">
          Edit
        </button>
      </form>
    </div>
  );
}
export default EditProfile;
