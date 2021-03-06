import React from "react";
import { Link } from "react-router-dom";
import { rentalType } from "helpers";

const RentalCard = ({
  rental: { _id, city, category, image, description, dailyRate, shared }
}) => {
  return (
    <div key={_id} className="col-md-3 col-xs-6">
      <Link className="rental-detail-link" to={`/rentals/${_id}`}>
        <div className="card bwm-card">
          <img className="card-img-top" src={image} alt="rental"></img>
          <div className="card-block">
            <h6 className={`card-subtitle ${category}`}>
              {rentalType(shared)} {category} &#183; {city}
            </h6>
            <h4 className="card-title">{description}</h4>
            <p className="card-text">
              ${dailyRate} per Night &#183; Free Cancelation
            </p>
            <a href="/" className="card-link">
              More Info
            </a>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default RentalCard;
