import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Register/Register.css"
import { Link} from 'react-router-dom';
import { HOST } from "../../Utils/host";

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
    const activeLicense = target[6].value;

    try {
      const newuser = await axios.post(
        `${HOST}/user/publishUser`,
        {username,firstName,lastName,phoneNumber,email,password,licensePlates,activeLicense }
      );
      console.log(newuser);
      localStorage.setItem("loggedUser", newuser.data);
      navigate("/homepage");
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
    <div className="reg-background">
          <div className="reg-container">
	<form className="reg-screen" onSubmit={(e) => handleSubmitForm(e)}>
		<div className="reg-screen__content">
      <h1>Register</h1>
				<div className="reg__field">
					<input type="text" className="reg__input" placeholder="Username:"/>
				</div>
				<div className="reg__field">
					<input type="text" className="reg__input" placeholder="First Name:"/>
				</div>
        <div className="reg__field">
					<input type="text" className="reg__input" placeholder="Last Name:"/>
				</div>
        <div className="reg__field">
					<input type="text" className="reg__input" placeholder="Phone Number:"/>
				</div>
        <div className="reg__field">
					<input type="email" className="reg__input" placeholder="Email:"/>
				</div>
        <div className="reg__field">
					<input type="password" className="reg__input" placeholder="Password:"/>
				</div>
        <div className="reg__field">
					<input type="text" className="reg__input" placeholder="License Plates:"/>
				</div>
        {errorMessage1 && <p className="error-message">{errorMessage1}</p>}
     
        <button type="submit" className="button reg__submit">
					<span className="reg-button__text">Register Now</span>
					<img className="reg-button__icon" width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/7875b5/chevron-right.png" alt="chevron-right"/>
				</button>
        
        <Link className="link-to-login" to={"/"}>Back to Log In</Link>
        </div>
		<div className="screen__background">
			<span className="reg-screen__background__shape reg-screen__background__shape4"></span>
			<span className="reg-screen__background__shape reg-screen__background__shape3"></span>		
			<span className="reg-screen__background__shape reg-screen__background__shape2"></span>
			<span className="reg-screen__background__shape reg-screen__background__shape1"></span>
		</div>		
	</form>
</div>
    </div>
  );
};

export default Register;


