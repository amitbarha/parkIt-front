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
import { HOST } from '../../Utils/host'

const AddParking = () => {
  const navigate = useNavigate()
  const { handleSubmit, control } = useForm();
  const [selectAdd, setSelectAdd] = useState(false);
  const { googleLocation, setGoogleLocation } = useContext(gooleAutoLocation);
  const { cloudinaryImg, setCloudinaryImg } = useContext(CloudinaryContext);
  const { userData, setUserData } = useContext(userDataContext);

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
        comments: formData.comments
      })
      .then(({ data }) => {
        alert("Create parking complete!");
        setSelectAdd(false);
        setGoogleLocation({
          lat: "",
          lng: "",
          fullAddress: ""
        });
        navigate("/homePage");
      })
      .catch((err) => console.log(err.message + "basa"));

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
                  className="time-picker-form"
                  style={{ border:"medium, solid, black;" }}
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
                  className="time-picker-form"
                  style={{ border:"medium, solid, black;" }}
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
              multiline='true'
              inputProps={{
                style: {
                  height: "100px",
                },
              }}
              
              type="text"
              style={{ marginTop:"20px" }}
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
