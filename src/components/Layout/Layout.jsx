import { Link, Outlet } from "react-router-dom";

import "./layout.css";
import { useState } from "react";

function Layout() {
  const [open, setOpen] = useState(false);
  const [switchMode, setSwitchMode] = useState("light");

const handleSwitch = () => {
  switchMode === 'light'? setSwitchMode('dark'): setSwitchMode('light')
  console.log(switchMode);
}

  return (
    <div>
      <nav className="navbar-container">
        <div className="navbar">
          <div className="logo-nav">LOGO</div>
          <div className="right-element-nav">
            <div className="switch-mode">
              <label className="ui-switch">
                <input type="checkbox" onChange={handleSwitch} />
                <div className="slider">
                  <div className="circle"></div>
                </div>
              </label>
            </div>
            <div className="hamburger">
              <input type="checkbox" id="checkbox" onChange={()=> setOpen(!open)} />
              <label htmlFor="checkbox" className="toggle">
                <div className="bars" id="bar1"></div>
                <div className="bars" id="bar2"></div>
                <div className="bars" id="bar3"></div>
              </label>
            </div>
          </div>
        </div>
        {open&&
          <div className="open-navbar">

          </div>
        }
      </nav>

      <Outlet />
      <div className="footer">footer</div>
    </div>
  );
}

export default Layout;
