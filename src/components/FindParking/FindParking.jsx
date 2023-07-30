import "./find-parking.css";
import { ChosenParkingContext, modeContext } from "../../App";
import { useContext, useState, useEffect } from "react";
import LocationSearchInput from "../AddParking/LocationSearchInput";
import MyLocation from "./MyLocation";
import { CloudinaryContext, gooleAutoLocation } from "../../App";
import axios from "axios";
import ParkingMap from "./ParkingMap";
import { useNavigate } from "react-router";
import "react-spring-bottom-sheet/dist/style.css";
import BottomSheet from "./BottomSheets";
import NavigationIcon from '@mui/icons-material/Navigation';


function FindParking() {
  const {openSpring, setOpenSpring, parkingId, setParkingId} = useContext(ChosenParkingContext);
  const { colorMode } = useContext(modeContext);
  const [toggleDistance, setToggleDistance] = useState("chosen-");
  const [togglePrice, setTogglePrice] = useState("");
  const [toggleHours, setToggleHours] = useState("");
  const [sortBy, setSortBy] = useState("distance");
  const [parkingsToMap, setParkingsToMap] = useState([""]);
  const [stillLoading, setStillLoading] = useState(true);
  const [wantToChangeLocation, setWantToChangeLocation] = useState(false);
  const [wantToLoadMore, setWantToLoadMore] = useState(false);
  const [open, setOpen] = useState(false)

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/parking/fetchParking")
      .then(({ data }) => {
        setParkingsToMap(data);
        setStillLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setStillLoading(false);
      });
  }, []);
  console.log(parkingsToMap);

  function calcTime(start ,  end ){
    let startHoursArr=parseInt(start)
    let endHoursArr=parseInt(end)
    console.log(startHoursArr , endHoursArr );
    
  }

  useEffect(() => {
    if (sortBy === "distance") {
      setToggleDistance("chosen-");
      setTogglePrice("");
      setToggleHours("");
    } else if (sortBy === "price") {
      setToggleDistance("");
      setTogglePrice("chosen-");
      setToggleHours("");
      setParkingsToMap(parkingsToMap.sort((a,b)=>a.pricePerHour-b.pricePerHour))
      console.log(parkingsToMap);
    } else if (sortBy === "hours") {
      setToggleDistance("");
      setTogglePrice("");
      setToggleHours("chosen-");
      setParkingsToMap(parkingsToMap.sort((a,b)=>calcTime(a.availableStart , a.availableEnd)-calcTime(b.availableStart , b.availableEnd)))
    }
  }, [sortBy]);

  const handleChosenParking = (id) => {
    navigate(`/FindParking/${id}`);
  };

  return (
    <div id={`${colorMode}-find-page`}>
      <div>
        <ParkingMap />
      </div>
      <div>
        <MyLocation />
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
                      <button
                        onClick={() =>
                          setWantToChangeLocation(!wantToChangeLocation)
                        }
                        className="find-anothr-location-process"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() =>
                          console.log(
                            "i chose something else but now we need to run a useState"
                          ) + setWantToChangeLocation(!wantToChangeLocation)
                        }
                        className="find-anothr-location-process"
                      >
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
          <BottomSheet/>
          <div id="find-showing-parking-container">
          {stillLoading ? (
            <div>loading</div>
            ) : (
            parkingsToMap.map((item) => {
              return (
                <div
                  className="find-parking-tab"
                  onClick={() => handleChosenParking(item._id)}
                  >
                  <div className="find-parking-tab-distance">nigga</div>
                  <div className="find-parking-tab-price">
                    {item.pricePerHour}
                  </div>
                  <div className="find-parking-tab-hours">
                    {item.availableStart}-<br />
                    {item.availableEnd}
                  </div>
                  <div className="find-parking-tab-picture">
                    <img className="parking-tab-picture" src="" alt="" />
                  </div>
                </div>
              );
            })
            )}
          <div
            onClick={() =>
              setWantToLoadMore(!wantToLoadMore) + console.log(wantToLoadMore)
            }
            id="load-more-parkings-tab"
            >
            <div id="load-more-parkings-icon-container">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25%"
                height="75%"
                fill="currentColor"
                class="bi bi-plus-circle"
                viewBox="0 0 16 16"
                >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
              </svg>
            </div>
            <div id="load-more-parkings-header-container">
              <h1 id="load-more-parkings-header">Load more</h1>
            </div>
                </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default FindParking;
