

import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./verifymail.css"
import { Link} from 'react-router-dom';
import { HOST } from "../../Utils/host";
import emailjs from '@emailjs/browser';


const Verifymail = () => {

  const [openVerify,setOpenVerify]=useState(true);

  const [registers, setRegisters] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const [userNameForgot,setUserNameForgot]=useState()

  useEffect(() => {
    axios
      .get(`${HOST}/user/fetchUser`)
      .then(({ data }) => setRegisters(data))
      .catch((err) => console.log(err.message));
  }, [refresh]);

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const { target } = e;
    const username = target[0].value;  
    console.log(username,"username");
    if(username==""){
      alert("You need to enter your user name before")
    }else{
        axios
        .post("http://localhost:5000/user/findUserExists",{username:username})
        .then(({ data }) => {
        if (data==null){
         alert(`The user: ${username} that not exists`)
        }
        else{
         const mailObj = {email:data.email,password:data.password,firstName:data.firstName}
         emailjs.send('service_mwr887e', 'template_ff36o7o', mailObj, 'WZFwcywx7NqBLytwt')
         .then((result) => {
            alert("please enter the numbers from the mail");
            setOpenVerify(true);
            
            console.log(error.text);
        });
        }
    })
    .catch((err) => console.log(err.message));
    }
  };

  return (
    <div className="login-background">
          <div className="container">
	<form className="screen" onSubmit={(e) => handleSubmitForm(e)}>
		<div className="screen__content">
      <h1>Verify password</h1>
				<div className="login__field">
        <img className="login__icon" width="25" height="25" src="https://img.icons8.com/ios-glyphs/30/7875b5/guest-male.png" alt="guest-male"/>
					<input type="text" className="login__input" placeholder="Username:" onChange={(e)=>setUserNameForgot(e.target.value)}/>
				</div>
				
        {errorMessage && <p className="error-message">{errorMessage}</p>}
				<button type="submit" className="button login__submit">
					<span className="button__text">Get a mail</span>
					<img className="button__icon" width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/7875b5/chevron-right.png" alt="chevron-right"/>
				</button>
        <div><Link className="link-to-register" to={"/"}>Back to Login </Link></div>
        {openVerify&&
          <div id="inputs-verify-screen">hiii</div>
        }
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

export default Verifymail;


