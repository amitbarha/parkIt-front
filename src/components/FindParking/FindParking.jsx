import "./find-parking.css";
import { modeContext } from "../../App";
import { useContext } from "react";

function FindParking() {
  const { colorMode } = useContext(modeContext);
  return (
    <div id={`${colorMode}-find-page`}>
      <div id={`${colorMode}-find-container`}>
        <div id="find-container-header">
          <h1>Find me a prking</h1>
        </div>
        <div id="find-container-filters">
          <div id="find-location-filter">
            <div>Your location:</div>
            <button>change</button>
          </div>
          <div id="find-filters">
            <div id="find-filteres-sorting-section">
              <div id="find-filters-switch-container">
                <div className="find-sort-by">Distance</div>
                <div className="find-sort-by">Price</div>
                <div className="find-sort-by">Hours</div>
              </div>
              <div>
                
              </div>
            </div>
          </div>
        </div>
        <div id="find-container-parkings"></div>
      </div>
    </div>
  );
}
export default FindParking;
