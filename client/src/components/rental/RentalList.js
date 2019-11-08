import React, { Component } from "react";
import RentalCard from "components/rental/RentalCard";
import { connect } from "react-redux";
import { fetchRentals } from "redux/actions/rental-actions";

class RentalList extends Component {
  componentDidMount() {
    this.props.fetchRentals();
  }
  renderRentals() {
    const { rentals } = this.props;
    return rentals.map(rental => <RentalCard rental={rental} />);
  }

  addRental = () => {};

  render() {
    return (
      <section id="rentalListing">
        <h1 className="page-title">Your Home All Around the World</h1>
        <div className="row">{this.renderRentals()}</div>
      </section>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    rentals: state.rentals.data
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchRentals: () => dispatch(fetchRentals())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RentalList);
