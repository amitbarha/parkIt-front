import React, { useState } from 'react';
import './Popup.css';
import { useNavigate } from 'react-router';

const Popup = () => {

  const navigate = useNavigate()

  const [isOpen, setIsOpen] = useState(false);

  const openPopup = () => {
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
    navigate("/register")
  };

  return (
    <div>
      <div className="clickable-div" onClick={openPopup}>
        Click Me!
      </div>
      {isOpen && (
        <div className="popup">
          <div className="popup-content">
            <span className="close-button" onClick={closePopup}>
              &times;
            </span>
            <p>This is the popup content.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Popup;
