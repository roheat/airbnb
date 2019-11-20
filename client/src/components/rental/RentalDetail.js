import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchRentalById } from "../../redux/actions/rental-actions";
import RentalDetailInfo from "./RentalDetailInfo";
import RentalMap from "./RentalMap";
import Booking from "components/booking/Booking";

class RentalDetail extends Component {
  componentDidMount() {
    const { match, fetchRentalById } = this.props;
    const rentalId = match.params.id;
    fetchRentalById(rentalId);
  }

  render() {
    const { rental } = this.props;
    if (!rental._id) return <h1>Loading..</h1>;

    return (
      <section id="rentalDetails">
        <div className="upper-section">
          <div className="row">
            <div className="col-md-6">
              <img src={rental.image} alt=""></img>
            </div>
            <div className="col-md-6">
              <RentalMap location={`${rental.city} ${rental.street}`} />
            </div>
          </div>
        </div>

        <div className="details-section">
          <div className="row">
            <div className="col-md-8">
              <RentalDetailInfo rental={rental} />
            </div>
            <div className="col-md-4">
              <Booking rental={rental} />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    rental: state.rentals.rental
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchRentalById: rentalId => dispatch(fetchRentalById(rentalId))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RentalDetail);
