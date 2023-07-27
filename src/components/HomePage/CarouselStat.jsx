import "./carousel-stat.css";
import { useState, useEffect } from "react";

function Carousel({ children }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [length, setLength] = useState(children.length);
  const [touchPosition, setTouchPosition] = useState(null);
  const next = () => {
    if (currentIndex < length - 1) {
      setCurrentIndex((prevState) => prevState + 1);
    }
  };

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1);
    }
  };
  const handleTouchStart = (e) => {
    const touchDown = e.touches[0].clientX;
    setTouchPosition(touchDown);
  };
  const handleTouchMove = (e) => {
    const touchDown = touchPosition;

    if (touchDown === null) {
      return;
    }

    const currentTouch = e.touches[0].clientX;
    const diff = touchDown - currentTouch;

    if (diff > 5) {
      next();
    }

    if (diff < -5) {
      prev();
    }

    setTouchPosition(null);
  };

  // Set the length to match current children from props
  useEffect(() => {
    setLength(children.length);
  }, [children]);
  return (
    <div className="carousel-stat-container" dir="ltr">
      <div className="carousel-stat-wrapper">
        {currentIndex > 0 && (
          <button onClick={prev} className="stat-left-arrow stat-arrow-button">
            <img width="24" height="24" src="https://img.icons8.com/material-outlined/24/000000/double-down.png" alt="double-down"/>
          </button>
        )}
        <div
          className="carousel-stat-content-wrapper"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
        >
          <div
            className="carousel-stat-content"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {children}
          </div>
        </div>
        {currentIndex < length - 1 && (
          <button onClick={next} className="stat-right-arrow stat-arrow-button">
            <img width="24" height="24" src="https://img.icons8.com/material-outlined/24/000000/double-down.png" alt="double-down"/>
          </button>
        )}
      </div>
    </div>
  );
}

export default Carousel;