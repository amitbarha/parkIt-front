import "./EditProfile.css";
import axios from "axios";
import { modeContext } from "../../App";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
function EditProfile() {
  const { colorMode, setColorMode } = useContext(modeContext);
  const { navigate } = useNavigate()
  const [changeFirstName, setChangeFirstName] = useState("");
  const [changeUsername, setChangeUsername] = useState("");
  const [changeLastName, setChangeLastName] = useState("");
  const [changeEmail, setChangeEmail] = useState("");
  const [changePhoneNumber, setChangePhoneNumber] = useState("");
  const [changePassword, setChangePassword] = useState("");
  const [info, setUserInfoToEdit] = useState("");

  useEffect(() => {
    axios
      .post("http://localhost:5000/user/translateToken",
        {
          token: localStorage.getItem("loggedUser")
        })
      .then(({ data }) => {
        setUserInfoToEdit(data);
        setChangeFirstName(data.firstName)
        setChangeUsername(data.username)
        setChangeLastName(data.lastName)
        setChangeEmail(data.email)
        setChangePhoneNumber(data.phoneNumber)
        setChangePassword(data.password)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleSubmitForm(event) {
    event.preventDefault()
    if (
      changeFirstName != "" &&
      changeLastName != "" &&
      changePhoneNumber != "" &&
      changeEmail != ""&&
      changePassword !=""&&
      changeUsername !=""
    ) {
      const editedInfo = {
        username: changeUsername,
        firstName: changeFirstName,
        lastName: changeLastName,
        phoneNumber: changePhoneNumber,
        email: changeEmail,
        password: changePassword,
        _id: info._id
      };

      axios
        .patch("http://localhost:5000/user/updateUser", editedInfo)
        .then(({ data }) => {
          setUserInfoToEdit(data)
           console.log(info);
        })
        .catch((err) => {
          console.log(err);
        })
      // navigate("/Profile")
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
          onChange={(event) => setChangeUsername(event.target.value)}
          className={`${colorMode}-edit-input-bar`}
          type="text"
          placeholder="username"
        />
        <button id="reg-btn" type="submit">
          Edit
        </button>
      </form>
    </div>
  );
}
export default EditProfile;
