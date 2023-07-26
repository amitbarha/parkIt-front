import { useState } from 'react';
import './historyOneParking.css'
function HistoryOneParking(){
    const [open,setOpen]=useState(false)
    return(
    <div className='history-one-container'>
        <div className='history-item-parking2'>
            <div className='side-color-history'></div>
            <div className='history-item-text'>
                <div className='history-item-text-name'>amit bar haim</div>        
                <div className='history-item-text-date'>12/12/2000</div>
                <div className='history-item-text-add'  onClick={()=>setOpen(!open)}><img className='icon-history' src="https://img.icons8.com/material-rounded/24/more.png" alt="more"/></div>
            </div>
        </div>
        {open&&
            <div className='history-item-parking2'>
             <div className='side-color-history'></div>
             <div className='history-item-text'>
                <div className='history-more-a moreeveryone'><img className='icon-history' src="https://img.icons8.com/ios/50/time--v1.png" alt="time--v1"/></div>
                <div className='history-more-b moreeveryone'>19:00-20:00</div> 
                <div className='history-more-c moreeveryone'><img className='icon-history' src="https://img.icons8.com/ios/50/money-bag.png" alt="money-bag"/></div>
                <div className='history-more-d moreeveryone'>234.22</div>        
                <div className='history-more-e moreeveryone'><img className='icon-history' src="https://img.icons8.com/ios/50/phone--v1.png" alt="phone--v1"/></div>
                <div className='history-more-f moreeveryone'><img className='icon-history' src="https://img.icons8.com/ios/50/whatsapp--v1.png" alt="whatsapp--v1"/></div>
             </div>
            </div>
        }
    </div>
    )
}
export default HistoryOneParking;