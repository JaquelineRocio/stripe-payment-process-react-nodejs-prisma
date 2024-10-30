import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

function CardSection() {
  return (
    <div className="card-section">
      <label htmlFor="card-number" className="card-label">
        Card Number
      </label>
      <CardNumberElement id="card-number" options={CARD_ELEMENT_OPTIONS} />

      <label htmlFor="card-expiry" className="card-label">
        Expiration Date
      </label>
      <CardExpiryElement id="card-expiry" options={CARD_ELEMENT_OPTIONS} />

      <label htmlFor="card-cvc" className="card-label">
        CVC
      </label>
      <CardCvcElement id="card-cvc" options={CARD_ELEMENT_OPTIONS} />
    </div>
  );
}

export default CardSection;
