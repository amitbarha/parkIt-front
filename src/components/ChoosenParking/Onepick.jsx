import './onepick.css'
import Soloinner from '../SoloParking/Soloinner';
function Onepick(){
    return(
        <div id='pickone-container'>
            <Soloinner></Soloinner>
            <button className='startparking-btn'>Start parking</button>
        </div>
    )
}
export default Onepick;