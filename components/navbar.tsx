"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function Navbar() {
  const [user, setUser] = React.useState<{ name: string; email: string } | null>(null)
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const pathname = usePathname()

  React.useEffect(() => {
    const userData = localStorage.getItem("nyaysetu_user")
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("nyaysetu_user")
    localStorage.removeItem("lexcore_chats")
    setUser(null)
    window.location.href = "/"
  }

  const navLinks = [
    { href: "/process", label: "Process" },
    { href: "/benefits", label: "Benefits" },
    { href: "/services", label: "Services" },
    { href: "/community", label: "Community" },
    { href: "/contact", label: "Contact" },
  ]

  const isActive = (href: string) => pathname === href

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl">
              <Image src="/logo.png" alt="LexCore AI" width={32} height={32} className="h-8 w-8" />
              <span>LexCore AI</span>
            </Link>

            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    isActive(link.href) ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ModeToggle />

            {user ? (
              <>
                <span className="hidden sm:inline text-sm text-muted-foreground">Welcome, {user.name}</span>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" asChild className="hidden sm:inline-flex">
                  <Link href="/login">Login</Link>
                </Button>
                <Button variant="outline" size="sm" asChild className="hidden sm:inline-flex">
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </>
            )}

            <Button size="sm" asChild>
              <Link href="/chat">Chat for Free</Link>
            </Button>

            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col gap-4 mt-8">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`text-lg font-medium transition-colors hover:text-primary ${
                        isActive(link.href) ? "text-primary" : "text-muted-foreground"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <div className="border-t pt-4 mt-4">
                    {user ? (
                      <>
                        <p className="text-sm text-muted-foreground mb-3">Welcome, {user.name}</p>
                        <Button variant="outline" className="w-full" onClick={handleLogout}>
                          Logout
                        </Button>
                      </>
                    ) : (
                      <div className="flex flex-col gap-2">
                        <Button variant="outline" asChild onClick={() => setMobileOpen(false)}>
                          <Link href="/login">Login</Link>
                        </Button>
                        <Button asChild onClick={() => setMobileOpen(false)}>
                          <Link href="/signup">Sign Up</Link>
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </header>
  )
}
