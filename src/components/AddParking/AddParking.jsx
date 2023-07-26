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
import { gooleAutoLocation } from '../../App';

const AddParking = () => {
  
  const { handleSubmit, control } = useForm();
  const [selectAdd, setSelectAdd] = useState(false);
  const [data, setData] = useState([])
  useEffect(() => {
    axios
      .post("http://localhost:5000/user/translateToken",
        {
          token: localStorage.getItem("loggedUser")
        })
      .then(({ data }) => {
        setData(data)
        console.log(data);
      }
      )
      .catch((err) => console.log(err.message));
  }, [])
  const { googleLocation, setGoogleLocation } = useContext(gooleAutoLocation)

  const onSubmit = (formData) => {
    formData.lat = googleLocation.lat
    formData.lng = googleLocation.lng
    formData.fullAddress = googleLocation.fullAddress
    formData.availableToPark = false;
    console.log(formData);
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
         <LocationSearchInput />
        <TextField disabled label="Chosen Address" value={googleLocation.fullAddress} />
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
                />
              )}
            />
          </div>
        </div>
        <br />
        <div>
          <div>upload image //need fix</div>
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
