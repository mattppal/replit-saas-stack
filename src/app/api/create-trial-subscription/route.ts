import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getSubscriptionByEmail } from '@/lib/stripe-helpers';

const stripe = new Stripe(process.env.STRIPE_API_KEY!, {
    apiVersion: '2024-09-30.acacia'
});

export async function POST(request: Request) {
    try {
        const { email } = await request.json();

        // Create a customer
        const customer = await stripe.customers.create({
            email,
            metadata: {
                trialStart: new Date().toISOString(),
            },
        });

        // Create a subscription with trial
        const subscription = await stripe.subscriptions.create({
            customer: customer.id,
            items: [
                {
                    price: process.env.STRIPE_PRICE_ID,
                },
            ],
            trial_period_days: 30,
            trial_settings: {
                end_behavior: {
                    missing_payment_method: 'pause',
                },
            },
            payment_settings: {
                save_default_payment_method: 'on_subscription',
            },
            collection_method: 'charge_automatically',
            metadata: {
                trial_start: new Date().toISOString(),
                subscription_type: 'trial',
            },
            expand: ['latest_invoice'],
        });

        // Fetch complete subscription details
        const subscriptionDetails = await getSubscriptionByEmail(email);

        return NextResponse.json({
            ...subscriptionDetails,
            status: subscription.status,
            trialEnd: subscription.trial_end,
        });
    } catch (err) {
        console.error('Error creating trial subscription:', err);
        
        if (err instanceof Stripe.errors.StripeError) {
            return NextResponse.json(
                { error: err.message },
                { status: err.statusCode || 500 }
            );
        }

        return NextResponse.json(
            { error: 'Error creating trial subscription' },
            { status: 500 }
        );
    }
} 