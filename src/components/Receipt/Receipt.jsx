import './receipt.css'
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useState , useContext } from 'react';
import { HOST } from '../../Utils/host'
import { modeContext } from "../../App";
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
function Receipt() {

    const navigate = useNavigate()
    const [location, setLocation] = useState()
    const [starttime, setstartTime] = useState()
    const [endtime, setendTime] = useState()
    const [totalPrice, setPrice] = useState()
    const newTotal = parseFloat(totalPrice);
    const { colorMode} =useContext(modeContext);
    useEffect(() => {
        axios
            .post(`${HOST}/payment/getLastPayment`, { token: localStorage.getItem('loggedUser') })
            .then(({ data }) => {
                setLocation(data.parkingLocation);
                setstartTime(data.startTime);
                setendTime(data.endTime);
                setPrice(data.finalPrice)
                console.log(data);

            }
            )
            .catch((err) => console.log(err.response.data));
    }, [])
    return (
        <div id="receipt-container">
            <div id="back-to-homepage" onClick={() => navigate("/homePage")}>
                {colorMode=="light"?
                <img width="50" height="50" src="https://img.icons8.com/ios/50/cancel.png" alt="cancel" />:
                <img width="50" height="50" src="https://img.icons8.com/ios/50/FFFFFF/cancel.png" alt="cancel" />
                }
                </div>
            <h1 id="page-title">Summary of your parking</h1>
            <div id="inner-container-receipt">
                <div><img width="64" height="64" src="https://img.icons8.com/cotton/64/location--v2.png" alt="location--v2" /></div>
                <div className='above-detail-con'>Location:</div>
                <div className='detail-con'>{location}</div>
            </div>
            <div id="inner-container-receipt">
                <div><img onClick={() => navigate("/homePage")} width="100" height="100" src="https://img.icons8.com/plasticine/100/time.png" alt="time" /></div>
                <div className='above-detail-con'>Total time:</div>
                <div className='detail-con'>{starttime}-{endtime}</div>
            </div>
            <div id="inner-container-receipt">
                <div><img width="100" height="100" src="https://img.icons8.com/plasticine/100/price-tag.png" alt="price-tag" /></div>
                <div className='above-detail-con'>Total price:</div>
                <div className='detail-con'> {typeof newTotal === 'number' ? `₪${newTotal.toFixed(1)}` : ''}</div>
            </div>
            <br></br>
            <PayPalScriptProvider >
                <PayPalButtons  />
            </PayPalScriptProvider>
        </div>
    )

}
export default Receipt;