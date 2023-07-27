import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Register/Register.css"

const Register = () => {
  const navigate = useNavigate();
  const [errorMessage1, setErrorMessage1] = useState("");
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const { target } = e;
    const username = target[0].value;
    const firstName = target[1].value;
    const lastName = target[2].value;
    const phoneNumber = target[3].value;
    const email = target[4].value;
    const password = target[5].value;
    const licensePlates = target[6].value;

    try {
      const newuser = await axios.post(
        "http://localhost:5000/user/publishUser",
        {username,firstName,lastName,phoneNumber,email,password }
      );
      console.log(newuser);
      localStorage.setItem("loggedUser", newuser.data);
      navigate("/homepage");
    } catch (err) {
      setErrorMessage1("Incorrect Phone Number or password");
    }
  };

  return (
    <div className="main-page">
      <div className="register-container">
        <form className="form" onSubmit={(e) => handleSubmitForm(e)}>
          <h1>Register</h1>
          <input type="text" placeholder="username" />
          <input type="text" placeholder="First Name" />
          <input type="text" placeholder="Last Name" />
          <input type="text" placeholder="Phone Number" />
          <input type="Email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <input type="text" placeholder="licensePlates" />
          {errorMessage1 && <p className="error-message">{errorMessage1}</p>}
          <button id="reg-btn" type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;