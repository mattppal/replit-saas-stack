import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { auth } from '@/lib/auth';
import { getSubscriptionByEmail } from '@/lib/stripe-helpers';

const stripe = new Stripe(process.env.STRIPE_API_KEY!, {
    apiVersion: '2024-09-30.acacia'
});

export async function POST(request: Request) {
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

        if (!subscriptionDetails.customerId) {
            return NextResponse.json(
                { error: 'No subscription found' },
                { status: 404 }
            );
        }

        // Create Stripe portal configuration if it doesn't exist
        const configurations = await stripe.billingPortal.configurations.list();
        let configId = configurations.data[0]?.id;

        if (!configId) {
            const configuration = await stripe.billingPortal.configurations.create({
                business_profile: {
                    headline: 'Manage your subscription',
                },
                features: {
                    subscription_update: {
                        enabled: true,
                        default_allowed_updates: ['price', 'quantity'],
                        products: [
                            {
                                product: process.env.STRIPE_PRODUCT_ID!,
                                prices: [process.env.STRIPE_PRICE_ID!],
                            },
                        ],
                    },
                    subscription_cancel: {
                        enabled: true,
                        mode: 'at_period_end',
                        cancellation_reason: {
                            enabled: true,
                            options: [
                                'too_expensive',
                                'missing_features',
                                'switched_service',
                                'unused',
                                'other',
                            ],
                        },
                    },
                    payment_method_update: { enabled: true },
                    invoice_history: { enabled: true },
                },
            });
            configId = configuration.id;
        }

        // Create portal session with configuration
        const portalSession = await stripe.billingPortal.sessions.create({
            customer: subscriptionDetails.customerId,
            configuration: configId,
            return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/subscription`,
        });

        return NextResponse.json({ url: portalSession.url });
    } catch (err) {
        console.error('Error creating portal session:', err);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
} 