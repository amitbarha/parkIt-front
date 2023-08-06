import { Link, Outlet, useNavigate } from "react-router-dom";
import { modeContext, userDataContext } from "../../App";
import "./layout.css";
import { useState, useContext, useEffect } from "react";
import { slide as Menu } from "react-burger-menu";
import { HOST } from "../../Utils/host";
import axios from "axios";
function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State variable to track open/closed state
  const [switchMode, setSwitchMode] = useState("light");
  const { colorMode, setColorMode } = useContext(modeContext);
  const { userData, setUserData } = useContext(userDataContext);
  const [userId, setUserID] = useState(userData?._id);
  const [licensePlateOne, setLicensePlateOne] = useState("");
  const [licensePlateTwo, setLicensePlateTwo] = useState("");
  const [licensePlateThree, setLicensePlateThree] = useState("");
  const [activeLicense, setActiveLicense] = useState("");
  const navigate = useNavigate();

  const changePlate = () => {
    const data1 = {
      activeLicense: activeLicense,
      _id: userData?._id,
    };
    console.log(data1)
    axios
      .patch(`${HOST}/user/updateUser`, data1)
      .then(({ data }) => {
        console.log(data);
      })
      .catch((err) => console.log(err.response.data));
    console.log("it failed");
  };

  function choosePlate(chooseThis) {
    if (chooseThis == "one") {
      setLicensePlateOne("chosen");
      setLicensePlateTwo("");
      setLicensePlateThree("");
      console.log(userData?.licensePlates[0]);
      setActiveLicense(userData?.licensePlates[0]);
      console.log(`this is active ${userData?.licensePlates[0]}`);
      changePlate();
    } else if (chooseThis == "two") {
      setLicensePlateOne("");
      setLicensePlateTwo("chosen");
      setLicensePlateThree("");
      setActiveLicense(userData?.licensePlates[1]);
      changePlate();
    } else if (chooseThis == "three") {
      setLicensePlateOne("");
      setLicensePlateTwo("");
      setLicensePlateThree("chosen");
      setActiveLicense(userData?.licensePlates[2]);
      changePlate();
    }
  }

  useEffect(() => {
    if (userData?.activeLicense == userData?.licensePlates[0]) {
      console.log("on mount this is one");
      choosePlate("one");
    } else if (userData?.activeLicense == userData?.licensePlates[1]) {
      console.log("on mount this is two");
      choosePlate("two");
    } else if (userData?.activeLicense == userData?.licensePlates[2]) {
      console.log("on mount this is three");
      choosePlate("three");
    }
  }, []);

  const handleSwitch = () => {
    colorMode === "light" ? setColorMode("dark") : setColorMode("light");
    console.log(colorMode);
  };

  function logOutUser() {
    alert(`Goodby! hoping to see you soon!`);
    localStorage.setItem("loggedUser", "");
    navigate("/");
  }

  return (
    <div>
      <div className="navbar-container">
        <div id="navbar-switch-container"></div>
        <Link id="navbar-logo-container" to={"/HomePage"}>
          <img
            id="navbar-logo-picture"
            src="http://res.cloudinary.com/deiofeueo/image/upload/v1691048663/mroogw5gclyjxswyaixm.jpg"
            alt=""
          />
        </Link>
      </div>
      <Menu
        isOpen={isSidebarOpen}
        onStateChange={({ isOpen }) => setIsSidebarOpen(isOpen)}
        width={"250px"}
      >
        <div>Hello {userData?.firstName}!</div>
        <Link
          to={"/homePage"}
          id="home"
          className="menu-item"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          Home
        </Link>
        <Link
          to={"/addParking"}
          id="about"
          className="menu-item"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          Add Parking
        </Link>
        <Link
          to={"/profile"}
          id="contact"
          className="menu-item"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          Proflie
        </Link>
        <div id="layout-show-me-all-liesence-plates">
          <h5 className="menu-item">Liesence</h5>
          {userData?.licensePlates[0] != "" ? (
            <div
              onClick={() => choosePlate("one")}
              className={`${licensePlateOne}-layout-lisence-palate-container`}
            >
              <div className="layout-lisence-palate-picture">
                <img
                  width="34px"
                  height="34px"
                  src="https://img.icons8.com/color/48/israel.png"
                  alt="israel"
                />
              </div>
              <div className="layout-lisence-palate-number">
                {userData?.licensePlates[0]}
              </div>
            </div>
          ) : null}
          {userData?.licensePlates[1] != undefined ? (
            <div
              onClick={() => choosePlate("two")}
              className={`${licensePlateTwo}-layout-lisence-palate-container`}
            >
              <div className="layout-lisence-palate-picture">
                <img
                  width="34px"
                  height="34px"
                  src="https://img.icons8.com/color/48/israel.png"
                  alt="israel"
                />
              </div>
              <div className="layout-lisence-palate-number">
                {userData?.licensePlates[1]}
              </div>
            </div>
          ) : null}
          {userData?.licensePlates[2] != undefined ? (
            <div
              onClick={() => choosePlate("three")}
              className={`${licensePlateThree}-layout-lisence-palate-container`}
            >
              <div className="layout-lisence-palate-picture">
                <img
                  width="34px"
                  height="34px"
                  src="https://img.icons8.com/color/48/israel.png"
                  alt="israel"
                />
              </div>
              <div className="layout-lisence-palate-number">
                {userData?.licensePlates[2]}
              </div>
            </div>
          ) : null}
        </div>
        <div
          to={"/profile"}
          id="log-out-menu-item"
          onClick={() => logOutUser() + setIsSidebarOpen(!isSidebarOpen)}
        >
          Log out
        </div>
        {/* <a onClick={ this.showSettings } className="menu-item--small" href="">Settings</a> */}
      </Menu>
      <Outlet />
    </div>
  );
}

export default Layout;
