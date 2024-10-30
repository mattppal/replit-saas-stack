import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { auth } from '@/lib/auth';

const stripe = new Stripe(process.env.STRIPE_API_KEY!, {
    apiVersion: '2024-09-30.acacia'
});

export async function POST(request: Request) {
    try {
        // Get session from Better Auth
        const session = await auth.api.getSession({
            headers: request.headers,
        });

        if (!session) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        // Create Checkout Session
        const checkoutSession = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price: process.env.STRIPE_PRICE_ID,
                    quantity: 1,
                },
            ],
            mode: 'subscription',
            allow_promotion_codes: true,
            billing_address_collection: 'required',
            metadata: {
                source: 'premium_subscription',
            },
            customer_email: session.user.email,
            success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true&session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing?canceled=true`,
        });

        return NextResponse.json({ sessionId: checkoutSession.id });
    } catch (err) {
        console.error('Error creating checkout session:', err);
        
        if (err instanceof Stripe.errors.StripeError) {
            return NextResponse.json(
                { error: err.message },
                { status: err.statusCode || 500 }
            );
        }

        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
} 