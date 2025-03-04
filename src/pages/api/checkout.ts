import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        try {
            const { amount } = req.body; // Get amount from frontend (in cents)

            // Create a PaymentIntent with Stripe
            const paymentIntent = await stripe.paymentIntents.create({
                amount: amount, // Example: 5000 cents = $50.00
                currency: "usd",
                payment_method_types: ["card"],
            });

            res.status(200).json({ clientSecret: paymentIntent.client_secret });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Unknown error";
            res.status(500).json({ error: errorMessage });
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
