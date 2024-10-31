import { Request, Response } from 'express';
import Stripe from 'stripe';
import { prisma } from '../utils/prisma';
import 'dotenv/config';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2020-08-27' as any,
});

export const createPaymentIntent = async (req: Request, res: Response): Promise<void> => {
  const { amount, paymentMethod } = req.body;

  try {
    const { id, card } = paymentMethod;

    const payment = await stripe.paymentIntents.create({
      amount,
      payment_method: id,
      currency: 'usd',
      description: 'Compra de prueba en el top-v29',
    });

    const confirmPayment = await stripe.paymentIntents.confirm(payment.id);

    if (confirmPayment.status !== 'succeeded') {
     res.status(400).json({ message: 'No se pudo realizar el pago' });
     return
    }

    res.status(200).json({ message: 'Pago realizado con éxito' });
    return
  } catch (error: unknown) {
    if (error instanceof Error) {

      res.status(500).json({ message: error.message });
    } else {

      res.status(500).json({ message: "An unexpected error occurred" });
    }
  }
};
