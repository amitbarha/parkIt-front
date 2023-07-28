import "./find-parking.css";
import { modeContext } from "../../App";
import { useContext, useState, useEffect } from "react"
import LocationSearchInput from "../AddParking/LocationSearchInput";
import { CloudinaryContext, gooleAutoLocation } from "../../App";
import axios from "axios";
import ParkingMap from "./ParkingMap";

function FindParking() {
  const { googleLocation, setGoogleLocation } = useContext(gooleAutoLocation);
  const { colorMode } = useContext(modeContext);
  const [toggleDistance, setToggleDistance] = useState("chosen-");
  const [togglePrice, setTogglePrice] = useState("");
  const [toggleHours, setToggleHours] = useState("");
  const [sortBy, setSortBy] = useState("distance");
  const [parkingsToMap, setParkingsToMap] = useState([""]);
  const [stillLoading , setStillLoading]=useState(true)
  const [wantToChangeLocation, setWantToChangeLocation] = useState(false);

  useEffect(()=>{
    axios
    .get("http://localhost:5000/parking/fetchParking")
    .then(({data})=>{
      setParkingsToMap(data)
      setStillLoading(false)
    }) 
    .catch((err)=>{
      console.log(err.message);
      setStillLoading(false)
    })
  },[])
  console.log(parkingsToMap);

  useEffect(() => {
    if (sortBy === "distance") {
      setToggleDistance("chosen-");
      setTogglePrice("");
      setToggleHours("");
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
      <div>
        <ParkingMap />
      </div>
      {/* <div id="find-map-container">
        <img
          id="find-map-place-holder"
          src="src\Pictures&Media\map-place-holder.jpg"
          alt=""
        />
      </div> */}
      <div id={`${colorMode}-find-container`}>
        <div id="find-container-filters">
          <div id="find-location-filter">
            <div id="find-current-location">
              <div>Your location:</div>
              <button
                onClick={() => setWantToChangeLocation(!wantToChangeLocation)}
                id={`${colorMode}-find-change-location-BTN`}
              >
                change
              </button>
              {wantToChangeLocation ? (
                <div>
                  <div
                    onClick={() =>
                      setWantToChangeLocation(!wantToChangeLocation)
                    }
                    id="around-find-anothr-location"
                  ></div>
                  <div id="find-anothr-location">
                    {<LocationSearchInput></LocationSearchInput>}
                  <div id="find-anothr-location-process">
                    <button onClick={()=>setWantToChangeLocation(!wantToChangeLocation)} className="find-anothr-location-process">
                      Cancel
                    </button>
                    <button onClick={()=>console.log("i chose something else but now we need to run a useState")+setWantToChangeLocation(!wantToChangeLocation)} className="find-anothr-location-process">
                      Submit
                    </button>
                  </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
          <div id="find-filters">
            <div id="find-filteres-sorting-section">
              {wantToChangeLocation ? null : (
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
                    Longest
                  </div>
                </div>
              )}
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
          {stillLoading?
        <div>loading</div>  
        :
        parkingsToMap.map((item) => {
          return (
            <div className="find-parking-tab">
              <div className="find-parking-tab-distance">
                nigga
              </div>
              <div className="find-parking-tab-price">{item.pricePerHour}</div>
              <div className="find-parking-tab-hours">
                {item.availableStart}-<br />{item.availableEnd}
              </div>
              <div className="find-parking-tab-picture">
                <img
                  className="parking-tab-picture"
                  src=""
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
