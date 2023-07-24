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
    const phoneNumber = target[0].value;
    const password = target[1].value;
    console.log(phoneNumber, password);

    try {
      const { data: newRegister } = await axios.post(
        "http://localhost:5000/user/loginFunc",
        { phoneNumber, password }
      );
      setRefresh((obj) => obj + 1);
      navigate("/homePage");
    } catch (err) {
      setErrorMessage(err.response.data); // Set the error message
    }
  };

  return (
    <div className="main-page-login">
      <div className="login-container">
        <form className="login-form" onSubmit={(e) => handleSubmitForm(e)}>
          <h1>Login</h1>
          <input type="text" placeholder="Phone Number" />
          <input type="text" placeholder="Password" />
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button id="log-btn" type="submit">Login</button>
          <Link to={"/Register"}>Not sign up yet?</Link>
        </form>
      </div>
    </div>
  );
};

export default Login;