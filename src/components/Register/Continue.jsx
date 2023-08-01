// import React, { useEffect } from 'react'
// import "../Register/Continue.css"
// import { useNavigate } from "react-router-dom";
// import { useState} from 'react';
// import axios from "axios";

// function Continue() {
//     const [errorMessage2, setErrorMessage2] = useState("");
//     const navigate = useNavigate();
//         navigate("/homepage");
     
// //   const handleSubmitForm = async (e) => {
// //     e.preventDefault();
// //     const { target } = e;
// //     const CardNumber = target[0].value;
// //     const ValidThru = target[1].value;
// //     const CVV = target[2].value;

// //     try {
// //       const newuser = await axios.post(
// //         "http://localhost:5000/",
// //         {CardNumber,ValidThru,CVV}
// //       );
// //       localStorage.setItem("loggedUser", newuser.data);
// //       navigate("/homepage");
// //     } catch (err) {
// //       setErrorMessage2("Wrong Credentials");
// //     }
// //   };
    
//   return (
// <div className="con-background">
//           <div className="con-container">
// 	<form className="con-screen" onSubmit={(e) => handleSubmitForm(e)}>
// 		<div className="con-screen__content">
//       <h1>Payment Details</h1>
// 				<div className="con__field">
//                 <img className="con__icon" width="25" height="25" src="https://img.icons8.com/glyph-neue/64/7875b5/credit-card-front.png" alt="credit-card-front"/>
// 					<input type="text" className="con__input" placeholder="Card Number:"/>
// 				</div>
// 				<div className="con__field">
//                 <img className="con__icon" width="25" height="25" src="https://img.icons8.com/external-tal-revivo-regular-tal-revivo/24/7875b5/external-calendar-past-event-and-appointment-agenda-completed-date-regular-tal-revivo.png" alt="external-calendar-past-event-and-appointment-agenda-completed-date-regular-tal-revivo"/>
// 					<input type="text" className="con__input" placeholder="Valid Thru:"/>
// 				</div>
//                 <div className="con__field">
//         <img className="con__icon" width="25" height="25" src="https://img.icons8.com/android/24/7875b5/lock.png" alt="lock"/>
// 					<input type="password" className="con__input" placeholder="CVV:"/>
// 				</div>
//         {errorMessage2 && <p className="error-message">{errorMessage2}</p>}
// 				<button type="submit" className="button con__submit">
// 					<span className="con-button__text">Register Now</span>
// 					<img className="button__icon" width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/7875b5/chevron-right.png" alt="chevron-right"/>
// 				</button>
//         {/* <Link className="link-to-register" to={"/Register"}>Not sign up yet?</Link> */}
//         </div>
// 		<div className="screen__background">
// 			<span className="con-screen__background__shape con-screen__background__shape4"></span>
// 			<span className="con-screen__background__shape con-screen__background__shape3"></span>		
// 			<span className="con-screen__background__shape con-screen__background__shape2"></span>
// 			<span className="con-screen__background__shape con-screen__background__shape1"></span>
// 		</div>		
// 	</form>
// </div>
//     </div>
//   )
// }

// export default Continue