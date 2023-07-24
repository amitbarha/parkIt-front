import "./add-parking.css";
import { useEffect, useState, useRef } from "react";
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
const location = {
  fullAdrdess: "",
  country: "",
  city: "",
  street: "",
  number: "",
  latitude: "",
  longitude: "",
};
navigator.geolocation.getCurrentPosition(function (position) {
  location.latitude = position.coords.latitude;
  location.longitude = position.coords.longitude;
});

export function getAddress() {
  console.log(location);
  fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.latitude},${location.longitude}&key=AIzaSyBG1NzDqiYX9i52WMEJX-_5fSVvPlKl-lA`
  )
    .then((response) => response.json())
    .then((json) => {
      console.log("whhoo");
      console.log(json);
      const results = json.results;
      location.country = results[0].address_components[4]?.long_name;
      location.city = results[0].address_components[2]?.long_name;
      location.street = results[0].address_components[1]?.long_name;
      location.number = results[0].address_components[0]?.long_name;
      location.fullAdrdess = results[0].formatted_address;
    })
    .catch((error) => console.log(error.message));

  return location;
}

const AddParking = () => {
  const { handleSubmit, control } = useForm();
  const [locationObj, setLocationObj] = useState();
  const [locationAddress, setLocationAddress] = useState("hii");

  useEffect(() => {
    setLocationObj(getAddress());
    console.log(locationObj);
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
      <button onClick={() => console.log(locationObj)}>hii</button>
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
        <div>
          <div onClick={() => setLocationAddress(locationObj.fullAdrdess)}>
            use location
          </div>
          <Controller
            name="parkingLocation"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Enter Address"
                variant="outlined"
                required
              />
            )}
          />
        </div>
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
