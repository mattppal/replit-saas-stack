"use client";
import { Menu } from "lucide-react";
import React from "react";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";
import {
    NavigationMenu,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ToggleTheme } from "@/components/toggle-theme";
import { useRouter } from 'next/navigation';
import { useSession, signOut } from "@/lib/auth-client";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from "@/components/ui/avatar";
import Image from "next/image"

interface RouteProps {
    href: string;
    label: string;
}

interface FeatureProps {
    title: string;
    description: string;
}

const routeList: RouteProps[] = [
    {
        href: "/#pricing",
        label: "Pricing",
    }, {
        href: "/#testimonials",
        label: "Testimonials",
    },
    {
        href: "/#team",
        label: "Team",
    },
    {
        href: "/#contact",
        label: "Contact",
    },
    {
        href: "/#faq",
        label: "FAQ",
    },
];

const featureList: FeatureProps[] = [
    {
        title: "Showcase Your Value ",
        description: "Highlight how your product solves user problems.",
    },
    {
        title: "Build Trust",
        description:
            "Leverages social proof elements to establish trust and credibility.",
    },
    {
        title: "Capture Leads",
        description:
            "Make your lead capture form visually appealing and strategically.",
    },
];

export const Navbar = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const router = useRouter();
    const { data: session } = useSession();

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2)
    }

    const handleLogout = async () => {
        try {
            await signOut()
            router.push('/login')
        } catch (error) {
            console.error('Logout failed:', error)
        }
    }

    const AuthButtons = () => (
        session ? (
            <DropdownMenu>
                <DropdownMenuTrigger className="outline-none">
                    <Avatar className="h-8 w-8 cursor-pointer hover:opacity-80 transition">
                        {session.user.image && (
                            <AvatarImage src={session.user.image} alt={session.user.name || ''} />
                        )}
                        <AvatarFallback>
                            {getInitials(session.user.name || session.user.email || 'User')}
                        </AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem className="cursor-pointer" onClick={() => router.push('/dashboard')}>
                        Dashboard
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer" onClick={() => router.push('/settings')}>
                        Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer text-red-600" onClick={handleLogout}>
                        Logout
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        ) : (
            <div className="flex items-center gap-2">
                <Link href="/login">
                    <Button variant="ghost" size="sm">Sign in</Button>
                </Link>
                <Link href="/signup">
                    <Button variant="default" size="sm">Sign up</Button>
                </Link>
            </div>
        )
    );

    return (
        <header className="shadow-inner bg-opacity-15 w-[90%] md:w-[70%] lg:w-[75%] lg:max-w-screen-xl top-5 mx-auto sticky border border-secondary z-40 rounded-2xl flex justify-between items-center p-2 bg-card">
            <Link href="/" className="font-bold text-lg flex items-center">
                <Image
                    src="/logo.svg"
                    alt="Logo"
                    width={36}
                    height={36}
                    className="mr-2"
                    priority
                />
                Your new app
            </Link>

            {/* Mobile Menu */}
            <div className="flex items-center lg:hidden">
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>
                        <Menu
                            onClick={() => setIsOpen(!isOpen)}
                            className="cursor-pointer lg:hidden"
                        />
                    </SheetTrigger>

                    <SheetContent className="flex flex-col justify-between rounded-tr-2xl rounded-br-2xl bg-card border-secondary">
                        <div className="flex flex-col space-y-4 mt-8">
                            {routeList.map((route) => (
                                <Link
                                    key={route.href}
                                    href={route.href}
                                    onClick={() => setIsOpen(false)}
                                    className="text-lg font-medium"
                                >
                                    <span className={route.label === "Pricing" ? "text-orange-500 font-bold" : ""}>
                                        {route.label}
                                    </span>
                                </Link>
                            ))}
                            <div className="pt-4 border-t">
                                <AuthButtons />
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>

            {/* Desktop Menu */}
            <NavigationMenu className="hidden lg:block mx-auto">
                <div className="flex space-x-6">
                    {routeList.map((route) => (
                        <Link
                            key={route.href}
                            href={route.href}
                            className="text-sm font-medium transition-colors hover:text-primary"
                        >
                            <span className={route.label === "Pricing" ? "text-orange-500 font-bold" : ""}>
                                {route.label}
                            </span>
                        </Link>
                    ))}
                </div>
            </NavigationMenu>

            {/* Auth and Theme Toggle */}
            <div className="hidden lg:flex items-center gap-4">
                <AuthButtons />
                <ToggleTheme />
            </div>
        </header>
    );
};
