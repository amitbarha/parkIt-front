import Carousel from "./Carousel";
import "./SoloParking.css";
import Soloinner from "./Soloinner";
import HistoryOneParking from "./HistoryOnePark";
import { useState } from "react";
import { TextField } from "@mui/material";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { userDataContext } from "../../App";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { HOST } from "../../Utils/host";
import UploadWidget from "../AddParking/UploadWidget";
function SoloParking() {

  const [availableStartChange, setAvailableStartChange] = useState("");
  const [availableEndChange, setAvailableEndChange] = useState("")
  const [pricePerHourChange, setPricePerHourChange] = useState("")
  const [photoChange, setphotoChange] = useState("")
  function handlePhotoChange(newPhoto) {
    setphotoChange(newPhoto);
  }
  const { parkingId } = useParams();
  console.log(parkingId, "parkingId");

  const navigate = useNavigate()

  const [oneParkingdata, setOneParkingdata] = useState({});
  const [paymentdata, setPaymentdata] = useState({});

  const [data, setData] = useState([])

  useEffect(() => {
    axios
      .post(`${HOST}/user/translateToken`, { token: localStorage.getItem('loggedUser') })
      .then(({ data }) => {
        setData(data)
        const parking = data?.myParking.find(
          (parking) => parking._id == parkingId
        );
        console.log(parking, "parking");
        setOneParkingdata(parking);
      })
      .catch((err) => console.log(err.message));
  }, []);

  useEffect(() => {
    axios
      .get(`${HOST}/payment/fetchPayment`)
      .then(({ data }) => {
        const payments = data?.filter(
          (payments) => payments.parkingId == parkingId
        );
        console.log(payments, "payments");
        setPaymentdata(payments);
      })
      .catch((err) => console.log(err.message));

  }, [])

  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  function handleEdit() {
    setOpenEdit(!openEdit);
    setOpenDelete(false);
  }

  function handleDelete() {
    setOpenDelete(!openDelete);
    setOpenEdit(false);
  }

  function handleParkingChange() {
    console.log("parking info change");
    console.log(availableStartChange, availableEndChange, pricePerHourChange)
    if (oneParkingdata?.availableToPark == true) {
      return (
        alert("can't change parking detail while someone is park")
      )
    }
    else {
      if (availableStartChange != null && availableEndChange != null && pricePerHourChange != null) {
        const _id = parkingId;
        axios
          .patch("http://localhost:5000/parking/updateParking",
            { _id: _id, availableStart: availableStartChange, availableEnd: availableEndChange, pricePerHour: pricePerHourChange })
          .then((data) => {
            console.log("parking was update")
            navigate(`/homePage`)
          })
          .catch((err) => console.log(err));
      }
      else {
        alert("you need to fill all fields")
      }
    }
  }

  function handleParkingDelete() {
    console.log(availableStart, availableEnd, pricePerHour)
    if (oneParkingdata?.availableToPark == false) {
      return (
        alert("can't delete parking while someone is park")
      )
    }
    else {
      const _id = parkingId
      console.log(_id, "idididi")
      console.log("parking delete");
      axios
        .delete("http://localhost:5000/parking/deleteParking", { data: { _id: _id } })
        .then((data) => {
          console.log("parking was delete")
          navigate(`/homePage`)
        })
        .catch((err) => console.log(err));
    }
  }

  return (
    <div id="solo-parking-container">
      <Soloinner
        name={oneParkingdata?.parkingName}
        Address={oneParkingdata?.parkingLocation}
        IsSomeOneParking={oneParkingdata?.availableToPark}
        StartHour={oneParkingdata?.availableStart}
        EndHour={oneParkingdata?.availableEnd}
        Photos={oneParkingdata?.photos}
        Price={oneParkingdata?.pricePerHour}
        comments={oneParkingdata?.comments}
      ></Soloinner>
      <div id="Solo-parking-history-title">History:</div>
      {paymentdata[paymentdata.length - 1] && (
        <HistoryOneParking
          price={paymentdata[paymentdata.length - 1]?.finalPrice}
          name={paymentdata[paymentdata.length - 1]?.parkName}
          startTime={paymentdata[paymentdata.length - 1]?.startTime}
          endTime={paymentdata[paymentdata.length - 1]?.endTime}
          phoneTopay={paymentdata[paymentdata.length - 1]?.phoneToPay}
          date1={paymentdata[paymentdata.length - 1]?.date}
        />
      )}
      {paymentdata[paymentdata.length - 2] ? (
        <HistoryOneParking
          price={paymentdata[paymentdata.length - 2]?.finalPrice}
          name={paymentdata[paymentdata.length - 2]?.parkName}
          startTime={paymentdata[paymentdata.length - 2]?.startTime}
          endTime={paymentdata[paymentdata.length - 2]?.endTime}
          phoneTopay={paymentdata[paymentdata.length - 2]?.phoneToPay}
          date1={paymentdata[paymentdata.length - 2]?.date}
        />) : ("there is no history")}
      <div id="edit-delete-container">
        <div id="edit-delete-icon">
          <div id="edit-div-btn" onClick={() => handleEdit()}>
            <img
              className="icon-edit-delete-size"
              src="https://img.icons8.com/ios/50/edit--v1.png"
              alt="edit--v1"
            />
          </div>
          <div id="delete-div-btn" onClick={() => handleDelete()}>
            <img
              className="icon-edit-delete-size"
              src="https://img.icons8.com/ios-glyphs/30/filled-trash.png"
              alt="filled-trash"
            />
          </div>
        </div>
        {openEdit && (
          <div id="edit-delete-add">
            <div id="edit-delete-add-top">
              <div>
                <div>start time:</div>
                <input type="time" onChange={(e) => setAvailableStartChange(e.target.value)}></input>
              </div>
              <div>
                <div>end time:</div>
                <input type="time" onChange={(e) => setAvailableEndChange(e.target.value)}></input>
              </div>
            </div>
            <div id="edit-delete-add-bottom">
              <TextField label="enter your new price" onChange={(e) => setPricePerHourChange(e.target.value)}></TextField>
              <div>
                <UploadWidget onPhotoChange={handlePhotoChange}/>
              </div>
              <button id="savechange-btn" onClick={() => handleParkingChange()}>
                save changes
              </button>
            </div>
          </div>
        )}
        {openDelete && (
          <div id="edit-delete-delete">
            <button id="real-delete-btn" onClick={() => handleParkingDelete()}>
              delete the parking
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
export default SoloParking;
