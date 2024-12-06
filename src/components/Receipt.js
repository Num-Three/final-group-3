import React from "react";
import { useLocation } from "react-router-dom";

const Receipt = () => {
  // Accessing the state passed via navigate in Payment component
  const location = useLocation();
  const { paymentMethod, paymentDetails, price } = location.state || {};

  if (!paymentDetails) {
    return <div>No payment details available.</div>;
  }

  return (
    <div>
      <h2>Payment Receipt</h2>
      <p>Payment Method: {paymentMethod.charAt(0).toUpperCase() + paymentMethod.slice(1)}</p>

      {/* For Visa and Mastercard */}
      {(paymentMethod === "visa" || paymentMethod === "mastercard") && (
        <>
          <p>First Name: {paymentDetails.firstName}</p>
          <p>Last Name: {paymentDetails.lastName}</p>
          <p>Card Number: **** **** **** {paymentDetails.cardNumber.slice(-4)}</p>
          <p>Expiration Date: {paymentDetails.expiration}</p>
          <p>CVV: ****</p>
        </>
      )}

      {/* For Gcash */}
      {paymentMethod === "gcash" && (
        <>
          <p>Phone Number: {paymentDetails.phoneNumber}</p>
          <p>Email: {paymentDetails.email}</p>
        </>
      )}

      {/* Displaying Phone Number and Payment Amount */}
      <p>Phone Number: {paymentDetails.phoneNumber}</p>
      <p>Total Payment: ${price}</p>
      
      <h3>Payment Successful</h3>
    </div>
  );
};

export default Receipt;
