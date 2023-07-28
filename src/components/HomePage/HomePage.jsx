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
  const { userData, setUserData } = useContext(userDataContext);
  const [Time, setTime] = useState(false);
  const [info, setInfo] = useState([])
  const [info1, setInfo1] = useState([])
  const [data, setData] = useState([])
  const [ownerID, setownerID] = useState([])


  useEffect(() => {
    if (localStorage.getItem('loggedUser')) {
      axios
        .post("http://localhost:5000/user/translateToken", { token: localStorage.getItem('loggedUser') })
        .then(({ data }) =>
          setUserData(data),
        )
        .catch((err) => console.log(err.message));
    }
  }, []);

  useEffect(() => {
    axios

    .get("http://localhost:5000/parking/fetchParking")
    .then(({ data }) => {
      setData(data);
      setInfo(userData?.myParking)
    setInfo1(userData?.myPayment)
    setownerID(data.ownerID)

    })
    .catch((err) => console.log(err.message));
    
  }, [userData])


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


  function handleGoToSoloParking(id) {
    console.log("get into goto func")
    navigate(`/SoloParking/${id}`)
  }



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
          <div id="min-circles-container">
            <div className="mini-circles-div">
              <div className="mini-circle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="50"
                  height="50"
                  fill="currentColor"
                  class="bi bi-whatsapp"
                  viewBox="0 0 16 16"
                >
                  <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
                </svg>
              </div>
            </div>
            <div className="mini-circles-div">
              <div className="mini-circle">
                <img
                  width="50"
                  height="50"
                  src="https://img.icons8.com/ios/50/phone--v1.png"
                  alt="phone--v1"
                />
              </div>
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
          className={`${
            userData?.myParking.length < 2
              ? "boxes-my-parking-section-centered"
              : "boxes-my-parking-section"
          }`}
        >

          {userData?.myParking && userData?.myParking.map((parking, index) => {
            return (
              <div className="my-parking-box" key={index} onClick={() => handleGoToSoloParking(userData?.myParking[index]._id)}>
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
                    <div className="text-overlay">
                      <div>
                        <p>parking name: {parking.parkingLocation}</p>
                      </div>
                      <div>
                        <p>status: {parking.availableToPark ? "yes" : "no"}</p>
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

        {/* {console.log(info1)} */}
        {
          info1 && <HistoryOneParking
            price={info1[info1.length - 1]?.pricePerHour}
            name={info1[info1.length - 1]?.parkName}
            startTime={info1[info1.length - 1]?.startTime}
            endTime={info1[info1.length - 1]?.endTime}
            phoneTopay={info1[info1.length - 1]?.phoneToPay}
            date1={info1[info1.length - 1]?.date}
          ></HistoryOneParking>
        )}
      </div>
      <br />
      <div className="Statistics-container">
        <h1>Statistics:</h1>
        <Carousel>
          <div className="first-pair-stat">
            <div className="box-stat">
              <div className="icon-state">
                <img
                  width="50"
                  height="50"
                  src="https://img.icons8.com/fluency-systems-regular/48/FFFFFF/parking.png"
                  alt="parking"
                />
              </div>
              <div className="name-state">
                <p>Availible Parkings:</p>
              </div>
              <div className="info-state">
                <h1>{data?.length}</h1>
              </div>
            </div>
            <div className="box-stat">
              <div className="icon-state">
                <img
                  width="50"
                  height="50"
                  src="https://img.icons8.com/ios-filled/50/FFFFFF/walking.png"
                  alt="walking"
                />
              </div>
              <div className="name-state">
                <p>closest parking:</p>
              </div>
              <div className="info-state">
                <h1>378m</h1>
              </div>
            </div>
          </div>
          <div className="second-pair-stat">
            <div className="box-stat">
              <div className="icon-state">
                <img
                  width="50"
                  height="50"
                  src="https://img.icons8.com/ios/50/FFFFFF/average-2.png"
                  alt="average-2"
                />
              </div>
              <div className="name-state">
                <p>Average P/H:</p>
              </div>
              <div className="info-state">
                <h1>15₪</h1>
              </div>
            </div>
            <div className="box-stat">
              <div className="icon-state"><img width="50" height="50" src="https://img.icons8.com/fluency-systems-regular/48/FFFFFF/parking.png" alt="parking" /></div>
              <div className="name-state"><p>parking usage:</p></div>
              <div className="info-state"><h1>ibbnl</h1></div>
              <div className="icon-state">
                <img
                  width="50"
                  height="50"
                  src="https://img.icons8.com/fluency-systems-regular/48/FFFFFF/parking.png"
                  alt="parking"
                />
              </div>
              <div className="name-state">
                <p>Availible Parkings:</p>
              </div>
              <div className="info-state">
                <h1>588</h1>
              </div>
            </div>
          </div>
        </Carousel>
      </div>
      {userData?.username}
    </div>
  );
}

export default HomePage;
