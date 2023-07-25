import "./find-parking.css";
import { modeContext } from "../../App";
import { useContext , useState } from "react";

function FindParking() {
  const { colorMode } = useContext(modeContext);
  const [toggleDistance , setToggleDistance]=useState("chosen-")
  const [togglePrice , setTogglePrice]=useState("")
  const [toggleHours , setToggleHours]=useState("")

  function toggledSwitches(sortBy){
    if(sortBy==="distance"){
        setToggleDistance("chosen-")
        setTogglePrice("")
        setToggleHours("")
    }else if(sortBy==="price"){
        setToggleDistance("")
        setTogglePrice("chosen-")
        setToggleHours("")
    } else  if(sortBy==="hours"){
        setToggleDistance("")
        setTogglePrice("")
        setToggleHours("chosen-")
    }
  }

  return (
    <div id={`${colorMode}-find-page`}>
      <div id={`${colorMode}-find-container`}>
        <div id="find-container-header">
          Find me a parking
        </div>
        <div id="find-container-filters">
          <div id="find-location-filter">
            <div>Your location:</div>
            <button id={`${colorMode}-find-change-location-BTN`}>change</button>
          </div>
          <div id="find-filters">
            <div id="find-filteres-sorting-section">
              <div id="find-filters-switch-container">
                <div onClick={()=>toggledSwitches("distance")} className={`${toggleDistance}find-sort-by`}>Distance</div>
                <div onClick={()=>toggledSwitches("price")} className={`${togglePrice}find-sort-by`}>Price</div>
                <div onClick={()=>toggledSwitches("hours")} className={`${toggleHours}find-sort-by`}>Hours</div>
              </div>
              {toggleHours=="chosen-" ? 
             <div id="find-hours-filter">

             </div> 
             :
             null
             }
            </div>
          </div>
        </div>
        <div id="find-container-parkings"></div>
      </div>
    </div>
  );
}
export default FindParking;
