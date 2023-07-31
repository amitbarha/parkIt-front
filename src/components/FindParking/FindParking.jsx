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
import NavigationIcon from "@mui/icons-material/Navigation";
import { HOST } from "../../Utils/host";
import { TextField } from "@mui/material";

function FindParking() {
  const {
    openSpring,
    setOpenSpring,
    parkingId,
    setParkingId,
    parkingIdData,
    setParkingIdData,
    center,
    setCenter,
  } = useContext(ChosenParkingContext);
  const { googleLocation, setGoogleLocation } = useContext(gooleAutoLocation);
  const [selectAdd, setSelectAdd] = useState(false);
  const { colorMode } = useContext(modeContext);
  const [toggleDistance, setToggleDistance] = useState("chosen-");
  const [togglePrice, setTogglePrice] = useState("");
  const [toggleHours, setToggleHours] = useState("");
  const [sortBy, setSortBy] = useState("distance");
  const [parkingsToMap, setParkingsToMap] = useState([""]);
  const [stillLoading, setStillLoading] = useState(true);
  const [Loading, setLoading] = useState(true);
  const [wantToChangeLocation, setWantToChangeLocation] = useState(false);
  const [wantToLoadMore, setWantToLoadMore] = useState(false);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const handleParkingClick = (id) => {
    console.log(id, "dflkgjdkuhgu");
    setOpenSpring(!openSpring);
    setParkingId(id);
    console.log(id);
    const parking = parkingsToMap?.find((park) => park._id === id);
    setParkingIdData(parking);
    console.log(parking);
  };
  useEffect(() => {
    setSelectAdd(false);
    console.log("mount");
    if (googleLocation.fullAddress != "") {
      setSelectAdd(true);
    }
  }, [googleLocation]);

  useEffect(() => {
    axios
      .get(`${HOST}/parking/fetchParking`)
      .then(({ data }) => {
        setParkingsToMap(data);
        setStillLoading(false);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setStillLoading(false);
      });
  }, []);
  console.log(parkingsToMap);

  useEffect(() => {
    // Function to calculate distance for each parking location
    const calculateDistances = () => {
      const service = new window.google.maps.DistanceMatrixService();
      const origin = center; // Your fixed origin

      // Create a copy of the parkingsToMap array to update it later
      const updatedParkings = parkingsToMap.map((parking) => ({ ...parking }));

      parkingsToMap?.forEach((parking, index) => {
        const lat = parking?.lat * 1;
        const lng = parking?.lng * 1;
        const destination = { lat, lng };

        // Distance matrix request
        service.getDistanceMatrix(
          {
            destinations: [destination],
            origins: [origin],
            travelMode: "DRIVING",
          },
          (response) => {
            const distance = response.rows[0].elements[0].distance;
            let distanceText = distance ? distance.text : "N/A";

            // Update the distance property for the corresponding parking object
            updatedParkings[index] = {
              ...updatedParkings[index],
              distance: distanceText,
            };

            // Check if all distances have been calculated
            if (index === parkingsToMap.length - 1) {
              // All distances are calculated, update the state with the new data
              setParkingsToMap(updatedParkings);
            }
          }
        );
      });
    };

    calculateDistances();
  }, [Loading]);

  //   function calcTime(start, end) {
  //     let startHoursArr = parseInt(start);
  //     let endHoursArr = parseInt(end);
  //     console.log(startHoursArr, endHoursArr);
  //   }


//   function calcTime(start, end) {
//     let startHoursArr = parseInt(start);
//     let endHoursArr = parseInt(end);
//     console.log(startHoursArr, endHoursArr);
//   }

function calcTime(start, end) {
  let parkingTime;
  let startTimeArr = start.split("");
  let startHourInt = parseInt(`${startTimeArr[0]}${startTimeArr[1]}`);
  let startMinuteInt = parseInt(`${startTimeArr[3]}${startTimeArr[4]}`);
  let endTimeArr = end.split("");
  let endHourInt = parseInt(`${endTimeArr[0]}${endTimeArr[1]}`);
  let endMinuteInt = parseInt(`${endTimeArr[3]}${endTimeArr[4]}`);
  const currentTime = new Date();
  let currentHour = currentTime.getHours();
  let currentMinute = currentTime.getMinutes();
  if(startHourInt>currentHour && currentHour>endHourInt)
  if (startHourInt > currentHour) {
    if (startHourInt > endHourInt) {
      if (endMinuteInt >= startMinuteInt) {
        parkingTime =
          (endHourInt + 24 - startHourInt) * 60 +
          (endMinuteInt - startMinuteInt);
          console.log(start , end , parkingTime);
          return (parkingTime)
      } else {
        parkingTime =
          (endHourInt + 24 - startHourInt - 1) * 60 +
          (60 - startMinuteInt) +
          endMinuteInt;
          console.log(start , end , parkingTime);
          return (parkingTime)
      }
    } else {
      if (endMinuteInt >= startMinuteInt) {
        parkingTime =
          (endHourInt - startHourInt) * 60 + (endMinuteInt - startMinuteInt);
          console.log(start , end , parkingTime);
          return (parkingTime)
      } else {
        parkingTime =
          (endHourInt - startHourInt - 1) * 60 +
          (60 - startMinuteInt) +
          endMinuteInt;
          console.log(start , end , parkingTime);
          return (parkingTime)
      }
    }
  } else {
    if (startMinuteInt > currentMinute) {
      if (startHourInt > endHourInt) {
        if (endMinuteInt >= startMinuteInt) {
          parkingTime =
            (endHourInt + 24 - startHourInt) * 60 +
            (endMinuteInt - startMinuteInt);
          console.log(start, end, parkingTime);
          return parkingTime;
        } else {
          parkingTime =
            (endHourInt + 24 - startHourInt - 1) * 60 +
            (60 - startMinuteInt) +
            endMinuteInt;
          console.log(start, end, parkingTime);
          return parkingTime;
        }
      } else {
        if (endMinuteInt >= startMinuteInt) {
          parkingTime =
            (endHourInt - startHourInt) * 60 + (endMinuteInt - startMinuteInt);
          console.log(start, end, parkingTime);
          return parkingTime;
        } else {
          parkingTime =
            (endHourInt - startHourInt - 1) * 60 +
            (60 - startMinuteInt) +
            endMinuteInt;
          console.log(start, end, parkingTime);
          return parkingTime;
        }
      }
    } else {
      if (startMinuteInt > currentMinute) {
        if (startHourInt > endHourInt) {
          if (endMinuteInt >= startMinuteInt) {
            parkingTime =
              (endHourInt + 24 - startHourInt) * 60 +
              (endMinuteInt - startMinuteInt);
            console.log(start, end, parkingTime);
            return parkingTime;
          } else {
            parkingTime =
              (endHourInt + 24 - startHourInt - 1) * 60 +
              (60 - startMinuteInt) +
              endMinuteInt;
            console.log(start, end, parkingTime);
            return parkingTime;
          }
        } else {
          if (endMinuteInt >= startMinuteInt) {
            parkingTime =
              (endHourInt - startHourInt) * 60 +
              (endMinuteInt - startMinuteInt);
            console.log(start, end, parkingTime);
            return parkingTime;
          } else {
            parkingTime =
              (endHourInt - startHourInt - 1) * 60 +
              (60 - startMinuteInt) +
              endMinuteInt;
            console.log(start, end, parkingTime);
            return parkingTime;
          }
        }
      } else if (currentHour > endHourInt) {
        if (endMinuteInt >= currentMinute) {
          parkingTime =
            (endHourInt + 24 - currentHour) * 60 +
            (endMinuteInt - currentMinute);
          console.log(start, end, parkingTime);
          return parkingTime;
        } else {
          parkingTime =
            (endHourInt + 24 - currentHour - 1) * 60 +
            (60 - currentMinute) +
            endMinuteInt;
          console.log(start, end, parkingTime);
          return parkingTime;
        }
      } else {
        if (endMinuteInt >= currentMinute) {
          parkingTime =
            (endHourInt - currentHour) * 60 + (endMinuteInt - currentMinute);
          console.log(start, end, parkingTime);
          return parkingTime;
        } else {
          parkingTime =
            (endHourInt - currentHour - 1) * 60 +
            (60 - currentMinute) +
            endMinuteInt;
          console.log(start, end, parkingTime);
          return parkingTime;
        }
      }
    }
  }
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
      setParkingsToMap(
        parkingsToMap.sort((a, b) => a.pricePerHour - b.pricePerHour)
      );
      console.log(parkingsToMap);
    } else if (sortBy === "hours") {
      setToggleDistance("");
      setTogglePrice("");
      setToggleHours("chosen-");
      setParkingsToMap(
        parkingsToMap.sort(
          (a, b) =>
            calcTime(a.availableStart, a.availableEnd) -
            calcTime(b.availableStart, b.availableEnd)
        )
      );
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
      <br />
      <br />
      <div id={`${colorMode}-find-container`}>
        <div id="find-container-filters">
          <div id="find-location-filter">
            <div id="find-current-location">
              <div className="loaction-find-input">
                {!selectAdd && <LocationSearchInput />}
                {selectAdd && (
                  <div className="change-location-find-div">
                    <TextField
                      className="change-location-find"
                      disabled
                      label="Chosen Address"
                      value={googleLocation.fullAddress}
                    />
                    <button className="button-in-change-loc" onClick={() => setSelectAdd(false)}><img width="30" height="30" src="https://img.icons8.com/fluency-systems-filled/48/FFFFFF/change-direction.png" alt="change-direction"/></button>
                    <button className="button-in-change-loc" onClick={() => setCenter({lat: googleLocation.lat, lng: googleLocation.lng})}><img width="30" height="30" src="https://img.icons8.com/ios-filled/50/FFFFFF/search--v1.png" alt="search--v1"/></button>
                  </div>
                )}{" "}
              </div>
              {/* <button
                onClick={() => setWantToChangeLocation(!wantToChangeLocation)}
                id={`${colorMode}-find-change-location-BTN`}
              >
                change
              </button>
              {wantToChangeLocation ? (
                <div>
                  <br />
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
              ) : null} */}
            </div>
          </div>
          <br />
          <br />
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
        <br />
        <br />
        <br />
        <br />
        <div id="find-container-parkings">
          <div id="find-parking-header">
            <div className="find-parking-tab-distance">Distance</div>
            <div className="find-parking-tab-price">Price/H</div>
            <div className="find-parking-tab-hours">Hours</div>
            <div className="find-parking-tab-picture">Picture</div>
          </div>
          <BottomSheet />
          <div id="find-showing-parking-container">
            {stillLoading ? (
              <div>loading</div>
            ) : (
              parkingsToMap?.map((item, index) => {
                return (
                  <div
                    className="find-parking-tab"
                    // onClick={() => handleChosenParking(item._id)}
                    onClick={() => handleParkingClick(item._id)}
                  >
                    <div className="find-parking-tab-distance">
                      {item?.distance}
                    </div>
                    <div className="find-parking-tab-price">
                      {item.pricePerHour}
                    </div>
                    <div className="find-parking-tab-hours">
                      {item.availableStart}-<br />
                      {item.availableEnd}
                    </div>
                    <div className="find-parking-tab-picture">
                      <img
                        className="parking-tab-picture"
                        src={item.photos[0]}
                        alt=""
                      />
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
