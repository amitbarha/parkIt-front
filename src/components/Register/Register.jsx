import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Register/Register.css";
import { Link } from "react-router-dom";
import { HOST } from "../../Utils/host";

import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const Register = () => {
  const navigate = useNavigate();
  const [errorMessage1, setErrorMessage1] = useState("");
  const [check, setCheck] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (check == false) {
      return alert("you have to confirm the terms of use");
    }
    const { target } = e;
    const username = target[0].value;
    const firstName = target[1].value;
    const lastName = target[2].value;
    const phoneNumber = target[3].value;
    const email = target[4].value;
    const password = target[5].value;
    const licensePlates = target[6].value;
    const activeLicense = target[6].value;

    try {
      const newuser = await axios.post(`${HOST}/user/publishUser`, {
        username,
        firstName,
        lastName,
        phoneNumber,
        email,
        password,
        licensePlates,
        activeLicense,
      });
      console.log(newuser);
      localStorage.setItem("loggedUser", newuser.data);
      navigate("/homepage");
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
    <div className="reg-background">
      <div className="reg-container">
        <form className="reg-screen" onSubmit={(e) => handleSubmitForm(e)}>
          <div className="reg-screen__content">
            <h1>Register</h1>
            <div className="reg__field">
              <input
                type="text"
                className="reg__input"
                placeholder="Username:"
              />
            </div>
            <div className="reg__field">
              <input
                type="text"
                className="reg__input"
                placeholder="First Name:"
              />
            </div>
            <div className="reg__field">
              <input
                type="text"
                className="reg__input"
                placeholder="Last Name:"
              />
            </div>
            <div className="reg__field">
              <input
                type="text"
                className="reg__input"
                placeholder="Phone Number:"
              />
            </div>
            <div className="reg__field">
              <input type="email" className="reg__input" placeholder="Email:" />
            </div>
            <div className="reg__field">
              <input
                type="password"
                className="reg__input"
                placeholder="Password:"
              />
            </div>
            <div className="reg__field">
              <input
                type="text"
                className="reg__input"
                placeholder="License Plates:"
              />
            </div>
            {errorMessage1 && <p className="error-message">{errorMessage1}</p>}
            <br />
            <br />
            <div className="terms-container">
              <div className="terms-content">
                By selecing you agree to <u onClick={handleClickOpen}>terms</u>{" "}
                of use
              </div>
              <input onClick={() => setCheck(!check)} type="checkbox" />
            </div>

            <button type="submit" className="button reg__submit">
              <span className="reg-button__text">Register Now</span>
              <img
                className="reg-button__icon"
                width="30"
                height="30"
                src="https://img.icons8.com/ios-glyphs/30/7875b5/chevron-right.png"
                alt="chevron-right"
              />
            </button>

            <Link className="link-to-login" to={"/"}>
              Back to Log In
            </Link>
          </div>
          <div className="screen__background">
            <span className="reg-screen__background__shape reg-screen__background__shape4"></span>
            <span className="reg-screen__background__shape reg-screen__background__shape3"></span>
            <span className="reg-screen__background__shape reg-screen__background__shape2"></span>
            <span className="reg-screen__background__shape reg-screen__background__shape1"></span>
          </div>
        </form>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Terms of use:</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <p>
              Welcome to our parking platform! By accessing and using our
              services, you agree to comply with the following terms and
              conditions:
            </p>
          </DialogContentText>
          <br />
          <div>
            <h3>1. Service Usage:</h3>
            <p>
              Our platform connects individuals seeking parking spaces
              ("Drivers") with individuals offering parking spaces for rent
              ("Hosts"). The platform facilitates the rental transaction, but we
              do not own, control, or endorse the spaces listed. We are not
              responsible for the condition, safety, legality, or suitability of
              the parking spaces.
            </p>
          </div>
          <br />
          <div>
            <h3>2. Booking and Payment:</h3>
            <p>
              Drivers can book parking spaces through our platform. The price
              for each parking space is set by the Host. Drivers agree to pay
              the specified rental fee for the duration of their stay. Payment
              is collected through the platform, and we may retain a service fee
              for facilitating the transaction.
            </p>
          </div>
          <br />
          <div>
            <h3>3. Cancellations:</h3>
            <p>
              Both Drivers and Hosts can cancel bookings, but cancellation
              policies may apply. Review the cancellation policy before making a
              booking. Refunds, if applicable, are subject to the terms of the
              cancellation policy.
            </p>
          </div>
          <br />
          <div>
            <h3>4. Responsibility:</h3>
            <p>
              Hosts are responsible for providing accurate information about
              their parking spaces, including availability, location, and
              amenities. Drivers are responsible for ensuring that the space
              meets their requirements and adhering to local laws and
              regulations while using the space.
            </p>
          </div>
          <br />
          <div>
            <h3>5. Liability:</h3>
            <p>
              We are not liable for any loss, damage, injury, or inconvenience
              arising from the use of our platform or the rented parking spaces.
              Hosts and Drivers use the platform at their own risk and are
              advised to take necessary precautions.
            </p>
          </div>
          <br />
          <div>
            <h3>6. Privacy:</h3>
            <p>
              We collect and store personal information as outlined in our
              Privacy Policy. By using the platform, you consent to the
              collection, use, and sharing of your information as described.
            </p>
          </div>
          <br />
          <div>
            <h3>7. User Conduct:</h3>
            <p>
              Users agree to use the platform responsibly and not engage in
              activities that violate laws, regulations, or the rights of
              others. Any misuse of the platform may result in suspension or
              termination of access.
            </p>
          </div>
          <br />
          <div>
            <h3>8. Changes:</h3>
            <p>
              We reserve the right to modify these terms and conditions at any
              time. Any changes will be effective upon posting on our platform.
              Continued use of the platform after changes indicates acceptance
              of the revised terms.
            </p>
          </div>
          <br />
          <div>
            <h3>9. Feedback:</h3>
            <p>
              We value your feedback and suggestions. Feel free to provide
              feedback on the platform's features, usability, and overall
              experience.
            </p>
          </div>
          <br />
          <div>
            <h3>10. Contact:</h3>
            <p>
              If you have questions or concerns about these terms or any aspect
              of our platform, please contact our support team.
            </p>
          </div>
          <br />
          <div>
            <p>
              By using our parking platform, you acknowledge and agree to these
              terms. Thank you for using our service and helping to create a
              positive parking experience for everyone!
            </p>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Register;
