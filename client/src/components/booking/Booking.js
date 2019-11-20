import React from "react";
import moment from "moment";
import DateRangePicker from "react-bootstrap-daterangepicker";
import { getRangeOfDates } from "helpers";
import BookingModal from "./BookingModal";
import { createBooking } from "redux/actions/booking-actions";
import { ToastContainer, toast } from "react-toastify";

class Booking extends React.Component {
  constructor() {
    super();
    this.bookedOutDates = [];
    this.dateRef = React.createRef();
    this.state = {
      open: false,
      booking: {
        startAt: "",
        endAt: "",
        guests: "",
        days: 0,
        totalPrice: 0
      },
      rentalPrice: 0,
      errors: []
    };
  }

  componentDidMount() {
    this.getBookedOutDates();
  }

  getBookedOutDates() {
    const { bookings } = this.props.rental;

    if (bookings && bookings.length > 0) {
      bookings.forEach(({ startAt, endAt }) => {
        const dateRange = getRangeOfDates(startAt, endAt, "Y/MM/DD");
        this.bookedOutDates.push(...dateRange);
      });
    }
  }

  checkInvalidDates = date => {
    return (
      date.diff(moment(), "days") < -1 ||
      this.bookedOutDates.includes(date.format("Y/MM/DD"))
    );
  };

  handleApply = (event, picker) => {
    const startAt = picker.startDate.format("Y/MM/DD");
    const endAt = picker.endDate.format("Y/MM/DD");
    this.dateRef.current.value = `${startAt} to ${endAt}`;
    this.setState({ booking: { startAt, endAt } });
  };

  close = () => {
    this.setState({ open: false });
  };

  confirmPropposedData = () => {
    const { startAt, endAt } = this.state.booking;
    const days = getRangeOfDates(startAt, endAt).length - 1;
    const { rental } = this.props;
    this.setState({
      open: true,
      booking: {
        ...this.state.booking,
        days,
        totalPrice: days * rental.dailyRate,
        rental
      }
    });
  };

  reset() {
    this.dateRef.current.value = "";
    this.setState({ booking: { guests: "" } });
  }
  reserve = () => {
    createBooking(this.state.booking).then(
      booking => {
        console.log(booking);
        this.addNewBookedOutDates(booking);
        this.close();
        this.reset();
        toast.success("Booking has been confirmed successfully!");
      },
      errors => this.setState({ errors })
    );
  };

  addNewBookedOutDates({ startAt, endAt }) {
    const dateRange = getRangeOfDates(startAt, endAt);
    this.bookedOutDates.push(...dateRange);
  }

  render() {
    const { rental } = this.props;
    const { booking, errors, open } = this.state;
    return (
      <div className="booking">
        <ToastContainer />
        <h3 className="booking-price">
          ${rental.dailyRate}{" "}
          <span className="booking-per-night">per night</span>
        </h3>
        <hr></hr>
        <div className="form-group">
          <label htmlFor="dates">Dates</label>
          <DateRangePicker
            isInvalidDate={this.checkInvalidDates}
            opens="left"
            containerStyles={{ display: "block" }}
            onApply={this.handleApply}
          >
            <input
              ref={this.dateRef}
              id="dates"
              type="text"
              className="form-control"
            />
          </DateRangePicker>
        </div>
        <div className="form-group">
          <label htmlFor="guests">Guests</label>
          <input
            type="number"
            className="form-control"
            id="guests"
            aria-describedby="emailHelp"
            placeholder=""
            onChange={e =>
              this.setState({
                booking: {
                  ...this.state.booking,
                  guests: parseInt(e.target.value)
                }
              })
            }
            value={booking.guests}
          />
        </div>
        <button
          onClick={this.confirmPropposedData}
          className="btn btn-bwm btn-confirm btn-block"
        >
          Reserve place now
        </button>
        <hr></hr>
        <p className="booking-note-title">
          People are interested into this house
        </p>
        <p className="booking-note-text">
          More than 500 people checked this rental in last month.
        </p>
        <BookingModal
          closeModal={this.close}
          open={open}
          booking={booking}
          reserve={this.reserve}
          errors={errors}
          price={rental.dailyRate}
        />
      </div>
    );
  }
}

export default Booking;
