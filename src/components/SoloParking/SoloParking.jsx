import Carousel from './Carousel';
import './SoloParking.css';
import Soloinner from './Soloinner';
import HistoryOneParking from './HistoryOnePark';
import { useState } from 'react';
import { TextField } from '@mui/material';
function SoloParking(){
    const [openEdit, setOpenEdit]=useState(false)
    const [openDelete, setOpenDelete]=useState(false)

    function handleEdit(){
        setOpenEdit(!openEdit)
        setOpenDelete(false)
    }

    function handleDelete(){
        setOpenDelete(!openDelete)
        setOpenEdit(false)
    }

    function handleParkingChange(){
        console.log("parking info change")
        //need to add axios
        //need to add no option for change if someone parking
    }

    function handleParkingDelete(){
        console.log("parking delete")
        //need to add axios
        //need to make usenavigate to home page
        //need to add no option to delete if someone parking
    }

   return(
    <div id='solo-parking-container'>   
        <Soloinner></Soloinner>
        <div id='Solo-parking-history-title'>History:</div>
        <HistoryOneParking></HistoryOneParking>
        <HistoryOneParking></HistoryOneParking> 
        <div id='edit-delete-container'>
            <div id='edit-delete-icon'>
               <div id='edit-div-btn' onClick={()=>handleEdit()}><img className='icon-edit-delete-size' src="https://img.icons8.com/ios/50/edit--v1.png" alt="edit--v1"/></div>
               <div id='delete-div-btn' onClick={()=>handleDelete()}><img className='icon-edit-delete-size'  src="https://img.icons8.com/ios-glyphs/30/filled-trash.png" alt="filled-trash"/></div>
            </div>
            {openEdit &&
             <div id='edit-delete-add'>
                <div id='edit-delete-add-top'>
                  <div>
                    <div>start time:</div>
                    <input type='time'></input>
                  </div>
                  <div>
                   <div>end time:</div>
                   <input type='time'></input>
                 </div>
                </div>
                <div id='edit-delete-add-bottom'>
                  <TextField label='enter your new price'></TextField>
                  <button id='savechange-btn' onClick={()=>handleParkingChange()}>save changes</button>
                </div>
             </div>
            }
            {openDelete &&
             <div id='edit-delete-delete'>
               <button id='real-delete-btn' onClick={()=>handleParkingDelete()}>delete the parking</button>
             </div>
            }      
        </div>    
    </div>
   )
}
export default SoloParking;