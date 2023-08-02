import { Link, Outlet, useNavigate } from "react-router-dom";
import { modeContext, userDataContext } from "../../App";
import "./layout.css";
import { useState, useContext, useEffect } from "react";
import { slide as Menu } from "react-burger-menu";
// import {logo} from "../../Pictures&Media/final-project-logo.jpeg"
// \final-project-logo.jpeg
function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State variable to track open/closed state
  const [switchMode, setSwitchMode] = useState("light");
  const { colorMode, setColorMode } = useContext(modeContext);
  const { userData, setUserData } = useContext(userDataContext);
  const [liesencePlateToShow, setLiesencePlateToShow] = useState("");
  const navigate = useNavigate();

  const handleClose = () => {
    console.log("hii");
  };

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
        <div id="navbar-switch-container">
        </div>
        <div id="navbar-logo-container">
          <img id="navbar-logo-picture" src="src\Pictures&Media\final-project-logo.jpeg" alt="logo" />
        </div>
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

          {/* {console.log(userData?.licenses)} */}
          {/* {userData?.licenses[0] != "" ? (
            <div className="layout-lisence-palate-container">
              <div className="layout-lisence-palate-picture">
                <img
                  width="34px"
                  height="34px"
                  src="https://img.icons8.com/color/48/israel.png"
                  alt="israel"
                />
              </div>
              <div className="layout-lisence-palate-number">
                {" "}
                {userData?.licenses[0][0]}
                {userData?.licenses[0][1]}
              </div>
            </div>
          ) : null} */}
          {/* {userData?.licensePlates[0] != "" ? (
            <div className="layout-lisence-palate-container">
              <div className="layout-lisence-palate-picture">
                <img
                  width="34px"
                  height="34px"
                  src="https://img.icons8.com/color/48/israel.png"
                  alt="israel"
                />
              </div>
              <div className="layout-lisence-palate-number">
                {" "}
                {userData?.licensePlates[0][0]}
                {userData?.licensePlates[0][1]}
              </div>
            </div>
          ) : null}
          {userData?.licenses[1] != "" ? (
            <div className="layout-lisence-palate-container">
              <div className="layout-lisence-palate-picture">
                <img
                  width="34px"
                  height="34px"
                  src="https://img.icons8.com/color/48/israel.png"
                  alt="israel"
                />
              </div>
              <div className="layout-lisence-palate-number">
                {" "}
                {userData?.licenses[1][0]}
                {userData?.licenses[1][1]}
              </div>
            </div>
          ) : null}
          {userData?.licenses[2] != "" ? (
            <div className="layout-lisence-palate-container">
              <div className="layout-lisence-palate-picture">
                <img
                  width="34px"
                  height="34px"
                  src="https://img.icons8.com/color/48/israel.png"
                  alt="israel"
                />
              </div>
              <div className="layout-lisence-palate-number">
                {" "}
                {userData.licenses[2][0]}
                {userData.licenses[2][1]}
              </div>
            </div>
          ) : null} */}
          {/* {licensePlate[0].plate[1]}-{licensePlate[0].plate[2]}{licensePlate[0].plate[3]}{licensePlate[0].plate[4]}-{licensePlate[0].plate[5]}{licensePlate[0].plate[6]} */}
          {/* {userData?.licenses.map((plate, index) => {
            if (plate.length == 7) {
              return (
                <div className="layout-lisence-palate-container">
                  <div className="layout-lisence-palate-picture">
                    <img
                      width="34px"
                      height="34px"
                      src="https://img.icons8.com/color/48/israel.png"
                      alt="israel"
                    />
                  </div>
                  <div className="layout-lisence-palate-number">
                    {" "}
                    {plate[0]}
                    {plate[1]}-{plate[2]}
                    {plate[3]}
                    {plate[4]}-{plate[5]}
                    {plate[6]}
                  </div>
                </div>
              );
            } else if (plate.length == 8) {
              return (
                <div className="layout-lisence-palate-container">
                  <div className="layout-lisence-palate-picture">
                    <img
                      width="34px"
                      height="34px"
                      src="https://img.icons8.com/color/48/israel.png"
                      alt="israel"
                    />
                  </div>
                  <div className="layout-lisence-palate-number">
                    {" "}
                    {plate[0]}
                    {plate[1]}
                    {plate[2]}-{plate[3]}
                    {plate[4]}
                    {plate[5]}-{plate[6]}
                    {plate[7]}
                  </div>
                </div>
              );
            } else {
              return (
                <div className="layout-lisence-palate-container">
                  <div className="layout-lisence-palate-picture">
                    <img
                      width="34px"
                      height="34px"
                      src="https://img.icons8.com/color/48/israel.png"
                      alt="israel"
                    />
                  </div>
                  <div className="layout-lisence-palate-number">- {plate}</div>
                </div>
              );
            }
          })} */}
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
