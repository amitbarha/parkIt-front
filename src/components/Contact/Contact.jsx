import "./contact.css";
import { TextField } from "@mui/material";
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
            <h3>Tell us who you are </h3>
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
            <h3>Give us a way to call back</h3>
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
            <h3>What do you want to tell us</h3>
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
    </div>
  );
}
export default Contact;
