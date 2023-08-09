import "./home-page.css";
import { Link } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Carousel from "./CarouselStat";
import HistoryOneParking from "../SoloParking/HistoryOnePark";
import axios from "axios";
import { modeContext } from "../../App";
import { userDataContext } from "../../App";
import Timer from "./Timer";
import { HOST } from "../../Utils/host";

{
  /* <a  href="https://icons8.com/icon/OxNBUwEP7Vwa/parking">Parking</a> icon by <a href="https://icons8.com">Icons8</a> */
}
{
  /* <a  href="https://icons8.com/icon/O1Lr6vDs0bLY/car-roof-box">Car Roof Box</a> icon by <a href="https://icons8.com">Icons8</a> */
}

function HomePage() {
  const [avg, setAvg] = useState("");

  const navigate = useNavigate();
  const [timerWork, setTimerWork] = useState();
  const { userData, setUserData } = useContext(userDataContext);
  const [Time, setTime] = useState(false);
  const [info, setInfo] = useState([]);
  const [info1, setInfo1] = useState([]);
  const [Data, setData] = useState([]);
  const [activeParking, setActiveParking] = useState([]);
  const { colorMode, setColorMode } = useContext(modeContext);
  useEffect(() => {
    if (localStorage.getItem("loggedUser")) {
      axios
        .post(`${HOST}/user/translateToken`, {
          token: localStorage.getItem("loggedUser"),
        })
        .then(({ data }) => {
          setUserData(data);
          setTimerWork(data.currentParking);
        })
        .catch((err) => console.log(err.message));
    }
  }, []);

  useEffect(() => {
    axios
      .get(`${HOST}/payment/avgPerHour`)
      .then(({ data }) => {
        setAvg(data);
      })
      .catch((err) => console.log(err.message));

    axios
      .get(`${HOST}/parking/fetchParking`)
      .then(({ data }) => {
        setData(data);
        setInfo(userData?.myParking);
        setInfo1(userData?.myPayment);
      })
      .catch((err) => console.log(err.message));

    axios
      .get(`${HOST}/parking/availableParking`)
      .then(({ data }) => {
        setActiveParking(data);
      })
      .catch((err) => console.log(err.message));
  }, [userData]);

  const goToFindParkingPage = () => {
    navigate("/FindParking");
  };

  function handleGoToSoloParking(id) {
    navigate(`/SoloParking/${id}`);
  }

  function stopParkingFunc() {
    console.log("stop");
    axios
      .patch(`${HOST}/payment/updatePayment`, {
        token: localStorage.getItem("loggedUser"),
      })
      .then(({ data }) => {
        navigate("/Receipt");
        socket.emit("updatepark", info);
      })
      .catch((err) => console.log(err.response.data));
  }

  // const permittedValues = Data?.map(value => value.pricePerHour);
  // const snatch=permittedValues?.reduce((a,b)=>{return (a*1+b*1)/Data?.length})

  return (
    <div className="home-page">
      <br />
      <br />
      {timerWork && (
        <div className="timer-open-div">
          <div className="border-circle border-circle-timer">
            <div
              className="circle circle-timer"
              onClick={() => stopParkingFunc()}
            >
              <h2>
                {" "}
                <Timer
                  startTime={
                    userData.myPayment[userData.myPayment.length - 1].date
                  }
                />
              </h2>
              <div>Click to stop</div>
            </div>
          </div>
          {info1 && (
            <div className="mini-circles-div">
              <div className="mini-circle">
                <a href={`tel:+${info1[info1.length - 1]?.phoneToPay}`}>
                  {colorMode == "light" ? (
                    <img
                      width="50"
                      height="50"
                      src="https://img.icons8.com/ios/50/phone--v1.png"
                      alt="phone--v1"
                    />
                  ) : (
                    <img
                      width="50"
                      height="50"
                      src="https://img.icons8.com/ios/50/FFFFFF/phone--v1.png"
                      alt="phone--v1"
                    />
                  )}
                </a>
              </div>
              <div className="mini-circle">
                <a
                  href={`https://www.google.com/maps?q=${encodeURIComponent(
                    info1[info1.length - 1]?.parkingLocation
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    width="50"
                    height="50"
                    src="https://img.icons8.com/color/48/google-maps-new.png"
                    alt="google-maps-new"
                  />
                </a>
              </div>
            </div>
          )}
        </div>
      )}
      {!timerWork && (
        <div className="border-circle">
          <div className="circle" onClick={goToFindParkingPage}>
            <h1 id="home-big-circle-inner-header">Find Parking Now!</h1>
          </div>
        </div>
      )}

      <div className="web-top-page">
        <div className="border-circle-web">
          <div className="circle-web">
            <img
              src="http://res.cloudinary.com/deiofeueo/image/upload/v1691048663/mroogw5gclyjxswyaixm.jpg"
              alt=""
            />
            <p>You can search for parkings only from mobile!</p>
          </div>
        </div>
      </div>

      <br />
      <br />
      <div className="my-parking-section">
        <h2 className="home-page-sub-header">My Parking:</h2>
        <div
          className={`${
            userData?.myParking.length < 2
              ? "boxes-my-parking-section-centered"
              : "boxes-my-parking-section"
          }`}
        >
          <div className="all-parking-map">
            {userData?.myParking &&
              userData?.myParking.map((parking, index) => {
                return (
                  <div
                    className="my-parking-box"
                    key={index}
                    onClick={() =>
                      handleGoToSoloParking(userData?.myParking[index]._id)
                    }
                  >
                    <div className="my-parking">
                      <div id="my-parking-img">
                        <img
                          width="100"
                          height="100"
                          src={
                            parking.photos[0]
                              ? parking.photos[0]
                              : "http://res.cloudinary.com/deiofeueo/image/upload/v1691048663/mroogw5gclyjxswyaixm.jpg"
                          }
                          alt="parking"
                        />
                      </div>
                      <div className="text-overlay">
                        <div className="parking-name-my-parking">
                          <img
                            id="icon-name-my-parking"
                            width="64"
                            height="64"
                            src="https://img.icons8.com/pastel-glyph/64/FFFFFF/parking--v4.png"
                            alt="parking--v4"
                          />
                          <p>Parking Name: {parking.parkingName}</p>
                        </div>
                        <div className="bottom-icon-parking">
                          <div className="parking-status-my-parking">
                            <img
                              id="icon-status-my-parking"
                              width="64"
                              height="64"
                              src="https://img.icons8.com/sf-regular/48/FFFFFF/ok.png"
                              alt="ok"
                            />
                            <p>
                              {parking.availableToPark
                                ? "Availible"
                                : "Unavailble "}
                            </p>
                          </div>
                          {!parking.currentLicense && (
                            <div className="parking-status-my-parking">
                              <img
                                id="icon-status-my-parking"
                                width="10"
                                height="10"
                                src="https://img.icons8.com/material-outlined/24/FFFFFF/sedan.png"
                                alt="sedan"
                              />
                              <p>
                                &nbsp;
                                {parking.currentLicense}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="add-parking-box">
            <Link className="add-parking" to={"/addParking"}>
              <h5>Add New Parking:</h5>{" "}
              {colorMode == "light" ? (
                <img
                  width="72"
                  height="72"
                  src="https://img.icons8.com/external-line-adri-ansyah/64/external-plus-essentials-ui-line-adri-ansyah.png"
                  alt="external-plus-essentials-ui-line-adri-ansyah"
                />
              ) : (
                <img width="96" height="96" src="https://img.icons8.com/ios/50/FFFFFF/plus-math--v1.png" alt="plus-math--v1"/>
              )}
            </Link>
          </div>

          <div className="my-parking-section-web">
            <h2 className="home-page-sub-header">My Parking:</h2>
            <div className="all-parking-main-web">
              <div className="all-parking-map-web">
                {userData?.myParking &&
                  userData?.myParking.map((parking, index) => {
                    return (
                      <div
                        className="my-parking-box-web"
                        key={index}
                        onClick={() =>
                          handleGoToSoloParking(userData?.myParking[index]._id)
                        }
                      >
                        <div className="my-parking-web">
                          <div id="my-parking-img-web">
                            <img
                              width="100"
                              height="100"
                              src={
                                parking.photos[0]
                                  ? parking.photos[0]
                                  : "http://res.cloudinary.com/deiofeueo/image/upload/v1691048663/mroogw5gclyjxswyaixm.jpg"
                              }
                              alt="parking"
                            />
                          </div>
                          <div className="text-overlay-web">
                            <div className="parking-name-my-parking-web">
                              <img
                                id="icon-name-my-parking-web"
                                width="64"
                                height="64"
                                src="https://img.icons8.com/pastel-glyph/64/FFFFFF/parking--v4.png"
                                alt="parking--v4"
                              />
                              <p>Parking Name: {parking.parkingName}</p>
                            </div>
                            <div className="bottom-icon-parking">
                              <div className="parking-status-my-parking-web">
                                <img
                                  id="icon-status-my-parking-web"
                                  width="64"
                                  height="64"
                                  src="https://img.icons8.com/sf-regular/48/FFFFFF/ok.png"
                                  alt="ok"
                                />
                                <p>
                                  {parking.availableToPark
                                    ? "Availible"
                                    : "Unavailble "}
                                </p>
                              </div>
                              {parking.currentLicense && (
                                <div className="parking-status-my-parking-web">
                                  <img
                                    id="icon-status-my-parking"
                                    width="10"
                                    height="10"
                                    src="https://img.icons8.com/material-outlined/24/FFFFFF/sedan.png"
                                    alt="sedan"
                                  />
                                  <p>
                                    &nbsp;
                                    {parking.currentLicense}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                <div className="add-parking-box-web">
                  <Link className="add-parking-web" to={"/addParking"}>
                    <h5>Add New Parking:</h5>{" "}
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
          </div>
        </div>
      </div>
      <br />
      <br />
      <div className="last-history">
        <h1 className="home-page-sub-header">Last Parking:</h1>
        {info1?.length > 0 ? (
          <HistoryOneParking
            price={info1[info1.length - 1]?.finalPrice}
            name={info1[info1.length - 1]?.parkName}
            startTime={info1[info1.length - 1]?.startTime}
            endTime={info1[info1.length - 1]?.endTime}
            phoneTopay={info1[info1.length - 1]?.phoneToPay}
            date1={info1[info1.length - 1]?.date}
          />
        ) : (
          <h1>There is no last parking </h1>
        )}
      </div>
      <br />
      <div className="Statistics-container">
        <h1 className="home-page-sub-header">Statistics:</h1>
        <Carousel>
          <div className="first-pair-stat">
            <div className="box-stat">
              <div className="icon-state">
                <img
                  width="50"
                  height="50"
                  src="data:image/png;base64,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"
                  alt="walking"
                />
              </div>
              <div className="name-state">
                <p>Available now:</p>
              </div>
              <div className="info-state">
                <h1>{activeParking?.length}</h1>
              </div>
            </div>
            <div className="box-stat">
              <div className="icon-state">
                <img
                  width="50"
                  height="50"
                  src="https://img.icons8.com/fluency-systems-regular/48/FFFFFF/shekel.png"
                  alt="parking"
                />
              </div>
              <div className="name-state">
                <p>Your profit</p>
              </div>
              <div className="info-state">
                <h1>{parseFloat(userData?.totalEarn.toFixed(2))}₪</h1>
              </div>
            </div>
          </div>
          <div className="second-pair-stat">
            <div className="box-stat">
              <div className="icon-state">
                <img
                  width="48"
                  height="48"
                  src="https://img.icons8.com/fluency-systems-regular/48/FFFFFF/shekel.png"
                  alt="shekel"
                />
              </div>
              <div className="name-state">
                <p>Average P/H:</p>
              </div>
              <div className="info-state">
                <h1>{avg}₪</h1>
              </div>
            </div>
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
                <p>Parkings in the app:</p>
              </div>
              <div className="info-state">
                <h1>{Data?.length}</h1>
              </div>
            </div>
          </div>
        </Carousel>
      </div>
      <div className="web-stat">
        <div className="box-stat-web">
          <div className="icon-state-web">
            <img
              width="50"
              height="50"
              src="data:image/png;base64,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"
              alt="walking"
            />
          </div>
          <div className="name-state-web">
            <p>Available now:</p>
          </div>
          <div className="info-state-web">
            <p id="data-p">{activeParking?.length}</p>
          </div>
        </div>
        <div className="box-stat-web">
          <div className="icon-state-web">
            <img
              width="50"
              height="50"
              src="https://img.icons8.com/fluency-systems-regular/48/FFFFFF/shekel.png"
              alt="parking"
            />
          </div>
          <div className="name-state-web">
            <p>Your profit</p>
          </div>
          <div className="info-state-web">
            <p id="data-p">{parseFloat(userData?.totalEarn.toFixed(2))}₪</p>
          </div>
        </div>
        <div className="box-stat-web">
          <div className="icon-state-web">
            <img
              width="48"
              height="48"
              src="https://img.icons8.com/fluency-systems-regular/48/FFFFFF/shekel.png"
              alt="shekel"
            />
          </div>
          <div className="name-state-web">
            <p>Average P/H:</p>
          </div>
          <div className="info-state-web">
            <p id="data-p">{avg}₪</p>
          </div>
        </div>
        <div className="box-stat-web">
          <div className="icon-state-web">
            <img
              width="50"
              height="50"
              src="https://img.icons8.com/fluency-systems-regular/48/FFFFFF/parking.png"
              alt="parking"
            />
          </div>
          <div className="name-state-web">
            <p>Parkings in the app:</p>
          </div>
          <div className="info-state-web">
            <p id="data-p">{Data?.length}</p>
          </div>
        </div>
      </div>
      <br />
    </div>
  );
}

export default HomePage;
