import "./home-page.css";
import { Link } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Carousel from "./CarouselStat";
import HistoryOneParking from "../SoloParking/HistoryOnePark";
import axios from "axios";
import { userDataContext } from "../../App";



{
  /* <a  href="https://icons8.com/icon/OxNBUwEP7Vwa/parking">Parking</a> icon by <a href="https://icons8.com">Icons8</a> */
}
{
  /* <a  href="https://icons8.com/icon/O1Lr6vDs0bLY/car-roof-box">Car Roof Box</a> icon by <a href="https://icons8.com">Icons8</a> */
}

function HomePage() {
  const navigate = useNavigate();
  const [startTimer, setStartTimer] = useState(false);
  const { userData, setUserData } = useContext(userDataContext)
  const [Time, setTime] = useState(false);
  const [info, setInfo] = useState([])
  const [info1, setInfo1] = useState([])


  useEffect(() => {
    if (userData) {
      getData()
    }
  })

  const getData = () => {
    setInfo(userData?.myParking)
    setInfo1(userData?.myPayment)
  }


  const parkingSpots = [
    {
      imgUrl: "https://img.icons8.com/fluency-systems-regular/48/parking.png",
      name: "first parking",
      status: "available",
    },
    {
      imgUrl: "https://img.icons8.com/fluency-systems-regular/48/parking.png",
      name: "first parking",
      status: "available",
    },
  ];
  // const handleStartTimer = () =>
  // {
  //   //this function will moved to start parking inside the parking page
  //   setStartTimer(!startTimer)
  //   const date = new Date();
  //   const time = [date.getHours(), date.getMinutes()]
  //   setTime(time)
  // }
  const goToFindParkingPage = () => {
    navigate("/FindParking");
  };

  console.log(info)
  return (
    <div className="home-page">
      <br />
      <br />
      {/* {startTimer && (
        <div className="timer-open-div">
          <div className="border-circle border-circle-timer">
            <div className="circle circle-timer">
              <h3>Start time: {`${Time[0]}:${Time[1]}`}</h3>
              <div>Click to stop</div>
            </div>
          </div>
          <div className="mini-circles-div">
            <div className="mini-circle">
            <img width="50" height="50" src="https://img.icons8.com/ios/50/phone--v1.png" alt="phone--v1"/>
            </div>
          </div>
        </div>
      )} */}
      {!startTimer && (
        // <div className="border-circle" onClick={handleStartTimer}>
        <div className="border-circle">
          <div className="circle" onClick={goToFindParkingPage}>
            <h1>Find Parking Now!</h1>
          </div>
        </div>
      )}
      <br />
      <br />
      <div className="my-parking-section">
        <h2>My Parking:</h2>
        <div
          className={`${userData?.myParking.length < 2
            ? "boxes-my-parking-section-centered"
            : "boxes-my-parking-section"
            }`}
        >
          {userData?.myParking && userData?.myParking.map((parking, index) => {
            return (
              <div className="my-parking-box" key={index}>
                <div className="my-parking">
                  <div id="my-parking-img">
                    <img
                      width="100"
                      height="100"
                      src={
                        parking.photos[0]
                      }
                      alt="parking"
                    />
                  </div>
                  <div className="text-overlay">
                    <div>
                      <p>parking name: {parking.parkingLocation}</p>
                    </div>
                    <div>
                      <p>status: {parking.availableToPark ? 'yes' : 'no'}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <div className="add-parking-box">
            <Link className="add-parking" to={"/addParking"}>
              Add New Parking{" "}
              <img
                width="72"
                height="72"
                src="https://img.icons8.com/external-line-adri-ansyah/64/external-plus-essentials-ui-line-adri-ansyah.png"
                alt="external-plus-essentials-ui-line-adri-ansyah"
              />
            </Link>
          </div>
        </div>
      </div>
      <br />
      <br />
      <div className="last-history">
        <h1>Last Parking:</h1>
        <HistoryOneParking 
        price={info1[info1.length-1]?.pricePerHour} 
        name={info[info.length-1]?.parkingName}
         userData={userData}>
         </HistoryOneParking>
      </div>
      <br />
      <div className="Statistics-container">
        <h1 >Statistics:</h1>
        <Carousel>
          <div className="first-pair-stat">
            <div className="box-stat">
              <div className="icon-state"><img width="50" height="50" src="https://img.icons8.com/fluency-systems-regular/48/FFFFFF/parking.png" alt="parking" /></div>
              <div className="name-state"><p>Availible Parkings:</p></div>
              <div className="info-state"><h1>588</h1>
              </div>
            </div>
            <div className="box-stat">
              <div className="icon-state"><img width="50" height="50" src="https://img.icons8.com/ios-filled/50/FFFFFF/walking.png" alt="walking" /></div>
              <div className="name-state"><p>closest parking:</p></div>
              <div className="info-state"><h1>378m</h1></div>
            </div>
          </div>
          <div className="second-pair-stat">
            <div className="box-stat">
              <div className="icon-state"><img width="50" height="50" src="https://img.icons8.com/ios/50/FFFFFF/average-2.png" alt="average-2" /></div>
              <div className="name-state"><p>Average P/H:</p></div>
              <div className="info-state"><h1>15₪</h1></div>
            </div>
            <div className="box-stat">
              <div className="icon-state"><img width="50" height="50" src="https://img.icons8.com/fluency-systems-regular/48/FFFFFF/parking.png" alt="parking" /></div>
              <div className="name-state"><p>Availible Parkings:</p></div>
              <div className="info-state"><h1>588</h1></div>
            </div>
          </div>
        </Carousel>
      </div>
      {userData?.username}
    </div>
  );
}

export default HomePage;

