import "./onepick.css";
import Soloinner from "../SoloParking/Soloinner";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
function Onepick() {

  const[loggedUser,setLoggedUser]=useState()

  const[check,setCheck]=useState(false)

  const { parkingId } = useParams();
  console.log("id", parkingId);
  const [parkingData, setParkingData] = useState();
  const[ownerParkingData,setOwnerParkingData]=useState()



  useEffect(() => {
    axios
      .post("http://localhost:5000/parking/findOneParking", { _id : parkingId })
      .then(({ data }) => {
        setParkingData(data);
        setCheck(!check)
      })
      .catch((err) => {
        console.log(err.message);
      });

      if (localStorage.getItem('loggedUser')) {
        axios
          .post("http://localhost:5000/user/translateToken", { token: localStorage.getItem('loggedUser') })
          .then(({ data }) =>
            setLoggedUser(data),
          )
          .catch((err) => console.log(err.message));
  
      }
  }, []);
  useEffect(()=>{
    if(check){
      axios
      .post("http://localhost:5000/user/findUserById", { _id : parkingData?.ownerID })
      .then(({ data }) => {
        setOwnerParkingData(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
    }
  },[check])

  const handleStartParking = ()=>{
    console.log(ownerParkingData,"ownerparkingdata")
    console.log(parkingData.ownerID,"blbla")
    const date = new Date()
    const time = [date.getHours(),date.getMinutes()]
    const strTime = time.join(":")
    console.log(strTime);

    const payment = {
      token:localStorage.getItem('loggedUser'),
      parkingId:parkingData._id,
      parkName:parkingData.parkingName,
      startTime: strTime,
      endTime: null,
      pricePerHour: parkingData.pricePerHour,
      parkingLocation: parkingData.parkingLocation,
      phoneToPay: ownerParkingData.phoneNumber,
      clientPhone: loggedUser.phoneNumber,
      finalPrice:null
    }

    console.log(payment,"payment")

    axios
      .post("http://localhost:5000/payment/publishPayment", payment)
      .then(({ data }) => {
        console.log("new payment create");
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
  return (
    <div id="pickone-container">
       <Soloinner
        name={parkingData?.parkingName}
        Address={parkingData?.parkingLocation}
        IsSomeOneParking={parkingData?.availableToPark}
        StartHour={parkingData?.availableStart}
        EndHour={parkingData?.availableEnd}
        Photos={parkingData?.photos}
        Price={parkingData?.pricePerHour}
      ></Soloinner>
      <button className="startparking-btn" onClick={handleStartParking}>Start parking</button>
    </div>
  );
}
export default Onepick;
