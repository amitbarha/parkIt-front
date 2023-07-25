import { Link, Outlet } from "react-router-dom";
import {modeContext} from "../../App"
import "./layout.css";
import { useState , useContext } from "react";

function Layout() {
  const [open, setOpen] = useState(false);
  const [switchMode, setSwitchMode] = useState("light");
  const  {colorMode , setColorMode}=useContext(modeContext)
  

const handleSwitch = () => {
  colorMode === 'light'? setColorMode('dark'): setColorMode('light')
  console.log(colorMode);
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
