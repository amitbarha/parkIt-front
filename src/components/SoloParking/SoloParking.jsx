import Carousel from './Carousel';
import './SoloParking.css';
import Soloinner from './Soloinner';
import HistoryOneParking from './HistoryOnePark';
function SoloParking(){
   return(
    <div id='solo-parking-container'>   
        <Soloinner></Soloinner>
        <div id='Solo-parking-history-title'>History:</div>
        <HistoryOneParking></HistoryOneParking>
        <HistoryOneParking></HistoryOneParking>     
    </div>
   )
}
export default SoloParking;