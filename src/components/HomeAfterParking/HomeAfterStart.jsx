import "./home-after-start.css";
function HomeAfterStart() {
  return (
    <div id="home-after-page">
      <div id="home-after-top">
        <div>Hello User!</div>
        <div>LOGO</div>
      </div>
      <div id="home-after-timer">Timer</div>
      <div id="home-after-end">End parking</div>
      <div id="home-after-contact"><a href=""><img id="home-after-contact-image" src="src\Pictures&Media\icons8-whatsapp-48.png" alt="contact park owner"/></a></div>
      {/* attention: need to add whatsUp deepLink
      https://wa.me/?text=I'm%20inquiring%20about%20the%20apartment%20listing */}

    </div>
  );
}

export default HomeAfterStart
