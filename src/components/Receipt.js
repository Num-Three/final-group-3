import React from "react";

const Receipt = ({ paymentMethod, paymentDetails }) => {
  return (
    <div>
      <h2>Payment Receipt</h2>
      <p>Payment Method: {paymentMethod.charAt(0).toUpperCase() + paymentMethod.slice(1)}</p>

      {(paymentMethod === "visa" || paymentMethod === "mastercard") && (
        <>
          <p>First Name: {paymentDetails.firstName}</p>
          <p>Last Name: {paymentDetails.lastName}</p>
          <p>Card Number: **** **** **** {paymentDetails.cardNumber.slice(-4)}</p>
          <p>Expiration Date: {paymentDetails.expiration}</p>
          <p>CVV: ****</p>
        </>
      )}

      {paymentMethod === "gcash" && (
        <>
          <p>Phone Number: {paymentDetails.phoneNumber}</p>
          <p>Email: {paymentDetails.email}</p>
        </>
      )}

      <p>Phone Number: {paymentDetails.phoneNumber}</p>
      <h3>Payment Successful</h3>
    </div>
  );
};

export default Receipt;
