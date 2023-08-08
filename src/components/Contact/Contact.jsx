import "./contact.css";
import { TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Contact() {
    const navigate=useNavigate()
    const [contactName , setContactName]=useState("")
    const [contactEmail , setContactEmail]=useState("")
    const [contactComplaint , setContactComplaint]=useState("")

    const complaint={
        userName:contactName,
        userEmail:contactEmail,
        userComplaint:contactComplaint
    }

    function contactedUs(){
        if(contactName!="" && contactEmail!="" && contactComplaint!=""){
            console.log(complaint);
            alert("Complaint submited successfully,we will contact you as soon as possible!")
            navigate("/homepage")
        } else {
            alert("Please enter all fields")
        }
    }
  return (
    <div id="contact-page">
      <div id="contact-header-container">
        <h1 id="contact-header">Contact</h1>
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
              onChange={(event)=>setContactName(event.target.value)}
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
              onChange={(event)=>setContactEmail(event.target.value)}
            />
          </div>
          <div id="contact-complaint-input">
            <h3>Tell us what's wrong</h3>
            <TextField
              label="Enter your complaint"
              className={"contact-input-field"}
              variant="outlined"
              required
              type="text"
              multiline="true"
              rows={5}
              onChange={(event)=>setContactComplaint(event.target.value)}
            />
          </div>
        </div>
        <div id="contact-button-container">
          <button type="submit" onClick={()=>contactedUs()} id="contact-submit-complaint">Submit</button>
        </div>
      </div>
    </div>
  );
}
export default Contact;
