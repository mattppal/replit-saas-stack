import { GeistSans } from 'geist/font'
import { GeistMono } from 'geist/font/mono'
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/layout/navbar"
import { FooterSection } from "@/components/layout/sections/footer"
import "./globals.css"

export const metadata = {
  title: 'Your new app Landing Page',
  description: 'A beautiful landing page built with Your new app UI',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${GeistSans.variable} ${GeistMono.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <FooterSection />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
