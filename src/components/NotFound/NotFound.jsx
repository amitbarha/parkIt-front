import { Link } from "react-router-dom";
import "./not-found.css";
function NotFound() {
  return (
      <div id="not-found-header-container">
        <h1 id="not-found-header">Where the fuck do you think you are going !?</h1>
        <div id="imgerror"><img id="imgerrorimg" src="http://res.cloudinary.com/deiofeueo/image/upload/v1691563225/hmujencupwpolfdbgk5k.jpg"></img></div>
        <Link id="not-found-back-home-button" to={"HomePage"}>Back to Home</Link>
      </div>
  );
}
export default NotFound;
