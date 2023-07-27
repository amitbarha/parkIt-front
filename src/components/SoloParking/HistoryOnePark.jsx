import { useState } from 'react';
import './historyOneParking.css'
function HistoryOneParking({name,price}){
    const [open,setOpen]=useState(false)
    console.log(price);
    
    return(
    <div className='history-one-container'>
        <div className='history-item-parking2'>
            <div className='side-color-history'></div>
            <div className='history-item-text'>
                <div className='history-item-text-name'>{name}</div>        
                <div className='history-item-text-date'>12/12/2000</div>
                <div className='history-item-text-add'  onClick={()=>setOpen(!open)}><img className='icon-history' src="https://img.icons8.com/material-rounded/24/more.png" alt="more"/></div>
            </div>
        </div>
        {open&&
            <div className='history-item-parking2'>
             <div className='side-color-history'></div>
             <div className='history-item-text'>
                <div className='history-more-a moreeveryone'><img className='icon-history' src="https://img.icons8.com/ios/50/time--v1.png" alt="time--v1"/> 19:00-20:00</div> 
                <div className='history-more-b moreeveryone'><img className='icon-history' src="https://img.icons8.com/ios/50/money-bag.png" alt="money-bag"/>{price}</div>       
                <div className='history-more-c moreeveryone'><img className='icon-history' src="https://img.icons8.com/ios/50/phone--v1.png" alt="phone--v1"/><img className='icon-history' src="https://img.icons8.com/ios/50/whatsapp--v1.png" alt="whatsapp--v1"/></div>
             </div>
            </div>
        }
    </div>
    )
}
export default HistoryOneParking;