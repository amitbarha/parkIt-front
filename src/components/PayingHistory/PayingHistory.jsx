
import { useEffect, useState } from 'react'
import HistoryOneParking from '../SoloParking/HistoryOnePark'
import './paying-history.css'
import axios from 'axios'
import { useContext } from 'react'


function PayingHistory() {
  const [ userData, setUserData ] = useState([])
  const [info1, setInfo1] = useState([])
  const [data, setData] = useState([])
  useEffect(() => {
    if (localStorage.getItem('loggedUser')) {
      axios
        .post("http://localhost:5000/user/translateToken", { 
          token: localStorage.getItem('loggedUser')
         })
        .then(({ data }) =>
          setUserData(data),
        )
        .catch((err) => console.log(err.message));

    }

  }, [])

  useEffect(() => {
    axios
      .get("http://localhost:5000/payment/fetchPayment")
      .then(({ data }) => {
        setData(data);
        setInfo1(userData?.myPayment)
      })
      .catch((err) => console.log(err.message));

  }, [userData])
  console.log(info1);
  return (
    <div className='paying-history-container'>
      <br />
      <div className="paying-history-title">
        <h1 id='paying-history-page-header'>Paying History</h1>
        <br />
      </div>
      <div className='history-pay-list'>
        {info1 && info1?.map((park, index) => {
          return (
          <div className='histoy-pay-event-tab' key={index}>
            <HistoryOneParking
              price={park?.pricePerHour}
              name={park?.parkName}
              startTime={park?.startTime}
              endTime={park?.endTime}
              phoneTopay={park?.phoneToPay}
              date1={park?.date} />
          </div>
        )})}

      </div>
    </div>
  )
}

export default PayingHistory