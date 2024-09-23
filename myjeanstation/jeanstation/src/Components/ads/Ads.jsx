import React, { useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './Ads.css';
import jeansimg from './jeans.jpg'; 
import jeans2 from './jeans2.jpg';
import jeans3 from './jeans3.jpg';

const images = [jeansimg, jeans2, jeans3];

const Ads = () => {
  const [index, setIndex] = useState(0);

  const nextImage = () => {
    setIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="carousel-container">
      <TransitionGroup>
        <CSSTransition
          key={images[index]}
          timeout={5}
          classNames="fade"
        >
          <img
            className="d-block w-100"
            src={images[index]}
            alt={`Slide ${index + 1}`}
          />
        </CSSTransition>
      </TransitionGroup>
      <button className="carousel-control-prev" onClick={prevImage}>
        <i className="fas fa-chevron-left" aria-hidden="true"></i>
        <span className="sr-only">&lt;</span>
      </button>
      <button className="carousel-control-next" onClick={nextImage}>
        <i className="fas fa-chevron-right" aria-hidden="true"></i>
        <span className="sr-only">&gt;</span>
      </button>
    </div>
  );
};

export default Ads;
