import React, { useState, useEffect, useContext } from "react";
import { useSpring, animated } from "react-spring";
import "./bottom-sheet.css"; // Import the CSS for styling
import { ChosenParkingContext } from "../../App";
import Carousel from "../SoloParking/Carousel";
import axios from "axios";
import { useNavigate } from "react-router";

const BottomSheet = () => {
  const navigate = useNavigate()
  const [loggedUser, setLoggedUser] = useState();
  const [ownerParkingData, setOwnerParkingData] = useState();
  const {
    openSpring,
    setOpenSpring,
    parkingId,
    parkingIdData,
    setParkingIdData,
  } = useContext(ChosenParkingContext);
  useEffect(() => {
    console.log('mount');
    if (localStorage.getItem("loggedUser")) {
      axios
        .post("http://localhost:5000/user/translateToken", {
          token: localStorage.getItem("loggedUser"),
        })
        .then(({ data }) => setLoggedUser(data))
        .catch((err) => console.log(err.message));
    }

    axios
      .post("http://localhost:5000/user/findUserById", {
        _id: parkingIdData?.ownerID,
      })
      .then(({ data }) => {
        setOwnerParkingData(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [parkingId]);
  
  const [isOpen, setIsOpen] = useState(false);
  const height = screen.height;
  const size = height * 0.8;

  // Define the animation spring for the bottom sheet
  const bottomSheetAnimation = useSpring({
    bottom: openSpring ? 0 : -size, // Change -200 to whatever height you want the bottom sheet to be when closed
  });

  const toggleBottomSheet = () => {
    setOpenSpring(!openSpring);
  };
  const handleStartParking = ()=>{
    console.log(ownerParkingData,"ownerparkingdata")
    const date = new Date()
    const time = [date.getHours(),date.getMinutes()]
    const strTime = time.join(":")
    console.log(strTime);

    const payment = {
      token:localStorage.getItem('loggedUser'),
      parkingId:parkingIdData._id,
      parkName:parkingIdData.parkingName,
      startTime: strTime,
      endTime: null,
      pricePerHour: parkingIdData.pricePerHour,
      parkingLocation: parkingIdData.parkingLocation,
      phoneToPay: ownerParkingData.phoneNumber,
      clientPhone: loggedUser.phoneNumber,
      finalPrice:null
    }

    console.log(payment,"payment")

    axios
      .post("http://localhost:5000/payment/publishPayment", payment)
      .then(({ data }) => {
        alert("starting parking at time:")
        navigate('/homePage')
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }

  return (
    <div>
      {/* Your main content here */}
      {/* The bottom sheet */}
      <animated.div className="bottom-sheet" style={bottomSheetAnimation}>
        <button onClick={toggleBottomSheet} className="close-button">
          Close
        </button>
        <hr />
        {/* Content inside the bottom sheet */}
        <div className="parking-chosen-container">
          <div className="image-and-title-parking">
            <div className="title-parking">
              <div className="parking-name-chosen">
                {parkingIdData?.parkingName}
              </div>
              <div className="parking-address-chosen">
                {parkingIdData?.parkingLocation}
              </div>
            </div>
            <div className="image-chosen">
              <img
                className="image-chosen"
                src={parkingIdData?.photos[0]}
                alt=""
              />
            </div>
          </div>
          <br />
          <div className="price-div">
            <span className="price-bold">{parkingIdData?.pricePerHour}$</span>
            <span>&nbsp;Per Hour</span>
          </div>
          <br />
          <div className="icons-details">
            <div className="line-icon">
              <div className="icon-chosen-parking">
                <img
                  className="icon-image-park"
                  src="https://img.icons8.com/ios/50/time--v1.png"
                  height={40}
                  width={40}
                  alt="time--v1"
                />
              </div>
              <div className="text-for-icon">
                {parkingIdData?.availableStart} - {parkingIdData?.availableEnd}
              </div>
            </div>
            <br />
            <div className="line-icon">
              <div className="icon-chosen-parking">
                <img
                  width="40"
                  height="40"
                  src="https://img.icons8.com/external-those-icons-fill-those-icons/24/external-distance-maps-and-locations-those-icons-fill-those-icons-1.png"
                  alt="external-distance-maps-and-locations-those-icons-fill-those-icons-1"
                />
              </div>
              <div className="text-for-icon">
                <b>425M</b> from destination
              </div>
            </div>
          </div>
          <br />
          <div id="solo-parking-img-container">
            <Carousel>
              {parkingIdData?.photos.map((element, index) => {
                return (
                  <img
                    className="parking-img-chosen"
                    key={index}
                    src={element}
                  ></img>
                );
              })}
            </Carousel>
          </div>
          <div className="start-parking-button">
            <button onClick={handleStartParking} type="submit" className="button-form button-parking">
              Start Parking
            </button>
          </div>
        </div>
      </animated.div>
    </div>
  );
};

export default BottomSheet;
