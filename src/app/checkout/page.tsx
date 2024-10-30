'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function CheckoutPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleRegularCheckout = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/create-checkout-session', {
                method: 'POST',
            });
            const { sessionId } = await response.json();

            const stripe = await stripePromise;
            await stripe?.redirectToCheckout({ sessionId });
        } catch (err) {
            setError('Failed to initiate checkout');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleFreeTrial = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/create-trial-subscription', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: 'user@example.com', // You'll need to get this from your auth context
                }),
            });

            const { clientSecret, subscriptionId } = await response.json();

            if (clientSecret) {
                const stripe = await stripePromise;
                const { error } = await stripe!.confirmCardPayment(clientSecret);

                if (error) {
                    throw new Error(error.message);
                }

                // Redirect to success page
                router.push('/dashboard?trial=true');
            }
        } catch (err) {
            setError('Failed to start free trial');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Choose Your Plan</h1>
            
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">Free Trial</h2>
                    <p className="mb-4">Start with 30 days free, then $45/month</p>
                    <button
                        onClick={handleFreeTrial}
                        disabled={loading}
                        className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                    >
                        {loading ? 'Processing...' : 'Start Free Trial'}
                    </button>
                </div>

                <div className="border rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">Premium Plan</h2>
                    <p className="mb-4">$45/month</p>
                    <button
                        onClick={handleRegularCheckout}
                        disabled={loading}
                        className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                    >
                        {loading ? 'Processing...' : 'Subscribe Now'}
                    </button>
                </div>
            </div>
        </div>
    );
} 