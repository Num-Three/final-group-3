import React, { useState, useEffect } from "react";

const Receipt = ({ paymentMethod, paymentDetails }) => {
  const [paymentData, setPaymentData] = useState(null);

  // Fetch payment details from the local server
  useEffect(() => {
    const fetchPaymentData = async () => {
      try {
        const response = await fetch("http://localhost:5000/db.json");
        if (response.ok) {
          const data = await response.json();
          setPaymentData(data); // Store the fetched payment data in state
        } else {
          console.error("Failed to fetch payment data");
        }
      } catch (error) {
        console.error("Error fetching payment data:", error);
      }
    };

    fetchPaymentData();
  }, []);

  if (!paymentMethod || !paymentDetails) {
    return <p>Payment information is missing or undefined.</p>;
  }

  return (
    <div>
      <h2>Payment Receipt</h2>
      <p>Payment Method: {paymentMethod.charAt(0).toUpperCase() + paymentMethod.slice(1)}</p>

      {/* Display details based on the payment method */}
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

      {/* Additional payment details can be fetched and displayed here if needed */}
      {paymentData && (
        <div>
          <h3>Additional Payment Info:</h3>
          <p>Transaction ID: {paymentData.transactionId}</p>
          <p>Amount: {paymentData.amount}</p>
        </div>
      )}

      <h3>Payment Successful</h3>
    </div>
  );
};

export default Receipt;
