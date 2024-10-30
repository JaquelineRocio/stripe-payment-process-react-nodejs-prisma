import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import CheckoutForm from "./CheckoutForm";
const stripePromise = loadStripe(
  "'pk_test_TYooMQauvdEDq54NiTphI7jx'"
);

export default function PaymentCard() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}
