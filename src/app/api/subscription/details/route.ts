import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { auth } from '@/lib/auth';
import { getSubscriptionByEmail } from '@/lib/stripe-helpers';

const stripe = new Stripe(process.env.STRIPE_API_KEY!, {
    apiVersion: '2024-09-30.acacia'
});

export async function GET(request: Request) {
    try {
        const session = await auth.api.getSession({
            headers: request.headers,
        });

        if (!session) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const subscriptionDetails = await getSubscriptionByEmail(session.user.email);

        // If there's a subscription, fetch additional details from Stripe
        if (subscriptionDetails.subscriptionId) {
            const subscription = await stripe.subscriptions.retrieve(
                subscriptionDetails.subscriptionId,
                {
                    expand: ['latest_invoice', 'customer', 'items.data.price'],
                }
            );

            // Get price details
            const price = subscription.items.data[0].price;

            return NextResponse.json({
                ...subscriptionDetails,
                currentPeriodEnd: subscription.current_period_end,
                cancelAtPeriodEnd: subscription.cancel_at_period_end,
                status: subscription.status,
                trialEnd: subscription.trial_end,
                price: {
                    unit_amount: price.unit_amount,
                    currency: price.currency,
                    recurring: price.recurring,
                },
            });
        }

        return NextResponse.json(subscriptionDetails);
    } catch (err) {
        console.error('Error fetching subscription details:', err);
        return NextResponse.json(
            { error: 'Error fetching subscription details' },
            { status: 500 }
        );
    }
} 