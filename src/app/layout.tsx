import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Inter } from 'next/font/google'
import { Button } from "@/components/ui/button"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Your Startup Name",
  description: "Description of your startup",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased ${inter.className}`}
      >
        <nav className="py-4 px-6 bg-white shadow-sm">
          <div className="container mx-auto max-w-6xl flex justify-between items-center">
            <div className="flex items-center">
              <img src="/logo.svg" alt="Logo" className="h-8 w-auto mr-4" />
              <span className="text-xl font-bold text-primary-900">Your Logo</span>
            </div>
            <div className="hidden md:flex space-x-4">
              <Button variant="ghost">Features</Button>
              <Button variant="ghost">Pricing</Button>
              <Button variant="ghost">Resources</Button>
              <Button variant="outline">Log In</Button>
              <Button variant="default">Sign Up</Button>
            </div>
          </div>
        </nav>
        {children}
        <footer className="py-12 px-6 bg-secondary-900 text-white">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Product</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-primary-300">Features</a></li>
                  <li><a href="#" className="hover:text-primary-300">Pricing</a></li>
                  <li><a href="#" className="hover:text-primary-300">Integrations</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Company</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-primary-300">About</a></li>
                  <li><a href="#" className="hover:text-primary-300">Careers</a></li>
                  <li><a href="#" className="hover:text-primary-300">Contact</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Resources</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-primary-300">Blog</a></li>
                  <li><a href="#" className="hover:text-primary-300">Documentation</a></li>
                  <li><a href="#" className="hover:text-primary-300">Support</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Legal</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-primary-300">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-primary-300">Terms of Service</a></li>
                  <li><a href="#" className="hover:text-primary-300">Cookie Policy</a></li>
                </ul>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-secondary-700 text-center text-sm">
              <p>&copy; 2023 Your Startup Name. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
