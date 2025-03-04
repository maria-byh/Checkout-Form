/* import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (!stripe || !elements) return;

        // Request a payment intent from our backend
        const res = await fetch("/api/checkout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount: 5000 }) // Example: $50.00
        });

        const { clientSecret, error } = await res.json();
        if (error) {
            setError(error);
            setLoading(false);
            return;
        }

        // Confirm payment with Stripe
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: { card: elements.getElement(CardElement)! }
        });

        if (confirmError) {
            setError(confirmError.message || "An unknown error occurred");
        } else if (paymentIntent.status === "succeeded") {
            setSuccess(true);
        }

        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="p-3 border rounded" style={{width: '400px'}}>
            <CardElement options={{ hidePostalCode: false }} className="form-control mb-3" />
            <button type="submit" className="btn btn-success w-100" disabled={!stripe || loading}>
                {loading ? "Processing..." : "Pay"}
            </button>
            {error && <div className="alert alert-danger mt-3">{error}</div>}
            {success && <div className="alert alert-success mt-3">Payment Successful!</div>}
        </form>
    );
};

export default function Checkout() {
    return (
        <Elements stripe={stripePromise}>
            <div className="container d-flex flex-column align-items-center justify-content-center vh-100">
                <h2 className="mb-4">Complete Your Payment</h2>
                <CheckoutForm />
            </div>
        </Elements>
    );
}
 */

import { Navbar, OrderDetails, OrderForm } from '@/components'
import React from 'react'

type Props = {}

export default function checkout({}: Props) {
  return (
    <div>
        <Navbar/>
        <div>
            <OrderForm/>
            <OrderDetails/>
        </div>
    </div>
  )
}