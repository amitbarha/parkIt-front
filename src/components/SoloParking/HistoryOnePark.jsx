import { useState } from 'react';
import './historyOneParking.css'
function HistoryOneParking({ name, price, startTime, endTime, phoneTopay, date1 }) {
    const [open, setOpen] = useState(false)
    const day = new Date(date1).getDate()
    const month = new Date(date1).getMonth() + 1
    const year = new Date(date1).getFullYear()

    const formattedDate = `${day}/${month}/${year}`;
 

    return (
        <div className='history-one-container'>
            <div className='history-item-parking2'>
                <div className='side-color-history'></div>
                <div className='history-item-text'>
                    <div className='history-item-text-name'>{name}</div>
                    <div className='history-item-text-date'>{formattedDate && formattedDate}</div>
                    <div className='history-item-text-add' onClick={() => setOpen(!open)}>
                        <img className='icon-history' src="https://img.icons8.com/material-rounded/24/more.png" alt="more" />
                    </div>
                </div>
            </div>
            {open &&
                <div className='history-item-parking2'>
                    <div className='side-color-history'></div>
                    <div className='history-item-text'>
                        <div className='history-more-a moreeveryone'>
                            <img className='icon-history' src="https://img.icons8.com/ios/50/time--v1.png" alt="time--v1" /> {startTime}- {endTime}
                        </div>
                        <div className='history-more-b moreeveryone'>
                            <img className='icon-history' src="https://img.icons8.com/ios/50/money-bag.png" alt="money-bag" />{Math.floor(price)}
                        </div>
                        <div className='history-more-c moreeveryone'>
                            <a href={`tel:+${phoneTopay}`}><img className='icon-history' src="https://img.icons8.com/ios/50/phone--v1.png" alt="phone--v1" /></a>
                            <a href={`tel:+${phoneTopay}`}><img className='icon-history' src="https://img.icons8.com/ios/50/whatsapp--v1.png" alt="whatsapp--v1" /></a>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}
export default HistoryOneParking;