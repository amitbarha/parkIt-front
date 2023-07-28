import "./onepick.css";
import Soloinner from "../SoloParking/Soloinner";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
function Onepick() {
  const { parkingId } = useParams();
  console.log("id", parkingId);
  const [parkingData, setParkingData] = useState();
  useEffect(() => {
    axios
      .post("http://localhost:5000/parking/findOneParking", { "_id" : "64c2279a6d95516b7b14f91a" })
      .then(({ data }) => {
        setParkingData(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const handleStartParking = ()=>{
    const date = new Date()
    const time = [date.getHours(),date.getMinutes()]
    const strTime = time.join(":")
    console.log(strTime);

    const payment = {

    }
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
