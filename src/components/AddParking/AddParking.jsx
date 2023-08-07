import "./add-parking.css";
import { useEffect, useState, useRef, useContext } from "react";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import UploadWidget from "./UploadWidget";
import Autocomplete from "react-google-autocomplete";
import LocationSearchInput from "./LocationSearchInput";
import { useNavigate } from "react-router-dom";
import {
  CloudinaryContext,
  gooleAutoLocation,
  userDataContext,
} from "../../App";
import { HOST } from "../../Utils/host";
const daysOfWeek = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];

const AddParking = () => {
  const navigate = useNavigate();
  const { handleSubmit, control } = useForm();
  const [selectAdd, setSelectAdd] = useState(false);
  const [shortTerm, setShortTerm] = useState(false);
  const { googleLocation, setGoogleLocation } = useContext(gooleAutoLocation);
  const { cloudinaryImg, setCloudinaryImg } = useContext(CloudinaryContext);
  const { userData, setUserData } = useContext(userDataContext);
  const [selectedDays, setSelectedDays] = useState([
    true,
    true,
    true,
    true,
    true,
    false,
    false,
  ]);

  console.log(cloudinaryImg);
  useEffect(() => {
    setSelectAdd(false);
    console.log("mount");
    if (googleLocation.fullAddress != "") {
      setSelectAdd(true);
    }
  }, [googleLocation]);
  const onSubmit = (formData) => {
    formData.lat = googleLocation.lat;
    formData.lng = googleLocation.lng;
    formData.parkingLocation = googleLocation.fullAddress;
    formData.availableToPark = true;
    formData.photos = cloudinaryImg;
    formData.ownerID = userData._id;
    formData.selectedDays = selectedDays;
    formData.shortTerm = shortTerm
    if(!shortTerm)
    {
      formData.startDate=null
      formData.endDate=null
    }
    console.log(formData);
    axios
      .post(`${HOST}/parking/publishParking`, {
        parkingName: formData.parkingName,
        parkingLocation: formData.parkingLocation,
        photos: formData.photos,
        availableToPark: formData.availableToPark,
        availableStart: formData.availableStart,
        availableEnd: formData.availableEnd,
        pricePerHour: formData.pricePerHour,
        lng: formData.lng,
        lat: formData.lat,
        ownerID: formData.ownerID,
        comments: formData.comments,
        selectedDays: formData.selectedDays,
        shortTerm: formData.shortTerm,
        startDate: formData.startDate,
        endDate: formData.endDate,
      })
      .then(({ data }) => {
        alert("Create parking complete!");
        setSelectAdd(false);
        setGoogleLocation({
          lat: "",
          lng: "",
          fullAddress: "",
        });
        navigate("/homePage");
      })
      .catch((err) => console.log(err.response.data + "basa"));
  };
  const handleDaySelection = (index) => {
    const updatedSelectedDays = [...selectedDays];
    updatedSelectedDays[index] = !updatedSelectedDays[index];
    setSelectedDays(updatedSelectedDays);
  };
  const handleTermSelection = () => {
    setShortTerm(!shortTerm);
  };

  return (
    <div className="add-parking-container">
      <br />
      <h1 className="add-parking-title">Add Parking</h1>
      <br />
      <form className={`form-container`} onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="parkingName"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Enter Parking Name"
              variant="outlined"
              required
            />
          )}
        />
        {!selectAdd && <LocationSearchInput />}
        {selectAdd && (
          <div>
            <TextField
              disabled
              label="Chosen Address"
              value={googleLocation.fullAddress}
            />
            <button onClick={() => setSelectAdd(false)}>Change</button>
          </div>
        )}
        <Controller
          name="pricePerHour"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Enter Price Per Hour"
              variant="outlined"
              required
              type="number"
            />
          )}
        />
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
        { !shortTerm &&
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
        }
        {
          shortTerm &&
          <div className="chosen-short">
          <div>
            <Controller
              name="startDate"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  required
                  type="date"
                  className="time-picker-form back-time"
                  style={{ border: "medium, solid, black;", width: "135px" }}
                />
              )}
            />
          </div>
          <div>-</div>
          <div>
            <Controller
              name="endDate"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  required
                  type="date"
                  className="time-picker-form back-time"
                  style={{ border: "medium, solid, black;", width: "135px" }}
                />
              )}
            />
          </div>
        </div>
        }
        <br />
        <div className="time-picker-line">
          <div>
            <div>Start Time:</div>
            <Controller
              name="availableStart"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  required
                  type="time"
                  className="time-picker-form back-time"
                  style={{ border: "medium, solid, black;" }}
                />
              )}
            />
          </div>
          <div>
            <div>End Time:</div>
            <Controller
              name="availableEnd"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  required
                  type="time"
                  className="time-picker-form back-time"
                  style={{ border: "medium, solid, black;" }}
                />
              )}
            />
          </div>
        </div>
        <Controller
          name="comments"
          control={control}
          defaultValue=""
          className="comment"
          render={({ field }) => (
            <TextField
              {...field}
              label="Enter further Comments: height,width and etc"
              variant="outlined"
              multiline="true"
              inputProps={{
                style: {
                  height: "100px",
                },
              }}
              type="text"
              style={{ marginTop: "20px" }}
            />
          )}
        />
        <br />
        <div>
          <UploadWidget />
        </div>
        <br />
        <button type="submit" className="button-form">
          Add
        </button>
      </form>
    </div>
  );
};

export default AddParking;
