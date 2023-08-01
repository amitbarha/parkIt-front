import { Link, Outlet } from "react-router-dom";
import { modeContext, userDataContext } from "../../App";
import "./layout.css";
import { useState, useContext } from "react";
import { slide as Menu } from "react-burger-menu";

function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State variable to track open/closed state
  const [switchMode, setSwitchMode] = useState("light");
  const { colorMode, setColorMode } = useContext(modeContext);
  const { userData, setUserData } = useContext(userDataContext);

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
