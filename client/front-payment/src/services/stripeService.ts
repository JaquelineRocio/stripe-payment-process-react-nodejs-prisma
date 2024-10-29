import { loadStripe, Stripe, StripeCardElement } from '@stripe/stripe-js';


const STRIPE_PUBLIC_KEY = process.env.REACT_APP_STRIPE_PUBLIC_KEY|| '';
let stripePromise: Promise<Stripe | null>;


const initializeStripe = async (): Promise<Stripe | null> => {
    if (!stripePromise) {
        stripePromise = loadStripe(STRIPE_PUBLIC_KEY);
    }
    return stripePromise;
};


export const createPaymentToken = async (cardElement: StripeCardElement): Promise<string | null> => {
    const stripe = await initializeStripe();
    if (!stripe) {
        throw new Error('Stripe no está inicializado');
    }

    const { token, error } = await stripe.createToken(cardElement);

    if (error) {
        console.error('Error al crear el token:', error);
        return null;
    }

    return token?.id || null;
};
