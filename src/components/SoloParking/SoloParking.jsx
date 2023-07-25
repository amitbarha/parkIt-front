import Carousel from './Carousel';
import './SoloParking.css'
function SoloParking(){
   return(
    <div id='solo-parking-container'>
        <div id='solo-parking-name'>parking name</div>
        <div className='solo-parking-detail'>
            <div className='solo-parking-detail-divforicon'><img className='icon-con' src="https://img.icons8.com/pastel-glyph/64/parking--v4.png" alt="parking--v4"/>|</div>
            <div className='solo-parking-detail-divfortext'>is someone parking or not</div>
        </div>
        <div className='solo-parking-detail'>
            <div className='solo-parking-detail-divforicon'><img className='icon-con' src="https://img.icons8.com/ios/50/marker--v1.png" alt="marker--v1"/>|</div>
            <div className='solo-parking-detail-divfortext'>Address</div>
        </div>
        <div className='solo-parking-detail'>
            <div className='solo-parking-detail-divforicon'><img className='icon-con' src="https://img.icons8.com/ios/50/time--v1.png" alt="time--v1"/>|</div>
            <div className='solo-parking-detail-divfortext'>open hour - end hour</div>
        </div>
        <div className='solo-parking-detail'>
            <div className='solo-parking-detail-divforicon'><img className='icon-con' src="https://img.icons8.com/ios/50/average-2.png" alt="average-2"/>|</div>
            <div className='solo-parking-detail-divfortext'>price</div>
        </div>
         
        <div id='solo-parking-img-container'>
            <Carousel>
                <img src='https://www.99acres.com/microsite/articles/files/2018/07/car-parking.jpg'></img>  
                <img src='https://image.shutterstock.com/image-photo/empty-space-parking-260nw-332087375.jpg'></img> 
                <img src='https://cdn.abcotvs.com/dip/images/12217832_090922-kgo-pricey-parking-img.jpg'></img>                      
            </Carousel>
        </div>
        <div id='Solo-parking-history-title'>History:</div>
        <div className='history-item-parking'>
            <div className='side-color-history'>side</div>
            <div className='history-item-text'>item1</div>
        </div>
       
    </div>
   )
}
export default SoloParking;