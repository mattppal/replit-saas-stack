import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

const stripe = new Stripe(process.env.STRIPE_API_KEY!, {
    apiVersion: '2024-09-30.acacia'
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: Request) {
    try {
        const body = await request.text();
        const signature = headers().get('stripe-signature')!;

        let event: Stripe.Event;

        try {
            event = stripe.webhooks.constructEvent(
                body,
                signature,
                webhookSecret
            );
        } catch (err) {
            console.error('Webhook signature verification failed:', err);
            return NextResponse.json(
                { error: 'Invalid signature' },
                { status: 400 }
            );
        }

        switch (event.type) {
            case 'customer.subscription.updated':
            case 'customer.subscription.deleted':
                const subscription = event.data.object as Stripe.Subscription;
                const customer = await stripe.customers.retrieve(subscription.customer as string);
                
                if (customer.deleted) {
                    throw new Error('Customer was deleted');
                }

                // Update user's subscription in the database
                await auth.api.updateUser({
                    email: customer.email!,
                    subscription: {
                        subscriptionId: subscription.id,
                        status: subscription.status,
                        trialEnd: subscription.trial_end,
                        priceId: subscription.items.data[0].price.id,
                        customerId: customer.id,
                    },
                });
                break;

            case 'customer.subscription.trial_will_end':
                // Handle trial ending notification
                // You could send an email here
                break;
        }

        return NextResponse.json({ received: true });
    } catch (err) {
        console.error('Webhook error:', err);
        return NextResponse.json(
            { error: 'Webhook handler failed' },
            { status: 500 }
        );
    }
} 