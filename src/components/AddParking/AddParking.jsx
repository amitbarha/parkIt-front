import "./add-parking.css";
import { useEffect, useState, useRef } from "react";
import {getAddress} from './../longFunction'
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
// const location = getAddress()
// console.log(location.fullAdrdess);

const AddParking = () => {
  const { handleSubmit, control } = useForm();
  const [locationObj, setLocationObj] = useState()


  useEffect(() => {
    // const location = getAddress()
    // setLocationObj(location);
    // console.log(location.fullAdrdess);
    // console.log(locationObj?.fullAddress);
  }, []);
  

  const onSubmit = (formData) => {
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

        <Controller
          name="parkingLocation"
          control={control}
          defaultValue={locationObj?.fullAddress}
          render={({ field }) => (
            <TextField
              {...field}
              label="Enter Address"
              variant="outlined"
              required
            />
          )}
        />
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

        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default AddParking;
