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
import io from 'socket.io-client';

function FindParking() {
  const payment={}
  const socket = io('http://localhost:5000');
  const {
    openSpring,
    setOpenSpring,
    parkingId,
    setParkingId,
    parkingIdData,
    setParkingIdData,
    center,
    setCenter,
    myLocation,
  } = useContext(ChosenParkingContext);
  const { googleLocation, setGoogleLocation } = useContext(gooleAutoLocation);
  const [selectAdd, setSelectAdd] = useState(false);
  const [finishDistance, setFinishDistance] = useState(false);
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
  const [distancesLoaded, setDistancesLoaded] = useState(false);
  const [open, setOpen] = useState(false);
  const [parkav, setParkav] = useState(true);

socket.on('know-publish',(payment)=>{
 setParkav(!parkav);
 console.log(!parkav);
})
socket.on('know-update',()=>{
 setParkav(!parkav);
})
  const navigate = useNavigate();

  const handleParkingClick = (id) => {
    console.log(id, "dflkgjdkuhgu");
    console.log(parkingsToMap);
    setOpenSpring(!openSpring);
    setParkingId(id);
    console.log(id);
    const parking = parkingsToMap?.find((park) => park._id === id);
    setParkingIdData(parking)
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
   
    if (center) {
      const lng = center.lng
      const lat = center.lat
    
    axios
      .post(`${HOST}/parking/availableParkingAndDistance`, {lat,lng})
      .then(({ data }) => {
        setParkingsToMap(data);
        setStillLoading(false);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setStillLoading(false);
      });
    }
  }, [center,parkav]);
  // console.log(parkingsToMap);

  useEffect(() => {
    // Function to calculate distance for each parking location
  }, []);

 

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
    let endTimeArr = end.split("");
    const currentTime = new Date();
    let startMinutesFromMN= (parseInt(`${startTimeArr[0]}${startTimeArr[1]}`))*60+(parseInt(`${startTimeArr[3]}${startTimeArr[4]}`))
    let endMinutesFromMN= (parseInt(`${endTimeArr[0]}${endTimeArr[1]}`))*60+(parseInt(`${endTimeArr[3]}${endTimeArr[4]}`))
    let currentMinuteFromMN= (currentTime.getHours())*60+(currentTime.getMinutes())

    if((endMinutesFromMN-startMinutesFromMN)>0){ //parking ends in the same day as the starting
      if (currentMinuteFromMN>startMinutesFromMN && currentMinuteFromMN< endMinutesFromMN){ //parking already started but didnt end.
        parkingTime=endMinutesFromMN-currentMinuteFromMN
        // console.log(`start:${start} end:${end} diffence:${parkingTime}`);
        return parkingTime
      } else if(currentMinuteFromMN>startMinutesFromMN && currentMinuteFromMN>endMinutesFromMN){  // parking already ended for that day
        parkingTime=0
        // console.log(`start:${start} end:${end} diffence:${parkingTime}`);
        return parkingTime
      } else if(currentMinuteFromMN<startMinutesFromMN && currentMinuteFromMN<endMinutesFromMN){ //parking didnt start yet 
        parkingTime=endMinutesFromMN-startMinutesFromMN
        // console.log(`start:${start} end:${end} diffence:${parkingTime}`);
        return parkingTime
      }
    } else if ((endMinutesFromMN-startMinutesFromMN)<0) { //parking ends in the next day but starts today
      let endHourPlusDay=endMinutesFromMN+1440
      if (currentMinuteFromMN<startMinutesFromMN && currentMinuteFromMN<endHourPlusDay && currentMinuteFromMN>endMinutesFromMN){ //parking didnt start yet, it will start today but will end tomarrow
        parkingTime=endHourPlusDay-startMinutesFromMN
        // console.log(`start:${start} end:${end} diffence:${parkingTime}`);
        return parkingTime
      } else if(currentMinuteFromMN>startMinutesFromMN && currentMinuteFromMN<endHourPlusDay && currentMinuteFromMN>endMinutesFromMN){ //parkign already started today and will end tomarrow
        parkingTime=currentMinuteFromMN-startMinutesFromMN
        // console.log(`start:${start} end:${end} diffence:${parkingTime}`);
        return parkingTime
      } else if(currentMinuteFromMN<startMinutesFromMN && currentMinuteFromMN<endHourPlusDay && currentMinuteFromMN<endMinutesFromMN){ //parking started yasterday but didnt end yet.
        parkingTime=endMinutesFromMN-currentMinuteFromMN
        // console.log(`start:${start} end:${end} diffence:${parkingTime}`);
        return parkingTime
      }
    } else if((endMinutesFromMN-startMinutesFromMN)==0){ //parking start and ends at the same time of the day.
        parkingTime=1440
        // console.log(`start:${start} end:${end} diffence:${parkingTime}`);
        return parkingTime
    } else { //edge case of somthing that went wrong
      // console.log("Somthing is not right with the hours");
      parkingTime=0
      // console.log(`start:${start} end:${end} diffence:${parkingTime}`);
      return parkingTime
    }
  }

  useEffect(() => {
    if (sortBy === "distance") {
      setToggleDistance("chosen-");
      setTogglePrice("");
      setToggleHours("");
      setParkingsToMap(
        parkingsToMap.sort((a, b) => a.distanceValue*1 - b.distanceValue*1)
      );
      console.log(parkingsToMap, "parki");

      
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
          calcTime(b.availableStart, b.availableEnd)-
          calcTime(a.availableStart, a.availableEnd) 
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
      <div id={`${colorMode}-find-container`}>
        <div id="find-container-filters">
          <div id="find-location-filter">
            <div id="find-current-location">
              <div className="loaction-find-input">
                {!selectAdd && <LocationSearchInput />}
                {selectAdd && (
                  <div className="change-location-find-div">
                    <button
                      className="button-in-change-loc"
                      onClick={() => {setCenter(myLocation); setSelectAdd(false) }}
                    >
                      <img
                        width="30"
                        height="30"
                        src="https://img.icons8.com/ios-filled/50/FFFFFF/center-direction.png"
                        alt="center-direction"
                      />
                    </button>
                    <TextField
                      className="change-location-find"
                      disabled
                      label="Chosen Address"
                      value={googleLocation.fullAddress}
                    />
                    <button
                      className="button-in-change-loc"
                      onClick={() => setSelectAdd(false)}
                    >
                      <img
                        width="30"
                        height="30"
                        src="https://img.icons8.com/fluency-systems-filled/48/FFFFFF/change-direction.png"
                        alt="change-direction"
                      />
                    </button>
                    <button
                      className="button-in-change-loc"
                      onClick={() =>
                        setCenter({
                          lat: googleLocation.lat,
                          lng: googleLocation.lng,
                        })
                      }
                    >
                      <img
                        width="30"
                        height="30"
                        src="https://img.icons8.com/ios-filled/50/FFFFFF/search--v1.png"
                        alt="search--v1"
                      />
                    </button>
                  </div>
                )}{" "}
              </div>
            </div>
          </div>
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
        <div id="find-container-parkings">
          <div id="find-parking-header">
            <div className="find-parking-tab-distance">Distance</div>
            <div className="find-parking-tab-price">Price/H</div>
            <div className="find-parking-tab-hours">End-Hour</div>
            <div className="find-parking-tab-picture">Picture</div>
          </div>
          <BottomSheet payment={payment}/>
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
                    { item?.distanceText }
                    </div>
                    <div className="find-parking-tab-price">₪
                      {item.pricePerHour}
                    </div>
                    <div className="find-parking-tab-hours">
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
            {/* <div
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
              </div> */}
            {/* </div> */}
          </div>
        </div>
      </div>
      <br />
    </div>
  );
}

export default FindParking;
