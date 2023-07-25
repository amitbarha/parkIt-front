import "./EditProfile.css";
import axios from "axios";
import { modeContext } from "../../App";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
function EditProfile() {
  const { colorMode, setColorMode } = useContext(modeContext);
  const {navigate}=useNavigate()
  const { userId } = useParams();
  const [changeFirstName, setChangeFirstName] = useState("");
  const [changeLastName, setChangeLastName] = useState("");
  const [changeEmail, setChangeEmail] = useState("");
  const [changePhoneNumber, setChangePhoneNumber] = useState("");
  const [changePassword, setChangePassword] = useState("");
  const [changeLicensePlate, setChangeLicensePlate] = useState("");

  useEffect(() => {
    axios
      .post("", { userId })
      .then(({ data }) => {
        console.log(data);
        setUserInfoToEdit(data);
        // after setting the info of the user in the useState,
        //  please set the defualt value of all the other useStataes
        //  as the user`s previous info so he will see what he is editing 
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function tryToEdit() {
    if (
      changeFirstName != "" &&
      changeLastName != "" &&
      changePhoneNumber != "" &&
      changeEmail != "" &&
      changeLicensePlate != ""
    ) {
      const editedInfo = {
        firstName: changeFirstName,
        secondName: changeLastName,
        phoneNumber: changePhoneNumber,
        email: changeEmail,
        password: changePassword,
        licensePlate: changeLicensePlate,
      };
      // axios
      // .fetch("",editedInfo)
      // .try(

      // ).catch(err){
      //     console.log(err);
      // }
      navigate("/Profile")
    } else if (changeFirstName == "") {
      alert("Please enter a valid first name");
    } else if (changeLastName == "") {
      alert("Please enter a valid last name");
    } else if (changePhoneNumber == "") {
      alert("Please enter a valid phone number");
    } else if (changeEmail == "") {
      alert("Please enter a valid mail address");
    } else if (changePassword == "") {
      alert("Please enter a valid password");
    } else if (changeLicensePlate == "") {
      alert("Please enter a valid license plate number");
    }
  }

  return (
    <div id={`${colorMode}-edit-profile-page`}>
      <form
        id={`${colorMode}-edit-profile-form`}
        onSubmit={(e) => handleSubmitForm(e)}
      >
        <h1 id="edit-profile-header">Edit personal info</h1>
        <input
          onChange={(event) => setChangeFirstName(event.target.value)}
          className={`${colorMode}-edit-input-bar`}
          type="text"
          placeholder="First Name"
        />
        <input
          onChange={(event) => setChangeLastName(event.target.value)}
          className={`${colorMode}-edit-input-bar`}
          type="text"
          placeholder="Last Name"
        />
        <input
          onChange={(event) => setChangePhoneNumber(event.target.value)}
          className={`${colorMode}-edit-input-bar`}
          type="text"
          placeholder="Phone Number"
        />
        <input
          onChange={(event) => setChangeEmail(event.target.value)}
          className={`${colorMode}-edit-input-bar`}
          type="Email"
          placeholder="Email"
        />
        <input
          onChange={(event) => setChangePassword(event.target.value)}
          className={`${colorMode}-edit-input-bar`}
          type="password"
          placeholder="Password"
        />
        <input
          onChange={(event) => setChangeLicensePlate(event.target.value)}
          className={`${colorMode}-edit-input-bar`}
          type="text"
          placeholder="License plate"
        />
        <button onClick={() => tryToEdit} id="reg-btn" type="submit">
          Edit
        </button>
      </form>
    </div>
  );
}
export default EditProfile;
