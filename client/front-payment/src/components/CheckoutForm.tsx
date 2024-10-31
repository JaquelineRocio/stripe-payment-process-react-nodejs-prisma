import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import CardSection from "./CardSection";
import { FormEvent } from "react";

export default function CheckoutForm() {
  const elements = useElements();
  const stripe = useStripe();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      console.error("Stripe or Elements is not loaded yet.");
      return;
    }

    const cardNumber = elements.getElement(CardNumberElement);
    const cardExpiry = elements.getElement(CardExpiryElement);
    const cardCvc = elements.getElement(CardCvcElement);

    if (!cardNumber || !cardExpiry || !cardCvc) {
      console.error("One or more elements are missing.");
      return;
    }

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardNumber,
      });

      if (error) {
        console.error(error);
      } else {
        console.log("PaymentMethod created successfully:", paymentMethod);
      }
      const payload = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: 1000, // $10.00 this is in cents
          paymentMethod,
        }),
      };

      const response = await fetch(
        "http://localhost:3000/api/payments/create-payment-intent",
        payload
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardSection />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        disabled={!stripe || !elements}
      >
        Pagar
      </button>
    </form>
  );
}
