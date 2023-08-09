import "./contact.css";
import { TextField } from "@mui/material";
import { green } from "@mui/material/colors";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import emailjs from '@emailjs/browser';


function Contact() {


  const form = useRef();

  const navigate=useNavigate()

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_mwr887e', 'template_a9mrwwn', form.current, 'WZFwcywx7NqBLytwt')
      .then((result) => {
         alert("The email has been sent")
          navigate("/homepage");
      }, (error) => {
          console.log(error.text);
      });
  };
   
  return (
    <div id="contact-page">
      <form ref={form} onSubmit={sendEmail}>
      <div id="contact-header-container">
        <h1 id="contact-header">Contact Us...</h1>
      </div>
      <div id="contact-container">
        <div id="contact-inputs">
          <div id="contact-name-input">
            <h3 className="contact-sub-titile">Tell us who you are </h3>
            <TextField
              label="Enter your name"
              className="contact-input-field"
              variant="outlined"
              required
              type="text"
              name="from_name"
            />
          </div>
          <div id="contact-Email-input">
            <h3 className="contact-sub-titile">Give us a way to call back</h3>
            <TextField
              label="Enter your Email"  
              className="contact-input-field"
              variant="outlined"
              required
              type="text"
              name="reply_to"
            />
          </div>
          <div id="contact-complaint-input">
            <h3 className="contact-sub-titile">What do you want to tell us</h3>
            <TextField
              label="Enter your text"
              className={"contact-input-field"}
              variant="outlined"
              required
              type="text"
              multiline="true"
              rows={5}
              name="message"
            />
          </div>
        </div>
        <div id="contact-button-container">
          <button type="submit" id="contact-submit-complaint">Submit</button>
        </div>
      </div>
      </form>
      <br />
      <div className="parkit-info">
        <div className="parkit-info-line">
          <div className="icon-parkit-line">
          <img
                className="icon-parkit-line"
                src="https://img.icons8.com/external-tanah-basah-glyph-tanah-basah/48/external-email-social-media-ui-tanah-basah-glyph-tanah-basah.png"
                alt="external-email-social-media-ui-tanah-basah-glyph-tanah-basah"
              />
          </div>
          <div className="text-parkit-info">
            <a className="email-link-info" href="mailto:parkit.web@gmail.com" target="_blank" rel="noopener noreferrer">parkit.web@gmail.com</a>
          </div>
        </div>
        <br />
        <div className="parkit-info-line">
          <div className="icon-parkit-line">
          <img
                className="icon-parkit-line"
                src="https://img.icons8.com/external-others-inmotus-design/67/external-Phone-game-play-others-inmotus-design-2.png"
                alt="external-Phone-game-play-others-inmotus-design-2"
              />
          </div>
          <div className="text-parkit-info">
            <a className="email-link-info" href="tel:+972543043477" target="_blank" rel="noopener noreferrer">054-3043477</a>
          </div>
        </div>
        </div>
        <br />
        <div>
          <img className="image-contact" src="http://res.cloudinary.com/deiofeueo/image/upload/v1691048663/mroogw5gclyjxswyaixm.jpg" alt="" />
        </div>
      </div>
  );
}
export default Contact;
