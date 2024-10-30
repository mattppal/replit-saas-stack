'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { Loader2, ExternalLink } from 'lucide-react';

interface SubscriptionDetails {
    subscriptionId: string | null;
    status: string | null;
    trialEnd: number | null;
    priceId: string | null;
    customerId: string | null;
    currentPeriodEnd?: number;
    cancelAtPeriodEnd?: boolean;
    price?: {
        unit_amount: number;
        currency: string;
        recurring: {
            interval: string;
        };
    };
}

export default function SubscriptionPage() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [subscription, setSubscription] = useState<SubscriptionDetails | null>(null);

    useEffect(() => {
        fetchSubscriptionDetails();
    }, []);

    const fetchSubscriptionDetails = async () => {
        try {
            const response = await fetch('/api/subscription/details');
            if (!response.ok) {
                throw new Error('Failed to fetch subscription details');
            }
            const data = await response.json();
            setSubscription(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load subscription details');
        } finally {
            setLoading(false);
        }
    };

    const handleManageSubscription = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/create-portal-session', {
                method: 'POST',
            });

            if (!response.ok) throw new Error('Failed to create portal session');

            const { url } = await response.json();
            window.location.href = url;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    const formatPrice = (amount: number, currency: string) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency.toUpperCase(),
        }).format(amount / 100);
    };

    if (loading) {
        return (
            <div className="container max-w-4xl py-8 flex justify-center items-center min-h-[400px]">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    return (
        <div className="container max-w-4xl py-8">
            <h1 className="text-3xl font-bold mb-8">Subscription Management</h1>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            <Card>
                <CardHeader>
                    <CardTitle>Your Subscription</CardTitle>
                    <CardDescription>
                        Manage your subscription and billing details
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <h3 className="font-medium text-sm text-muted-foreground">Status</h3>
                                <p className="capitalize mt-1 text-lg">{subscription?.status || 'No active subscription'}</p>
                            </div>

                            {subscription?.price && (
                                <div>
                                    <h3 className="font-medium text-sm text-muted-foreground">Price</h3>
                                    <p className="mt-1 text-lg">
                                        {formatPrice(subscription.price.unit_amount, subscription.price.currency)}
                                        <span className="text-sm text-muted-foreground">
                                            /{subscription.price.recurring.interval}
                                        </span>
                                    </p>
                                </div>
                            )}
                        </div>

                        {subscription?.trialEnd && (
                            <div>
                                <h3 className="font-medium text-sm text-muted-foreground">Trial End Date</h3>
                                <p className="mt-1 text-lg">{format(subscription.trialEnd * 1000, 'PPP')}</p>
                            </div>
                        )}

                        {subscription?.currentPeriodEnd && (
                            <div>
                                <h3 className="font-medium text-sm text-muted-foreground">Current Period End</h3>
                                <p className="mt-1 text-lg">{format(subscription.currentPeriodEnd * 1000, 'PPP')}</p>
                                {subscription.cancelAtPeriodEnd && (
                                    <p className="text-yellow-600 mt-1">
                                        Your subscription will end on this date
                                    </p>
                                )}
                            </div>
                        )}

                        {subscription?.status && (
                            <Button
                                onClick={handleManageSubscription}
                                disabled={loading}
                                className="w-full sm:w-auto"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Loading...
                                    </>
                                ) : (
                                    <>
                                        Manage Billing
                                        <ExternalLink className="ml-2 h-4 w-4" />
                                    </>
                                )}
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
} 