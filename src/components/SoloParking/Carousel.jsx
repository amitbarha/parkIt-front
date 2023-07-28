import "./Carousel.css";
import { useState, useEffect } from "react";

function Carousel({ children }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [length, setLength] = useState(children?.length);
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
    setLength(children?.length);
  }, [children]);
  return (
    <div className="carousel-container" dir="ltr">
      <div className="carousel-wrapper">
        {currentIndex > 0 && (
          <button onClick={prev} className="left-arrow arrow-button">
            <img
              width="24"
              height="24"
              src="https://img.icons8.com/ios-glyphs/30/EBEBEB/double-left--v1.png"
              alt="double-left--v1"
            />
          </button>
        )}
        <div
          className="carousel-content-wrapper"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
        >
          <div
            className="carousel-content"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {children}
          </div>
        </div>
        {currentIndex < length - 1 && (
          <button onClick={next} className="right-arrow arrow-button">
            <img
              width="24"
              height="24"
              src="https://img.icons8.com/material-rounded/24/EBEBEB/double-right.png"
              alt="double-right"
            />
          </button>
        )}
      </div>
    </div>
  );
}

export default Carousel;