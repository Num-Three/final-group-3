import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Payment = ({ price }) => {
  const navigate = useNavigate(); // React Router's navigation function
  const [paymentMethod, setPaymentMethod] = useState("visa");
  const [paymentDetails, setPaymentDetails] = useState({
    firstName: "",
    lastName: "",
    cardNumber: "",
    expiration: "",
    cvv: "",
    phoneNumber: "",
    email: "",
    amount: price || 0,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    // First Name & Last Name sanitization
    if (name === "firstName" || name === "lastName") {
      setPaymentDetails((prev) => ({
        ...prev,
        [name]: value.replace(/[^a-zA-Z\s]/g, ""),
      }));
      return;
    }

    // Numeric validation
    if (name === "cardNumber" || name === "cvv" || name === "phoneNumber") {
      if (!/^\d*$/.test(value)) return;
    }

    // Expiration Date special case
    if (name === "expiration") {
      if (!/^\d{0,2}\/?\d{0,2}$/.test(value)) return;
      if (value.length === 2 && !value.includes("/")) {
        setPaymentDetails((prev) => ({
          ...prev,
          [name]: `${value}/`,
        }));
        return;
      }
    }

    setPaymentDetails((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!paymentDetails.phoneNumber || !/^\d{11}$/.test(paymentDetails.phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be 11 digits.";
    }
    if (paymentMethod === "gcash" && (!paymentDetails.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(paymentDetails.email))) {
      newErrors.email = "Valid email is required.";
    }
    if (paymentMethod !== "gcash") {
      if (!paymentDetails.firstName) newErrors.firstName = "First name is required.";
      if (!paymentDetails.lastName) newErrors.lastName = "Last name is required.";
      if (!paymentDetails.cardNumber || paymentDetails.cardNumber.length !== 16) {
        newErrors.cardNumber = "Card number must be 16 digits.";
      }
      if (!paymentDetails.expiration || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(paymentDetails.expiration)) {
        newErrors.expiration = "Expiration date must be in MM/YY format.";
      }
      if (!paymentDetails.cvv || paymentDetails.cvv.length !== 3) {
        newErrors.cvv = "CVV must be exactly 3 digits.";
      }
    }

    if (price===0){
      newErrors.email = "Please Select Seats";
      newErrors.cvv = "Please Select Seats";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      navigate("/receipt", { state: { paymentMethod, paymentDetails, price } });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form Fields */}
      <div>
        <label>Payment Method</label>
        <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
          <option value="visa">Visa</option>
          <option value="mastercard">Mastercard</option>
          <option value="gcash">Gcash</option>
        </select>
      </div>
      <div>
        <label>Phone Number</label>
        <input
          type="text"
          name="phoneNumber"
          value={paymentDetails.phoneNumber}
          onChange={handleChange}
          maxLength={11}
        />
        {errors.phoneNumber && <p>{errors.phoneNumber}</p>}
      </div>

      {paymentMethod === "gcash" && (
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={paymentDetails.email}
            onChange={handleChange}
          />
          {errors.email && <p>{errors.email}</p>}
        </div>
      )}

      {(paymentMethod === "visa" || paymentMethod === "mastercard") && (
        <>
          <div>
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={paymentDetails.firstName}
              onChange={handleChange}
            />
            {errors.firstName && <p>{errors.firstName}</p>}
          </div>
          <div>
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={paymentDetails.lastName}
              onChange={handleChange}
            />
            {errors.lastName && <p>{errors.lastName}</p>}
          </div>
          <div>
            <label>Card Number</label>
            <input
              type="text"
              name="cardNumber"
              value={paymentDetails.cardNumber}
              onChange={handleChange}
              maxLength={16}
            />
            {errors.cardNumber && <p>{errors.cardNumber}</p>}
          </div>
          <div>
            <label>Expiration Date</label>
            <input
              type="text"
              name="expiration"
              placeholder="MM/YY"
              value={paymentDetails.expiration}
              onChange={handleChange}
              maxLength={5}
            />
            {errors.expiration && <p>{errors.expiration}</p>}
          </div>
          <div>
            <label>CVV</label>
            <input
              type="password"
              name="cvv"
              value={paymentDetails.cvv}
              onChange={handleChange}
              maxLength={4}
            />
            {errors.cvv && <p>{errors.cvv}</p>}
          </div>
        </>
      )}

      <button type="submit">Submit Payment</button>
    </form>
  );
};

export default Payment;
