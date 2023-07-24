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
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${crd.latitude},${crd.longitude}&key=AIzaSyBG1NzDqiYX9i52WMEJX-_5fSVvPlKl-lA`
    )
      .then((response) => response.json())
      .then((json) => {
        return json;
        // const results = json.results;
        // location.country = results[0].address_components[5]?.long_name;
        // location.city = results[0].address_components[2]?.long_name;
        // location.street = results[0].address_components[1]?.long_name;
        // location.number = results[0].address_components[0]?.long_name;
        // location.fullAdrdess = results[0].formatted_address;
        // location.latitude = crd.latitude;
        // location.longitude = crd.longitude;
      })
      .catch((error) => console.log(error.message));
  }

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
  navigator.geolocation.getCurrentPosition(success, error, options);
}
