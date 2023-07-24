export function getAddress() {
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };
  const location = {
    fullAdrdess: "",
    country: "",
    city: "",
    street: "",
    number: "",
    latitude: "",
    longitude: "",
  };

  function success(pos) {
    const crd = pos.coords;

    console.log("Your current position is:");
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${crd.latitude},${crd.longitude}&key=AIzaSyBG1NzDqiYX9i52WMEJX-_5fSVvPlKl-lA`
    )
      .then((response) => response.json())
      .then((json) => {
        console.log(json.results);
        const results = json.results
        location.country = results[0].address_components[5].long_name;
        location.city = results[0].address_components[2].long_name;
        location.street = results[0].address_components[1].long_name;
        location.number = results[0].address_components[0].long_name;
        location.fullAdrdess = results[0].formatted_address;
        location.latitude = crd.latitude;
        location.longitude = crd.longitude;
        console.log(lo);
      })
      .catch((err) => console.log("error"));
  }

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  navigator.geolocation.getCurrentPosition(success, error, options);
  return location
}

// export function get
