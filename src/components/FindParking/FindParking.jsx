import "./find-parking.css";
import { modeContext } from "../../App";
import { useContext, useState, useEffect } from "react";
import data from "./demiParknigData.json";

function FindParking() {
  const { colorMode } = useContext(modeContext);
  const [toggleDistance, setToggleDistance] = useState("chosen-");
  const [togglePrice, setTogglePrice] = useState("");
  const [toggleHours, setToggleHours] = useState("");
  const [sortBy, setSortBy] = useState("distance");
  const [parkingsToMap, setParkingsToMap] = useState(data);
  
  useEffect(() => {
    if (sortBy === "distance") {
      setToggleDistance("chosen-");
      setTogglePrice("");
      setToggleHours("");
      console.log(parkingsToMap);
    } else if (sortBy === "price") {
      setToggleDistance("");
      setTogglePrice("chosen-");
      setToggleHours("");
    } else if (sortBy === "hours") {
      setToggleDistance("");
      setTogglePrice("");
      setToggleHours("chosen-");
    }
  }, [sortBy]);

  return (
    <div id={`${colorMode}-find-page`}>
      <div id="find-map-container">
        <img
          id="find-map-place-holder"
          src="src\Pictures&Media\map-place-holder.jpg"
          alt=""
        />
      </div>
      <div id={`${colorMode}-find-container`}>
        <div id="find-container-filters">
          <div id="find-location-filter">
            <div>Your location:</div>
            <button id={`${colorMode}-find-change-location-BTN`}>change</button>
          </div>
          <div id="find-filters">
            <div id="find-filteres-sorting-section">
              <div id="find-filters-switch-container">
                <div
                  onClick={() => setSortBy("distance")}
                  className={`${toggleDistance}find-sort-by`}
                >
                  Distance
                </div>
                <div
                  onClick={() => setSortBy("price")}
                  className={`${togglePrice}find-sort-by`}
                >
                  Price
                </div>
                <div
                  onClick={() => setSortBy("hours")}
                  className={`${toggleHours}find-sort-by`}
                >
                  Hours
                </div>
              </div>
              {toggleHours == "chosen-" ? (
                <div id="find-hours-filter">
                  <h3>From</h3>{" "}
                  <input
                    id="find-parking-start-time"
                    className="find-parking-time-input"
                    type="time"
                  />
                  <h3>until</h3>{" "}
                  <input
                    id="find-parking-finish-time"
                    className="find-parking-time-input"
                    type="time"
                  />
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <div id="find-container-parkings">
          <div id="find-parking-header">
            <div className="find-parking-tab-distance">Distance</div>
            <div className="find-parking-tab-price">Price/H</div>
            <div className="find-parking-tab-hours">Hours</div>
            <div className="find-parking-tab-picture">Picture</div>
          </div>
          {parkingsToMap.parkings.map((item, index) => {
            const {
              distanceFromMe,
              priceForHour,
              availableStartHour,
              availableFinishHour,
              parkingPicture,
            } = item;
            return (
              <div className="find-parking-tab">
                <div className="find-parking-tab-distance">
                  {distanceFromMe}
                </div>
                <div className="find-parking-tab-price">{priceForHour}</div>
                <div className="find-parking-tab-hours">
                  {availableStartHour}-{availableFinishHour}
                </div>
                <div className="find-parking-tab-picture">
                  <img
                    className="parking-tab-picture"
                    src={parkingPicture}
                    alt=""
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
export default FindParking;
