import { Link, Outlet, useNavigate } from "react-router-dom";
import { modeContext, userDataContext } from "../../App";
import "./layout.css";
import { useState, useContext, useEffect } from "react";
import { slide as Menu } from "react-burger-menu";
function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State variable to track open/closed state
  const [switchMode, setSwitchMode] = useState("light");
  const { colorMode, setColorMode } = useContext(modeContext);
  const { userData, setUserData } = useContext(userDataContext);
  const [liesencePlateToShow, setLiesencePlateToShow] = useState("");
  const [licensePlateOne , setLicensePlateOne]=useState("")
  const [licensePlateTwo , setLicensePlateTwo]=useState("")
  const [licensePlateThree , setLicensePlateThree]=useState("")
  const [chosenLicensePlate , setChosenLicensePlate]=useState("")
  const navigate = useNavigate();

  
  function choosePlate(chooseThis){
    if(chooseThis=="one"){
      setLicensePlateOne("chosen")
      setLicensePlateTwo("")
      setLicensePlateThree("")
      setChosenLicensePlate(userData?.licensePlates[0])
    } else if(chooseThis=="two"){
      setLicensePlateOne("")
      setLicensePlateTwo("chosen")
      setLicensePlateThree("")
      setChosenLicensePlate(userData?.licensePlates[1])
    } else if(chooseThis=="three"){
      setLicensePlateOne("")
      setLicensePlateTwo("")
      setLicensePlateThree("chosen")
      setChosenLicensePlate(userData?.licensePlates[2])
    } 
  }

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
            src="src\Pictures&Media\final-project-logo.jpeg"
            alt=""
          />
        </Link>
      </div>
      <Menu
        isOpen={isSidebarOpen}
        onStateChange={({ isOpen }) => setIsSidebarOpen(isOpen)}
        width={"60%"}
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
          <h5 className="menu-item">Liesence plates</h5>
          {console.log(userData?.licensePlates[0])}
          {userData?.licensePlates[0] != "" ? (
            <div onClick={(()=>choosePlate("one"))} className={`${licensePlateOne}-layout-lisence-palate-container`}>
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
            <div onClick={(()=>choosePlate("two"))} className={`${licensePlateTwo}-layout-lisence-palate-container`}>
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
            <div onClick={(()=>choosePlate("three"))} className={`${licensePlateThree}-layout-lisence-palate-container`}>
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
          id="button-for-log-out"
          className="menu-item"
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
