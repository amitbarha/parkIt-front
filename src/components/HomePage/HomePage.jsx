import "./home-page.css";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import Carousel from "./CarouselStat";
{/* <a  href="https://icons8.com/icon/OxNBUwEP7Vwa/parking">Parking</a> icon by <a href="https://icons8.com">Icons8</a> */}
{/* <a  href="https://icons8.com/icon/O1Lr6vDs0bLY/car-roof-box">Car Roof Box</a> icon by <a href="https://icons8.com">Icons8</a> */}
function HomePage() {
  // const [isDriving, setIsDriving] = useState(false);

  // const handleFindParking = () => {
  //   setIsDriving(!isDriving);
  // };
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
    }

  ];
  return (
    <div className="home-page">
      <br />
      <br />
      {/* <div className={`find-circle ${isDriving ? "drive-animation" : ""}`} onClick={handleFindParking}> */}
          <div className="border-circle">
            <div className="circle">
              <h1>Find Parking Now!</h1>
            </div>
          </div>
        {/* <img
            src="data:image/png;base64,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"
            alt="Car"
            className={`car ${isDriving ? "drive-car" : ""}`}
          /> */}
          <br />
          <br />
      <div className="my-parking-section">
        <h2>My Parking:</h2>
        <div
          className={`${parkingSpots.length < 2 ? "boxes-my-parking-section-centered": "boxes-my-parking-section"}`}>
          {parkingSpots.map((parking, index) => {
            return (
              <div className="my-parking-box" key={index}>
                <div className="my-parking">
                  <div id="my-parking-img">
                    <img width="100" height="100"  src={"https://image.made-in-china.com/202f0j00jJOEDcGdwiqn/Home-Garage-Single-Post-Design-Auto-Parking-Lift.jpg"} alt="parking"/>
                  </div>
                  <div className="text-overlay">
                  <div>
                    <p>parking name: {parking.name}</p>
                  </div>
                  <div>
                    <p>status: {parking.status}</p>
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
      <div className="history">
       <h2><u>Last Parking:</u></h2>
        {/* <Link className="history-link" to={"/historyParking"}></Link> */}
        <div className="history-link">
            <p>Date</p>
            <p>Location</p>
        </div>
      </div>
      <br />
          <Carousel>
          <div className="history">
       <h2><u>History:</u></h2>
        {/* <Link className="history-link" to={"/historyParking"}></Link> */}
        <div className="history-link">
            <p>Date</p>
            <p>Location</p>
        </div>
      </div>
      <div className="history">
       <h2><u>History:</u></h2>
        {/* <Link className="history-link" to={"/historyParking"}></Link> */}
        <div className="history-link">
            <p>Date</p>
            <p>Location</p>
        </div>
      </div>
      <div className="history">
       <h2><u>History:</u></h2>
        {/* <Link className="history-link" to={"/historyParking"}></Link> */}
        <div className="history-link">
            <p>Date</p>
            <p>Location</p>
        </div>
      </div>
          </Carousel>
    </div>
  );
}

export default HomePage;
