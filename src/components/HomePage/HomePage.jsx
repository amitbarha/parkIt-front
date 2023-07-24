import "./home-page.css";
import {Link} from "react-router-dom"
function HomePage() {
  return (
    <div id="home-page">
      <div id="home-page-top">
        <div>Hello User!</div>
        <div>LOGO</div>
      </div>
      <div id="home-page-my-parking">My parking</div>
      <div id="home-page-add-parking">Add parking</div>
      <div id="home-page-find-parking">Find parking now</div>
      <Link id="home-page-profile" to={"/profile"}>Profile</Link>
    </div>
  );
}

export default HomePage;
