import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Login/login.css"
import { Link} from 'react-router-dom';

const Login = () => {
  const [registers, setRegisters] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/user/fetchUser")
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
        "http://localhost:5000/user/loginFunc",
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
					<input type="text" className="login__input" placeholder="Username:"/>
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
        <Link className="link-to-register" to={"/Register"}>Not sign up yet?</Link>
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


			{/* <form class="login" onSubmit={(e) => handleSubmitForm(e)}>
        <h1>Log In</h1>
				<div class="login__field">
					<i class="login__icon fas fa-user"></i>
					<input type="text" class="login__input" placeholder="UserName:"/>
				</div>
				<div class="login__field">
					<i class="login__icon fas fa-lock"></i>
					<input type="password" class="login__input" placeholder="Password:"/>
				</div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
				<button type="submit" class="button login__submit">
					<span class="button__text">Log In Now</span>
					<i class="button__icon fas fa-chevron-right"></i>
				</button>
        <Link to={"/Register"}>Not sign up yet?</Link>				
			</form> */}


{/* <div className="main-page-login">
      <div className="login-container">
        <form className="login-form" onSubmit={(e) => handleSubmitForm(e)}>
          <h1>Login</h1>
          <input type="text" placeholder="username:" />
          <input type="text" placeholder="Password:" />
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button id="log-btn" type="submit">Login</button>
          <Link to={"/Register"}>Not sign up yet?</Link>
        </form>
      </div>
    </div> */}