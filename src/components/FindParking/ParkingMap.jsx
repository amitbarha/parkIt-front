import './parking-map.css'
import { useMemo } from 'react'
import { GoogleMap, useLoadScript, Marker, MarkerF } from '@react-google-maps/api'

function ParkingMap() {
    const {isLoaded} = useLoadScript({
        googleMapsApiKey: "AIzaSyANMtJTKAtFKL5sBPkvbrhyyhayI4I3iC4"
    })

if(!isLoaded) return <div>loading</div>


  return (
    <div><Map /></div>
  )
}
function Map(){
    return(
        <GoogleMap zoom={10} center={{lat:44, lng:-80}} mapContainerClassName='map-container'>
            <MarkerF position={{lat:44, lng:-80}} />
        </GoogleMap>
    )
}

export default ParkingMap