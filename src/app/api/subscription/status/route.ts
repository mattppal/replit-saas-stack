import { NextResponse } from 'next/server';
import { getSubscriptionByEmail } from '@/lib/stripe-helpers';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const email = searchParams.get('email');

        if (!email) {
            return NextResponse.json(
                { error: 'Email is required' },
                { status: 400 }
            );
        }

        const subscriptionDetails = await getSubscriptionByEmail(email);
        
        return NextResponse.json(subscriptionDetails);
    } catch (err) {
        console.error('Error fetching subscription status:', err);
        return NextResponse.json(
            { error: 'Error fetching subscription status' },
            { status: 500 }
        );
    }
} 