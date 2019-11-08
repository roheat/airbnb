import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchRentalById } from "../../redux/actions/rental-actions";

class RentalDetail extends Component {
  componentDidMount() {
    const { match, fetchRentalById } = this.props;
    const rentalId = parseInt(match.params.id);
    fetchRentalById(rentalId);
  }

  render() {
    console.log(this.props.rental);
    return (
      <div>
        <h1>DETAIL</h1>
      </div>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RentalDetail);
