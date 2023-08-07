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
  selectedDays,
  shortTerm,
  startDate,
  endDate
}) {
  const [available, setAvailable] = useState(Available);
  const temparr = [true, true, false, false, true, true, false];

  function changeStatus(id) {
    if (whoParking == undefined || whoParking == null || whoParking == "") {
      if (
        window.confirm("Are you sure you want to unavailable your parking?")
      ) {
        setAvailable(!available);
        axios
          .patch(`${HOST}/parking/changeStatus`, { _id: id })
          .then((data) => {
            console.log("function work");
            window.location.reload();
          })
          .catch((err) => console.log(err.response.data));
      }
    } else {
      alert("Someone is parking now. Try again later.");
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
          {Available ? "Available" : "Unavailable"}
          <div class="checkbox-apple">
            <input
              class="yep"
              id="check-apple"
              type="checkbox"
              checked={Available}
              onChange={() => changeStatus(parkingID)}
            />
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
      <div className="solo-parking-detail" id="bigdiv-oftable">
        <div className="solo-parking-detail-divforicon">
          <img
            className="icon-con"
            src="https://img.icons8.com/external-yogi-aprelliyanto-basic-outline-yogi-aprelliyanto/64/external-calender-time-and-date-yogi-aprelliyanto-basic-outline-yogi-aprelliyanto.png"
            alt="calendar-time"
          />
          |
        </div>
        <div className="solo-parking-detail-divfortext ">
          {!shortTerm?
          <table className="table-of-days">
            <tr>
              <th>Sun</th>
              <th>Mon</th>
              <th>Tue</th>
              <th>Wed</th>
              <th>Thu</th>
              <th>Fri</th>
              <th>Sat</th>
            </tr>
            <tr>
              {selectedDays?.map((day, index) => {
                return (
                  <td key={index}>
                    {day ? (
                      <img
                        className="icon-con"
                        src="https://img.icons8.com/color/48/000000/ok--v1.png"
                        alt="ok"
                      />
                    ) : (
                      <img
                        className="icon-con"
                        src="https://img.icons8.com/external-tanah-basah-glyph-tanah-basah/48/000000/external-delete-customer-reviews-tanah-basah-glyph-tanah-basah.png"
                        alt="not-ok"
                      />
                    )}
                  </td>
                );
              })}
            </tr>
          </table>
          :
          <div>{startDate} <b>-</b> {endDate}</div>
          }
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
              alt="comments"
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
            return <img className="parking-img" key={index} src={element} />;
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
