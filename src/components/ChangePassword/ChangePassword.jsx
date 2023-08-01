import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "./changepassword.css"
import { Link} from 'react-router-dom';
import { HOST } from "../../Utils/host";
import emailjs from '@emailjs/browser';
import { Password } from "@mui/icons-material";


const ChangePassword = () => {

  const navigate=useNavigate()

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const { target } = e;
    const password = target[0].value;  
    const passwordagain = target[1].value;
    console.log(password,passwordagain)

    if (password!=passwordagain || password=="" || passwordagain=="" ){
        alert("You didn't confirm password as well")
    }else{
        axios
        .patch(`${HOST}/user/changePassword`,{token: localStorage.getItem('loggedUser'),password:passwordagain})
        .then((result) => {
            alert("password had been change");
            navigate("/homepage");
             })
        .catch((err) => console.log(err.message));
    }
  };


  return (
    <div className="login-background">
          <div className="container">
	<form className="screen" onSubmit={(e) => handleSubmitForm(e)}>
		<div className="screen__content">
      <h1>Change password:</h1>

        <div className="login__field">
         <img className="login__icon" width="25" height="25" src="https://img.icons8.com/android/24/7875b5/lock.png" alt="lock"/>
		 <input type="password" className="login__input" placeholder="Password:"/>
		</div>
        

        <div className="login__field">
         <img className="login__icon" width="25" height="25" src="https://img.icons8.com/android/24/7875b5/lock.png" alt="lock"/>
		 <input type="password" className="login__input" placeholder="Confirm password:"/>
		</div>
        

        <button type="submit" className="button login__submit">
			<span className="button__text">Sign In</span>
			<img className="button__icon" width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/7875b5/chevron-right.png" alt="chevron-right"/>
		</button>

        <div><Link className="link-to-register" to={"/"}>Back to Login </Link></div>
        
        </div>
		<div className="screen__background">
			<span className="screen__background__shape screen__background__shape4"></span>
			<span className="screen__background__shape screen__background__shape3"></span>		
			<span className="screen__background__shape screen__background__shape2"></span>
			<span className="screen__background__shape screen__background__shape1"></span>
		</div>		
	</form>
</div>
    </div>
  );
};

export default ChangePassword;


