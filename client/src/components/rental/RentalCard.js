import React from "react";
import { Link } from "react-router-dom";

const RentalCard = ({
  rental: {
    id,
    title,
    city,
    street,
    category,
    image,
    bedrooms,
    description,
    dailyRate,
    shared,
    createdAt
  }
}) => {
  return (
    <div key={id} className="col-md-3 col-xs-6">
      <Link className="rental-detail-link" to={`/rentals/${id}`}>
        <div className="card bwm-card">
          <img className="card-img-top" src={image} alt="rental"></img>
          <div className="card-block">
            <h6 className={`card-subtitle ${category}`}>
              {shared ? "Shared" : "Whole"} {category} &#183; {city}
            </h6>
            <h4 className="card-title">{description}</h4>
            <p className="card-text">
              ${dailyRate} per Night &#183; Free Cancelation
            </p>
            <a href="" className="card-link">
              More Info
            </a>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default RentalCard;
