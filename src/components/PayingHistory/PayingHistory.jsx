
import HistoryOneParking from '../SoloParking/HistoryOnePark'
import './paying-history.css'

function PayingHistory() {
  return (
    <div className='paying-history-container'>
        <br />
        <div className="paying-history-title">
            <h1>Paying History</h1>
            <br />
        </div>
        <div className='history-pay-list'>
           <HistoryOneParking />
        </div>
    </div>
  )
}

export default PayingHistory