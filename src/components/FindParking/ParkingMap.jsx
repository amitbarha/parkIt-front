import "./parking-map.css";
import { useEffect, useMemo, useState, useContext } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  MarkerF,
  MarkerClusterer,
  DistanceMatrixService
} from "@react-google-maps/api";
import NavigationIcon from "@mui/icons-material/Navigation";
import IconLocation from "./../../assets/iconlocation.png";
import ParkingLocationIcon from "./../../assets/parking-location.png";
import axios from "axios";
import { ChosenParkingContext } from "../../App";

function ParkingMap() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyANMtJTKAtFKL5sBPkvbrhyyhayI4I3iC4",
  });

  if (!isLoaded) return <div>loading</div>;

  return (
    <div>
      <Map />
    </div>
  );
}
const CustomIcon = () => {
  return (
    <div
      style={{
        backgroundColor: "blue",
        color: "white",
        padding: "5px",
        borderRadius: "50%",
      }}
    >
      A
    </div>
  );
};
function Map() {
  const {
    openSpring,
    setOpenSpring,
    parkingId,
    setParkingId,
    parkingIdData,
    setParkingIdData,
    center,
    setCenter
  } = useContext(ChosenParkingContext);

  const [allParking, setAllParking] = useState();
  useEffect(() => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    function success(pos) {
      const crd = pos.coords;
      const croods = {
        lat: crd.latitude,
        lng: crd.longitude,
      };
      setCenter(croods);
    }

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
  }, []);

  useEffect(() => {
    axios
      .get(`${HOST}/parking/fetchParking`)
      .then(({ data }) => {
        setAllParking(data);
        console.log(data);
      })
      .catch((err) => console.log(err.message));
  }, []);

  const handleParkingClick = (id) => {
    setOpenSpring(!openSpring);
    setParkingId(id);
    console.log(id);
    const parking = allParking?.find((park) => park._id === id)
    setParkingIdData(parking)
    console.log(parking);
  };

  return (
    <GoogleMap zoom={16} center={center} mapContainerClassName="map-container">
      <MarkerF
        icon={{ url: IconLocation }}
        onClick={() => console.log("my location")}
        position={center}
      />
      {allParking?.map((parking, index) => {
        return (
          <MarkerF
          
            key={index}
            icon={{ url: ParkingLocationIcon }}
            position={{ lat: parking.lat * 1, lng: parking.lng * 1 }}
            onClick={() => handleParkingClick(parking._id)}
            // onClick={() => console.log(parking.parkingLocation)}
          />
        );
      })}
    </GoogleMap>
  );
}

export default ParkingMap;
