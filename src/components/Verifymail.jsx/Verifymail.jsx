

import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./verifymail.css"
import { Link} from 'react-router-dom';
import { HOST } from "../../Utils/host";
import emailjs from '@emailjs/browser';


const Verifymail = () => {

  const [openVerify,setOpenVerify]=useState(false);

  const [registers, setRegisters] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const [userNameForgot,setUserNameForgot]=useState()
  const [saveUserAterMail,setSaveUserAfterMail]=useState()

  const [input1,setInput1]=useState();
  const [input2,setInput2]=useState();
  const [input3,setInput3]=useState();
  const [input4,setInput4]=useState();
  const [randomStringSave,setRandomStringSave]=useState()

  function randomString() {
    const letters = '0123456789';
    let result = '';
    for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * letters.length);
      result += letters.charAt(randomIndex);
    }
    return result;
  }


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
        const randomNumber = randomString()
        setRandomStringSave(randomNumber)

         const mailObj = {email:data.email,password: randomNumber ,firstName:data.firstName}
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

  async function verifyFunc(){
    console.log(randomStringSave,"randomstringsave")
    console.log(saveUserAterMail,"saveuseraftermail")
    console.log(input1,input2,input3,input4, "allinputs")
    const digits = randomStringSave.split('');
    console.log(digits)
    if(input1 == digits[0] && input2 == digits[1] && input3 == digits[2] && input4 == digits[3]){
        console.log(true)
        const { data: newRegister } = await axios.post(`http://localhost:5000/user/loginFuncFromVerify`,{username: saveUserAterMail});
        localStorage.setItem("loggedUser", newRegister);
        navigate("/homePage");
    }else{
        alert("Numbers are inncorrect")
    }
  }

  return (
    <div className="login-background">
          <div className="container">
	<form className="screen" onSubmit={(e) => handleSubmitForm(e)}>
		<div className="screen__content">
      <h1>Verify</h1>
				<div className="login__field">
        <img className="login__icon" width="25" height="25" src="https://img.icons8.com/ios-glyphs/30/7875b5/guest-male.png" alt="guest-male"/>
					<input type="text" className="login__input" placeholder="Username:" onChange={(e)=>setUserNameForgot(e.target.value)}/>
				</div>
				
        {errorMessage && <p className="error-message">{errorMessage}</p>}
				<button type="submit" className="button login__submit" onClick={()=>setSaveUserAfterMail(userNameForgot)}>
					<span className="button__text">Get a mail</span>
					<img className="button__icon" width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/7875b5/chevron-right.png" alt="chevron-right"/>
				</button>
        <div><Link className="link-to-register" to={"/"}>Back to Login </Link></div>
        {openVerify&&
          <div id="input-verify-container">
           <h6>Enter to key number:</h6>
           <div id="inputs-verify-screen">
            <input className="verify-box-input" onChange={(e)=>setInput1(e.target.value)}></input>-
            <input className="verify-box-input" onChange={(e)=>setInput2(e.target.value)}></input>-
            <input className="verify-box-input" onChange={(e)=>setInput3(e.target.value)}></input>-
            <input className="verify-box-input" onChange={(e)=>setInput4(e.target.value)}></input>
           </div>
           <button type="button" id="veify-btn" onClick={()=>verifyFunc()}>Verify</button>
          </div>
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


