import React, { useState , useContext } from 'react';
import './historyOneParking.css';
import { modeContext } from "../../App";

function HistoryOneParking({ name, price, startTime, endTime, phoneTopay, date1 }) {
    const [open, setOpen] = useState(false);
    const day = new Date(date1).getDate();
    const month = new Date(date1).getMonth() + 1;
    const year = new Date(date1).getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    const { colorMode} =useContext(modeContext);
    return (
        <div className='history-one-container'>
            <div className='history-item-parking2'>
                <div className='side-color-history'></div>
                <div className='history-item-text'>
                    <div className='history-item-text-name'>{name}</div>
                    <div className='history-item-text-date'>{formattedDate}</div>
                    <div className='history-item-text-add' onClick={() => setOpen(!open)}>
                     {colorMode=="light"?
                        <img className='icon-history' src="https://img.icons8.com/material-rounded/24/more.png" alt="more" />:
                        <img className='icon-history' src="https://img.icons8.com/material-rounded/24/FFFFFF/more.png" alt="more" />
                     }
                    </div>
                </div>
            </div>
            {open && (
                <div className='history-item-parking2'>
                    <div className='side-color-history'></div>
                    <div className='history-item-text'>
                        <div className='history-more-a moreeveryone'>
                            {colorMode=="light"?
                            <img className='icon-history' src="https://img.icons8.com/ios/50/time--v1.png" alt="time--v1" /> 
                            :
                            <img className='icon-history' src="https://img.icons8.com/ios/50/FFFFFF/time--v1.png" alt="time--v1"/>}
                            {startTime} - {endTime}
                        </div>
                        <div className='history-more-b moreeveryone'>
                            {colorMode=="light"?
                            <img className='icon-history' width="48" height="48" src="https://img.icons8.com/fluency-systems-regular/48/shekel.png" alt="shekel" />:
                            <img className='icon-history' width="48" height="48" src="https://img.icons8.com/fluency-systems-regular/48/FFFFFF/shekel.png" alt="shekel" />}

                            {parseFloat(price).toFixed(2)}
                        </div>
                        <div className='history-more-c moreeveryone'>
                            <a href={`tel:+${phoneTopay}`}>
                                {colorMode=="light"?
                                <img className='icon-history' src="https://img.icons8.com/ios/50/phone--v1.png" alt="phone--v1" />:
                                <img className='icon-history' src="https://img.icons8.com/ios/50/FFFFFF/phone--v1.png" alt="phone--v1" />
                                }
                                </a>
                            <a href={`https://wa.me/${phoneTopay}`}>
                                {colorMode=="light"?
                                <img className='icon-history' src="https://img.icons8.com/ios/50/whatsapp--v1.png" alt="whatsapp--v1" />:
                                <img className='icon-history' src="https://img.icons8.com/ios/50/FFFFFF/whatsapp--v1.png" alt="whatsapp--v1" />
                                }
                                </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default HistoryOneParking;
