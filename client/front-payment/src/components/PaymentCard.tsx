import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import CheckoutForm from "./CheckoutForm";
const stripePromise = loadStripe(
  "pk_test_51QFQl5E88FknqVncTIDRhNdPF1n437uKtMu7hnQKYedcJ3nXiDVbBKVhb0scHOAzeNyeqBFOGp9sgIKQ1ep9EUm400jK9oxIQZ"
);

export default function PaymentCard() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}
