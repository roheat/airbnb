import React from "react";
import Modal from "react-responsive-modal";
import FormError from "common/FormError";
function BookingModal(props) {
  const {
    open,
    closeModal,
    booking: { startAt, endAt, guests, days, totalPrice },
    price,
    reserve,
    errors
  } = props;

  return (
    <Modal
      open={open}
      onClose={closeModal}
      center
      classNames={{ modal: "booking-modal" }}
    >
      <h4 className="modal-title title">Confirm Booking </h4>
      <p className="dates">
        {startAt}/ {endAt}
      </p>
      <div className="modal-body">
        <em>{days}</em> nights /<em>${price}</em> per Night
        <p>
          Guests: <em>{guests}</em>
        </p>
        <p>
          Price: <em>${totalPrice} </em>
        </p>
        <p>Do you confirm your booking for selected days?</p>
      </div>
      <FormError errors={errors} />
      <div className="modal-footer">
        <button onClick={reserve} type="button" className="btn btn-bwm">
          Confirm
        </button>
        <button type="button" onClick={closeModal} className="btn btn-bwm">
          Cancel
        </button>
      </div>
    </Modal>
  );
}

export default BookingModal;
