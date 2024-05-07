import React from "react";
import PropTypes from "prop-types";

import "./card.css";
function Card({  title, url, id }) {
  const handleClick = () => {
    window.location.href = url;
  };

  return (
    <div>
      <div
        className="card text-center bg-dark animate__animated animate__fadeInUp"
        style={{
          backgroundColor: "#FFFFFF",
          border: "2px solid #FFFFFF",
          borderRadius: "30px",
        }}
        onClick={handleClick} // Added onClick handler
      >
        <div className="overflow2">
          {/* <img src={imageSource} alt="a wallpaper" className="card-img-top" style={{ width: '350px', height: '150px' }} /> */}
          <div className="card-body text-light">
            <h4 className="card-title">{title}</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string,
  id: PropTypes.string,
 
};

export default Card;