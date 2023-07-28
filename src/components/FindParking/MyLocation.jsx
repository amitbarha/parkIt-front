import { useEffect } from "react";
function MyLocation() {
  useEffect(() => {
    const findMyCoordinates = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log(position.coords.latitude, position.coords.longitude);
          },
          (err) => {
            console.log(err.message);
          }
        );
      } else {
        alert("Geolocation is not supported by your browser");
      }
    };
  }, []);
  // useEffect(() => {
  //           async function requestPermission() {
  //             await requestLocationPermission();
  //           }
  //           requestPermission();
  //         }, []);

  // const options = {
  //     enableHighAccuracy: true,
  //     timeout: 5000,
  //     maximumAge: 0,
  // };

  // function success(pos) {
  //     const crd = pos.coords;

  //     console.log("Your current position is:");
  //     console.log(`Latitude : ${crd.latitude}`);
  //     console.log(`Longitude: ${crd.longitude}`);
  //     console.log(`More or less ${crd.accuracy} meters.`);
  // }

  // function error(err) {
  //     console.warn(`ERROR(${err.code}): ${err.message}`);
  // }

  // navigator.geolocation.getCurrentPosition(success, error, options);
}
export default MyLocation;

// import { useState } from "react";
//   const [location, setLocation] = useState(null);
//   const [weather, setWeather] = useState(null);
//   function handleLocationClick() {
//     useEffect(() => {
//       async function requestPermission() {
//         await requestLocationPermission();
//       }
//       requestPermission();
//     }, []);

//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(success, error);
//     } else {
//       console.log("Geolocation not supported");
//     }
//   }

//   function success(position) {
//     const latitude = position.coords.latitude;
//     const longitude = position.coords.longitude;
//     console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
//     fetch(
//       `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=<YOUR_API_KEY>&units=metric`
//     )
//       .then((response) => response.json())
//       .then((data) => {
//         setWeather(data);
//         console.log(data);
//       })
//       .catch((error) => console.log(error));
//   }

//   function error() {
//     console.log("Unable to retrieve your location");
//   }

//   return (
//     <div>
//       {!location ? (
//         <button onClick={handleLocationClick}>Get Location</button>
//       ) : null}
//       {location && !weather ? <p>Loading weather data...</p> : null}
//       {weather ? (
//         <div>
//           <p>Location: {weather.name}</p>
//           <p>Temperature: {weather.main.temp} °C</p>
//           <p>Weather: {weather.weather[0].description}</p>
//         </div>
//       ) : null}
//     </div>
//   );
