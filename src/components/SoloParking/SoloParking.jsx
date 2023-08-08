import Carousel from "./Carousel";
import "./SoloParking.css";
import Soloinner from "./Soloinner";
import HistoryOneParking from "./HistoryOnePark";
import { useState } from "react";
import { TextField } from "@mui/material";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { CloudinaryContext, userDataContext } from "../../App";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { HOST } from "../../Utils/host";
import UploadWidget from "../AddParking/UploadWidget";
import { element } from "prop-types";

import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
const daysOfWeek = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];
function SoloParking() {
  const handleDaySelection = (index) => {
    const updatedSelectedDays = [...selectedDays];
    updatedSelectedDays[index] = !updatedSelectedDays[index];
    setSelectedDays(updatedSelectedDays);
  };
  const handleTermSelection = () => {
    setShortTerm(!shortTerm);
  };

  const [shortTerm, setShortTerm] = useState(false);
 
  const [pricePerHour, setPricePerhour] = useState();
  const [availableStart, setAvailableStart] = useState();
  const [availableEnd, setAvailableEnd] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [comments, setcomments] = useState();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleEditParking = () => {
    if(pricePerHour>99 ){
      return(
        alert('Price per hour must be 99 or lower')
      )
    }

    const objForSend = {
      _id: oneParkingdata._id,
      pricePerHour: pricePerHour,
      availableStart: availableStart,
      availableEnd: availableEnd,
      startDate: startDate,
      endDate: endDate,
      selectedDays: selectedDays,
      shortTerm: shortTerm,
      comments:comments
    };
    console.log(objForSend, "objForSend");

    axios
      .patch(`${HOST}/parking/updateParking`, objForSend)
      .then((data) => {
        console.log("parking was update");
        window.location.reload()
      })
      .catch((err) => console.log(err));
    setOpen(false);
  };

  const [photoChange, setphotoChange] = useState([]);
  const { parkingId } = useParams();
  console.log(parkingId, "parkingId");
  const { cloudinaryImg, setCloudinaryImg } = useContext(CloudinaryContext);
  const [selectedDays, setSelectedDays] = useState([
    true,
    true,
    true,
    true,
    true,
    false,
    false,
  ]);

  

  function handlePhotoChange(newPhoto) {
    setphotoChange(newPhoto);
  }
  const navigate = useNavigate();

  const [oneParkingdata, setOneParkingdata] = useState({});
  const [paymentdata, setPaymentdata] = useState([]);

  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .post(`${HOST}/user/translateToken`, {
        token: localStorage.getItem("loggedUser"),
      })
      .then(({ data }) => {
        setData(data);
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
  }, []);

  const [openEdit, setOpenEdit] = useState(false);

  function handleEdit() {
    setOpenEdit(!openEdit);
    setOpenDelete(false);
  }

  function handleDelete() {
    if (oneParkingdata?.availableToPark == false) {
      return alert(
        "can't delete parking while someone is park or parking is unavailble"
      );
    } else {
      if (window.confirm("Are you sure you want to delete your parking?")) {
        axios
          .delete("http://localhost:5000/parking/deleteParking", {
            data: { _id: parkingId },
          })
          .then((data) => {
            console.log("parking was delete");
            navigate(`/homePage`);
          })
          .catch((err) => console.log(err));
      }
    }
  }

  return (
    <div id="solo-parking-container">
      <Soloinner
        name={oneParkingdata?.parkingName}
        Address={oneParkingdata?.parkingLocation}
        Available={oneParkingdata?.availableToPark}
        StartHour={oneParkingdata?.availableStart}
        EndHour={oneParkingdata?.availableEnd}
        Photos={oneParkingdata?.photos}
        Price={oneParkingdata?.pricePerHour}
        comments={oneParkingdata?.comments}
        parkingID={oneParkingdata?._id}
        whoParking={oneParkingdata?.whoIsParking}
        selectedDays={oneParkingdata?.selectedDays}
        shortTerm={oneParkingdata?.shortTerm}
        startDate={oneParkingdata?.startDate}
        endDate={oneParkingdata?.endDate}
      ></Soloinner>
      <div id="edit-delete-container">
        <div id="edit-delete-icon">
          <div id="edit-div-btn" onClick={() => handleEdit()}>
            <Button onClick={handleClickOpen}>
              <img className="icon-edit-delete-size" src="https://img.icons8.com/dotty/80/C850F2/create-new.png" alt="create-new"/>
            </Button>
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Edit</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Edit your parking and then confirm it
                </DialogContentText>
                <form>
                  <TextField
                    onChange={(e) => setPricePerhour(e.target.value)}
                    autoFocus
                    margin="dense"
                    id="name"
                    label="New Price:"
                    type="number"
                    fullWidth
                  />
                  <div id="container-0f-time-soloparking">
                  <div>
                  <div>Start Time:</div>
                  <input className="back-time"
                    type="time"
                    onChange={(e) => setAvailableStart(e.target.value)}
                  ></input>
                  </div>
                  <div>
                  <div>End Time:</div>
                  <input className="back-time"
                    type="time" 
                    onChange={(e) => setAvailableEnd(e.target.value)}
                  ></input>
                  </div>
                  </div>
                  <div className="short-or-long">
                    <div>
                      <label>
                        <input
                          type="radio"
                          value="long-term"
                          checked={!shortTerm} // Set the checked state based on the shortTerm state
                          onChange={handleTermSelection} // Toggle the shortTerm state on change
                        />
                        Long term
                      </label>
                    </div>
                    <div>
                      <label>
                        <input
                          type="radio"
                          value="short-term"
                          checked={shortTerm} // Set the checked state based on the shortTerm state
                          onChange={handleTermSelection} // Toggle the shortTerm state on change
                        />
                        Short term
                      </label>
                    </div>
                  </div>
                  <br />
                  {!shortTerm && (
                    <div className="chosen-long">
                      <div>Available days:</div>
                      <div className="day-checkboxes">
                        {" "}
                        {daysOfWeek.map((day, index) => (
                          <label key={index} className="day-checkbox">
                            <input
                              type="checkbox"
                              checked={selectedDays[index]}
                              onChange={() => handleDaySelection(index)}
                            />
                            {day}
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                  {shortTerm && (
                    <div className="chosen-short">
                      <div>
                        <input 
                          onChange={(e) => setStartDate(e.target.value)}
                          type="date"
                          className="time-picker-form back-time"
                          style={{
                            border: "medium, solid, black;",
                            width: "30vw",
                          }}
                        />
                      </div>
                      <div>-</div>
                      <div>
                        <input
                          onChange={(e) => setEndDate(e.target.value)}
                          type="date"
                          className="time-picker-form back-time"
                          style={{
                            border: "medium, solid, black;",
                            width: "30vw",
                          }}
                        />
                      </div>
                    </div>
                  )}
                  <TextField
                    onChange={(e) => setcomments(e.target.value)}
                    autoFocus
                    margin="dense"
                    id="name"
                    label="New comment:"
                    type="text"
                    fullWidth
                    inputProps={{ maxLength: 40 }}
                  />
                </form>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleEditParking}>Confirm</Button>
              </DialogActions>
            </Dialog>
          </div>
          <div id="delete-div-btn" onClick={() => handleDelete()}>
            {/* <img  className="icon-edit-delete-size" src="https://img.icons8.com/bubbles/50/trash.png" alt="trash"/> */}
            <img className="icon-edit-delete-size" src="https://img.icons8.com/color/48/trash--v1.png" alt="trash--v1"/>
            {/* <img className="icon-edit-delete-size" src="https://img.icons8.com/clouds/100/trash.png" alt="trash"/> */}
          </div>
        </div>
        <div id="history-part-solo">
        <div id="Solo-parking-history-title">History:</div>
        {(paymentdata==null || paymentdata==undefined || paymentdata.length==0)&&
        <div>No one has parked yet...</div>
        }
        <div className="all-history-parking">
          {paymentdata.map((element, index) => {
            return (
              <HistoryOneParking
                price={element?.finalPrice}
                name={element?.clientName}
                startTime={element?.startTime}
                endTime={element?.endTime}
                phoneTopay={element?.clientPhone}
                date1={element?.date}
              />
            );
          })}
        </div>
      </div>
      </div>
    </div>
  );
}
export default SoloParking;
