import React, { useState, useContext } from "react";
import { TextField } from "@mui/material";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { gooleAutoLocation } from "../../App";
import "./location-search.css";

function LocationSearchInput() {
  const [address, setAddress] = useState("");
  const { googleLocation, setGoogleLocation } = useContext(gooleAutoLocation);
  const handleChange = (newAddress) => {
    setAddress(newAddress);
  };

  const handleSelect = (selectedAddress) => {
    geocodeByAddress(selectedAddress)
      .then((results) => {
        getLatLng(results[0]).then((latLng) => {
          console.log(results[0].formatted_address);
          setGoogleLocation({
            ...googleLocation,
            fullAddress: results[0].formatted_address,
            lat: latLng?.lat,
            lng: latLng?.lng,
          });
        });
      })
      .catch((error) => console.error("Error", error));
  };
  console.log(googleLocation);
  return (
    <PlacesAutocomplete
      value={address}
      onChange={handleChange}
      onSelect={handleSelect}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div>
          <TextField
            id="google-search-input"
            placeholder="Parking Address *"
            onChange={() => setSelectAdd(true)}
            required
            style={{color:"var(--regular-text)"}}
            className=""
            {...getInputProps({
              className: "location-search-input",
            })}
          />

          <div className="autocomplete-dropdown-container edit-autocomplete">
            {loading && <div>Loading...</div>}
            {suggestions.map((suggestion, index) => {
              const className = suggestion.active
                ? "suggestion-item--active edit-autocomplete"
                : "suggestion-item edit-autocomplete";
              // inline style for demonstration purpose
              const style = suggestion.active
                ? { backgroundColor: "#B794C0", cursor: "pointer" }
                : { backgroundColor: "#B794C0", cursor: "pointer" };
              return (
                <div
                  className="city-line-google"
                  key={index}
                  {...getSuggestionItemProps(suggestion, { className, style })}
                >
                  <span className="city-line-google">
                    {suggestion.description}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  );
}

export default LocationSearchInput;
