import Carousel from "./Carousel";
import { HOST } from "../../Utils/host";
import "./soloinner.css";
import axios from "axios";
import { useState } from "react";
function Soloinner({
  name,
  Available,
  Address,
  StartHour,
  EndHour,
  Price,
  Photos,
  comments,
  parkingID,
  whoParking,
}) {
  const [available, setAvailable] = useState(Available);
  console.log(available, "ava");
  function changeStatus(id) {
    if (whoParking == undefined || whoParking == null || whoParking == "") {
      if (confirm("Are you sure you want to unaible your parking?")) {
        setAvailable(!available);
        axios
          .patch(`${HOST}/parking/changeStatus`, { _id: id })
          .then((data) => {
            console.log("function work");
            window.location.reload();
          })
          .catch((err) => console.log(err.response.data));
      }
    }
    else
    {
        alert("Someone parking now. try again later")
    }
  }

  return (
    <>
      <div id="solo-parking-name">{name}</div>

      <div className="solo-parking-detail">
        <div className="solo-parking-detail-divforicon">
          <img
            className="icon-con"
            src="https://img.icons8.com/pastel-glyph/64/parking--v4.png"
            alt="parking--v4"
          />
          |
        </div>
        <div className="solo-parking-detail-divfortext">
          {Available ? "Available" : "Unavailble"}
          <div class="checkbox-apple">
            <input
              class="yep"
              id="check-apple"
              type="checkbox"
              checked={Available}
              onChange={() => changeStatus(parkingID)}
            ></input>
            <label for="check-apple"></label>
          </div>
        </div>
      </div>
      <div className="solo-parking-detail">
        <div className="solo-parking-detail-divforicon">
          <img
            className="icon-con"
            src="https://img.icons8.com/ios/50/marker--v1.png"
            alt="marker--v1"
          />
          |
        </div>
        <div className="solo-parking-detail-divfortext">{Address}</div>
      </div>
      <div className="solo-parking-detail">
        <div className="solo-parking-detail-divforicon">
          <img
            className="icon-con"
            src="https://img.icons8.com/ios/50/time--v1.png"
            alt="time--v1"
          />
          |
        </div>
        <div className="solo-parking-detail-divfortext">
          {StartHour} - {EndHour}
        </div>
      </div>
      <div className="solo-parking-detail">
        <div className="solo-parking-detail-divforicon">
          <img
            className="icon-con"
            src="https://img.icons8.com/ios/50/average-2.png"
            alt="average-2"
          />
          |
        </div>
        <div className="solo-parking-detail-divfortext">${Price} per hour</div>
      </div>
      {comments ? (
        <div className="solo-parking-detail">
          <div className="solo-parking-detail-divforicon">
            <img
              className="icon-con"
              src="https://img.icons8.com/?size=512&id=38977&format=png"
              alt="average-2"
            />
            |
          </div>
          <div className="solo-parking-detail-divfortext-comment">
            {comments}
          </div>
        </div>
      ) : (
        ""
      )}
      <div id="solo-parking-img-container">
        <Carousel>
          {Photos?.map((element, index) => {
            return (
              <img className="parking-img" key={index} src={element}></img>
            );
          })}
          <img
            className="parking-img"
            src="http://res.cloudinary.com/deiofeueo/image/upload/v1691048663/mroogw5gclyjxswyaixm.jpg"
            alt="parking--v4"
          />
        </Carousel>
      </div>
    </>
  );
}
export default Soloinner;
