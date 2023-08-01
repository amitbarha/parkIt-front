import { Link, Outlet } from "react-router-dom";
import { modeContext, userDataContext } from "../../App";
import "./layout.css";
import { useState, useContext, useEffect } from "react";
import { slide as Menu } from "react-burger-menu";
import axios from "axios";

function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State variable to track open/closed state
  const [switchMode, setSwitchMode] = useState("light");
  const { colorMode, setColorMode } = useContext(modeContext);
  const { userData, setUserData } = useContext(userDataContext);

  console.log(userData);
  const handleClose = () => {
    console.log("hii");
  };

  const handleSwitch = () => {
    colorMode === "light" ? setColorMode("dark") : setColorMode("light");
    console.log(colorMode);
  };

  return (
    <div>
      <div className="navbar-container"></div>
      <Menu isOpen={isSidebarOpen} width={"60%"}>
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
          {userData?.licensePlates.map((plate, index) => {
            return (
            <div className="layout-lisence-palate-container">
              <div className="layout-lisence-palate-picture"><img width="34px" height="34px" src="https://img.icons8.com/color/48/israel.png" alt="israel"/></div>
              <div className="layout-lisence-palate-number">- {plate}</div>
              </div>
            )
          })}
        </div>
        <div id="layout-place-holder-for-log-out"></div>
        <div
          to={"/profile"}
          id="contact"
          className="menu-item"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
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
