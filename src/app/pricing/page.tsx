'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PricingSection } from '@/components/layout/sections/pricing';
import { getStripe } from '@/lib/stripe';
import { authClient } from '@/lib/auth-client';

export default function PricingPage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();
    const { data: session } = authClient.useSession();

    const updateSessionWithSubscription = async (email: string) => {
        try {
            const response = await fetch(`/api/subscription/status?email=${encodeURIComponent(email)}`);
            if (!response.ok) throw new Error('Failed to fetch subscription status');
            
            const subscriptionDetails = await response.json();
            
            // Update the session with subscription details using Better Auth
            await authClient.api.updateSession({
                subscription: subscriptionDetails,
            });
        } catch (error) {
            console.error('Error updating session:', error);
        }
    };

    const handlePremiumSubscribe = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/create-checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const { sessionId } = await response.json();
            
            // Get Stripe instance
            const stripe = await getStripe();
            if (!stripe) {
                throw new Error('Stripe failed to initialize');
            }

            // Redirect to checkout
            const { error } = await stripe.redirectToCheckout({ sessionId });
            
            if (error) {
                throw error;
            }
        } catch (err) {
            console.error('Error:', err);
            setError(err instanceof Error ? err.message : 'Failed to initiate checkout');
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
                    email: session?.user?.email,
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            if (data.status === 'trialing') {
                // Update session with new subscription details
                await updateSessionWithSubscription(session?.user?.email!);
                // Redirect to dashboard with trial status
                router.push('/dashboard?trial=true');
            } else {
                throw new Error('Failed to start trial');
            }
        } catch (err) {
            console.error('Error:', err);
            setError(err instanceof Error ? err.message : 'Failed to start free trial');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen">
            <PricingSection 
                loading={loading}
                error={error}
                onPremiumSubscribe={handlePremiumSubscribe}
                onFreeTrialStart={handleFreeTrial}
            />
        </div>
    );
}
