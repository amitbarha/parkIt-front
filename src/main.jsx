import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import ParkingMap from './components/FindParking/ParkingMap.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <React.StrictMode>
    <App />
    {/* <ParkingMap /> */}
  </React.StrictMode>
</BrowserRouter>
)
