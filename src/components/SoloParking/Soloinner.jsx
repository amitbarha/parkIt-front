import Carousel from './Carousel';
import './soloinner.css';
function Soloinner({ name, IsSomeOneParking, Address, StartHour, EndHour, Price, Photos, comments }) {
    return (
        <>
            <div id='solo-parking-name'>{name}</div>
            <div className='solo-parking-detail'>
                <div className='solo-parking-detail-divforicon'><img className='icon-con' src="https://img.icons8.com/pastel-glyph/64/parking--v4.png" alt="parking--v4" />|</div>
                <div className='solo-parking-detail-divfortext'>{IsSomeOneParking ? "Unavailble" : "Availble"}</div>
            </div>
            <div className='solo-parking-detail'>
                <div className='solo-parking-detail-divforicon'><img className='icon-con' src="https://img.icons8.com/ios/50/marker--v1.png" alt="marker--v1" />|</div>
                <div className='solo-parking-detail-divfortext'>{Address}</div>
            </div>
            <div className='solo-parking-detail'>
                <div className='solo-parking-detail-divforicon'><img className='icon-con' src="https://img.icons8.com/ios/50/time--v1.png" alt="time--v1" />|</div>
                <div className='solo-parking-detail-divfortext'>{StartHour} - {EndHour}</div>
            </div>
            <div className='solo-parking-detail'>
                <div className='solo-parking-detail-divforicon'><img className='icon-con' src="https://img.icons8.com/ios/50/average-2.png" alt="average-2" />|</div>
                <div className='solo-parking-detail-divfortext'>${Price} per hour</div>
            </div>
            {comments ? (
                <div className='solo-parking-detail-comment'>
                    <div className='solo-parking-detail-divforicon'>
                        <img className='icon-con' src="https://img.icons8.com/?size=512&id=38977&format=png" alt="average-2" />|
                    </div>
                    <div className='solo-parking-detail-divfortext-comment'>
                        {comments}
                    </div>
                </div>
            ) : ("")}
            <div id='solo-parking-img-container'>
                <Carousel>
                    {Photos?.map((element, index) => {
                        return (
                            <img className='parking-img' key={index} src={element}></img>
                        )
                    })}

                </Carousel>
            </div>
    </>
   )
}
export default Soloinner;