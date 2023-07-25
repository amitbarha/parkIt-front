import OnePaying from './OnePaying'
import './paying-history.css'

function PayingHistory() {
  return (
    <div className='paying-history-container'>
        <div className="paying-history-title">
            <h1>Paying History</h1>
        </div>
        <OnePaying />
    </div>
  )
}

export default PayingHistory