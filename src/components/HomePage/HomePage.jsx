import "./home-page.css";
import { Link } from "react-router-dom";
{
  /* <a  href="https://icons8.com/icon/OxNBUwEP7Vwa/parking">Parking</a> icon by <a href="https://icons8.com">Icons8</a> */
}
function HomePage() {
  const parkingSpots = [
    {
      imgUrl: "https://img.icons8.com/fluency-systems-regular/48/parking.png",
      name: "first parking",
      status: "available",
    },
    {
      imgUrl: "https://img.icons8.com/fluency-systems-regular/48/parking.png",
      name: "first parking",
      status: "available",
    }

  ];
  return (
    <div className="home-page">
      <div className="find-circle">
        <div className="circle">
          <h1>Find Parking Now!</h1>
        </div>
      </div>
      <div className="my-parking-section">
        <h2>My Parking:</h2>
        <div
          className={`${parkingSpots.length < 2 ? "boxes-my-parking-section-centered": "boxes-my-parking-section"}`}>
          {parkingSpots.map((parking, index) => {
            return (
              <div className="my-parking-box" key={index}>
                <div className="my-parking">
                  <div>
                    <img width="48" height="48" src={parking.imgUrl} alt="parking"/>
                  </div>
                  <div>
                    <p>parking name: {parking.name}</p>
                  </div>
                  <div>
                    <p>status:{parking.status}</p>
                  </div>
                </div>
              </div>
            );
          })}
          <div className="add-parking-box">
            <Link className="add-parking" to={"/addParking"}>
              Add New Parking{" "}
              <img
                width="72"
                height="72"
                src="https://img.icons8.com/external-line-adri-ansyah/64/external-plus-essentials-ui-line-adri-ansyah.png"
                alt="external-plus-essentials-ui-line-adri-ansyah"
              />
            </Link>
          </div>
        </div>
      </div>
      <div className="history">
        <h2>History:</h2>
        {/* <Link className="history-link" to={"/historyParking"}></Link> */}
        <div className="history-link">
          <div>
            <p>Date</p>
          </div>
          <div>
            <p>Location</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
