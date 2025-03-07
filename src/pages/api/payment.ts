import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config(); 

if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("Stripe secret key is not defined in environment variables");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2025-02-24.acacia" });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { amount, paymentMethodId } = req.body;

        if (!amount || typeof amount !== "number" || amount <= 0) {
            return res.status(400).json({ error: "Invalid amount" });
        }

        if (!paymentMethodId) {
            return res.status(400).json({ error: "Missing paymentMethodId" });
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100), // Convert to cents
            currency: "eur",
            payment_method: paymentMethodId,
            confirm: true, 
            automatic_payment_methods: {
                enabled: true,
                allow_redirects: "never",
            },
        });

        return res.status(200).json({
            success: true,
            postedData: {
                amount,
                paymentMethodId,
            },
            paymentIntent,
        });
    } catch (error: any) {
        console.error("Stripe error:", error);
        return res.status(500).json({ error: error.message || "Payment processing failed" });
    }
}
