import { Link } from "react-router-dom";
import "./not-found.css";
function NotFound() {
  return (
    <div id="not-found-page">
      <div id="not-found-header-container">
        <h1 id="not-found-header">Where the 'park' you think your going ?</h1>
      </div>
      <Link id="not-found-back-home-button" to={"HomePage"}>
        Back to Home
      </Link>
    </div>
  );
}
export default NotFound;
