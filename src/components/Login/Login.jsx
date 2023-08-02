import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Login/login.css"
import { Link} from 'react-router-dom';
import { HOST } from "../../Utils/host";
const Login = () => {
  const [registers, setRegisters] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const [userNameForgot,setUserNameForgot]=useState()


  useEffect(() => {
    const storedToken = localStorage.getItem('loggedUser') || "NoTokenBefore";
    console.log(storedToken,"storedtoken")

    if(storedToken!="NoTokenBefore"){
      axios
      .post(`${HOST}/user/loginFuncFromToken`,{token:storedToken})
      .then(() =>{
         navigate("/homePage")
        })
      .catch((err) => console.log("eror"));
    }

    axios
      .get(`${HOST}/user/fetchUser`)
      .then(({ data }) => setRegisters(data))
      .catch((err) => console.log(err.message));
  }, [refresh]);

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const { target } = e;
    const username = target[0].value;
    const password = target[1].value;
    console.log(username, password);

    try {
      const { data: newRegister } = await axios.post(
        `${HOST}/user/loginFunc`,
        { username, password }
      );
      localStorage.setItem("loggedUser", newRegister);
      setRefresh((obj) => obj + 1);
      navigate("/homePage");
    } catch (err) {
      setErrorMessage(err.response.data); 
    }
  };

  return (
    <div className="login-background">
          <div className="container">
	<form className="screen" onSubmit={(e) => handleSubmitForm(e)}>
		<div className="screen__content">
      <h1>Log In</h1>
				<div className="login__field">
        <img className="login__icon" width="25" height="25" src="https://img.icons8.com/ios-glyphs/30/7875b5/guest-male.png" alt="guest-male"/>
					<input type="text" className="login__input" placeholder="Username:" onChange={(e)=>setUserNameForgot(e.target.value)}/>
				</div>
				<div className="login__field">
        <img className="login__icon" width="25" height="25" src="https://img.icons8.com/android/24/7875b5/lock.png" alt="lock"/>
					<input type="password" className="login__input" placeholder="Password:"/>
				</div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
				<button type="submit" className="button login__submit">
					<span className="button__text">Log In Now</span>
					<img className="button__icon" width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/7875b5/chevron-right.png" alt="chevron-right"/>
				</button>
        <div><Link className="link-to-register" to={"/Register"}>Not sign up yet?</Link></div>
        <div><Link className="link-to-register" to={"/Verifymail"}>Forgot password?</Link></div>
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

export default Login;


