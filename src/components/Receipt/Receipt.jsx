import './receipt.css'
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useState } from 'react';
function Receipt(){

    const navigate = useNavigate()
    const [location,setLocation]=useState()
    const [starttime,setstartTime]=useState()
    const [endtime,setendTime]=useState()
    const[totalPrice,setPrice]=useState()


    useEffect(()=>{
        axios
        .post("http://localhost:5000/payment/getLastPayment", { token: localStorage.getItem('loggedUser') })
        .then(({ data }) =>{
         setLocation(data.parkingLocation);
         setstartTime(data.startTime);
         setendTime(data.endTime);
         setPrice(data.finalPrice)

        }          
        )
        .catch((err) => console.log(err.response.data));  
    },[])

    return(
        <div id="receipt-container">
            <div id="back-to-homepage" onClick={()=>navigate("/homePage")}><img width="50" height="50" src="https://img.icons8.com/ios/50/cancel.png" alt="cancel"/></div>
            <h1 id="page-title">Summery of your parking</h1>
            <div id="inner-container-receipt">
                <div><img width="64" height="64" src="https://img.icons8.com/cotton/64/location--v2.png" alt="location--v2"/></div>
                <div style={{ fontWeight: 'bold' }}>Location:</div>
                <div>{location}</div>
            </div>
            <div id="inner-container-receipt">
                <div><img width="100" height="100" src="https://img.icons8.com/plasticine/100/time.png" alt="time"/></div>
                <div style={{ fontWeight: 'bold' }}>Total time:</div>
                <div>{starttime}-{endtime}</div>
            </div>
            <div id="inner-container-receipt">
                <div><img width="100" height="100" src="https://img.icons8.com/plasticine/100/price-tag.png" alt="price-tag"/></div>
                <div style={{ fontWeight: 'bold' }}>Total price:</div>
                <div>${totalPrice}</div>
            </div>
            <br></br><br></br>
        </div>
    )
    
}
export default Receipt;