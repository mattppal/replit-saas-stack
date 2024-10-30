import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_API_KEY!, {
    apiVersion: '2024-09-30.acacia'
});

export interface SubscriptionDetails {
    subscriptionId: string | null;
    status: string | null;
    trialEnd: number | null;
    priceId: string | null;
    customerId: string | null;
}

export async function getSubscriptionByEmail(email: string): Promise<SubscriptionDetails> {
    try {
        // Find customer by email
        const customers = await stripe.customers.list({
            email: email,
            limit: 1,
        });

        if (!customers.data.length) {
            return {
                subscriptionId: null,
                status: null,
                trialEnd: null,
                priceId: null,
                customerId: null,
            };
        }

        const customer = customers.data[0];

        // Get customer's subscriptions
        const subscriptions = await stripe.subscriptions.list({
            customer: customer.id,
            status: 'all',
            limit: 1,
        });

        if (!subscriptions.data.length) {
            return {
                subscriptionId: null,
                status: null,
                trialEnd: null,
                priceId: null,
                customerId: customer.id,
            };
        }

        const subscription = subscriptions.data[0];

        return {
            subscriptionId: subscription.id,
            status: subscription.status,
            trialEnd: subscription.trial_end,
            priceId: subscription.items.data[0].price.id,
            customerId: customer.id,
        };
    } catch (error) {
        console.error('Error fetching subscription:', error);
        throw error;
    }
} 