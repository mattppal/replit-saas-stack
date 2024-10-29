'use client'

import { useSession } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CalendarDateRangePicker } from "@/components/date-range-picker"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { OverviewChart } from "@/components/overview-chart"

export default function DashboardPage() {
    const router = useRouter()
    const { data: session, error, isPending } = useSession()

    useEffect(() => {
        if (!isPending && !session) {
            console.log('No session found, redirecting to login')
            router.replace('/login')
        }
    }, [session, isPending, router])

    if (isPending) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-pulse text-center">
                    <h2 className="text-xl font-semibold text-gray-600">Loading your dashboard...</h2>
                </div>
            </div>
        )
    }

    if (!session) {
        return null
    }

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                <div className="flex items-center space-x-2">
                    <CalendarDateRangePicker />
                    <Button size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                    </Button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="h-4 w-4 text-muted-foreground">
                            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                        </svg>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$45,231.89</div>
                        <p className="text-xs text-muted-foreground">
                            +20.1% from last month
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Subscriptions</CardTitle>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="h-4 w-4 text-muted-foreground">
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+2350</div>
                        <p className="text-xs text-muted-foreground">
                            +180.1% from last month
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Sales</CardTitle>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="h-4 w-4 text-muted-foreground">
                            <rect width="20" height="14" x="2" y="5" rx="2" />
                            <path d="M2 10h20" />
                        </svg>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+12,234</div>
                        <p className="text-xs text-muted-foreground">
                            +19% from last month
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Now</CardTitle>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="h-4 w-4 text-muted-foreground">
                            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                        </svg>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+573</div>
                        <p className="text-xs text-muted-foreground">
                            +201 since last hour
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2 h-[400px]">
                        <OverviewChart />
                    </CardContent>
                </Card>

                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Recent Sales</CardTitle>
                        <p className="text-sm text-muted-foreground">
                            You made 265 sales this month.
                        </p>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-8">
                            {recentSales.map((sale) => (
                                <div key={sale.email} className="flex items-center">
                                    <Avatar className="h-9 w-9">
                                        <AvatarFallback>{getInitials(sale.name)}</AvatarFallback>
                                    </Avatar>
                                    <div className="ml-4 space-y-1">
                                        <p className="text-sm font-medium leading-none">{sale.name}</p>
                                        <p className="text-sm text-muted-foreground">{sale.email}</p>
                                    </div>
                                    <div className="ml-auto font-medium">+${sale.amount}</div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

function getInitials(name: string) {
    return name
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
}

const recentSales = [
    {
        name: "Olivia Martin",
        email: "olivia.martin@email.com",
        amount: "1,999.00"
    },
    {
        name: "Jackson Lee",
        email: "jackson.lee@email.com",
        amount: "39.00"
    },
    {
        name: "Isabella Nguyen",
        email: "isabella.nguyen@email.com",
        amount: "299.00"
    },
    {
        name: "William Kim",
        email: "will@email.com",
        amount: "99.00"
    },
    {
        name: "Sofia Davis",
        email: "sofia.davis@email.com",
        amount: "39.00"
    }
]
