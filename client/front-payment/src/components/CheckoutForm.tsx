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
        console.error("Error creating payment method:", error.message);
        return;
      }

      console.log("Payment Method Created:", paymentMethod);
      const payload = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: 1000, // $10.00 this is in cents
          paymentMethod,
        }),
      };

      const response = await fetch(
        "http://localhost:8080/api/checkouts",
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
        className="bg-green-950 text-white disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200"
        disabled={!stripe || !elements} // Desactiva el botón si Stripe no está listo
      >
        Confirm order
      </button>
    </form>
  );
}
