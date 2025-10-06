"use client"

import { MenuNav } from "@/components/menu-nav"
import { MenuSection } from "@/components/menu-section"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import { useMenuData } from "@/hooks/use-menu-data"

export default function MenuPage() {
  const { categories, loading, error } = useMenuData()

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading menu...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Menu Unavailable</h2>
          <p className="text-muted-foreground mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <MenuNav />

      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <LanguageToggle />
        <ThemeToggle />
      </div>

      <main className="container mx-auto px-4 py-24 max-w-6xl">
        <div className="text-center mb-12 space-y-4">
          <h1 className="font-sans text-4xl md:text-6xl font-bold text-foreground text-balance">Our Menu</h1>
          <p className="text-lg md:text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
            Discover the rich flavors of East Africa with our carefully curated selection of traditional dishes
          </p>
        </div>

        {categories.length === 0 ? (
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold mb-4">Menu Coming Soon</h2>
            <p className="text-muted-foreground mb-6">
              We're preparing an amazing selection of traditional East African dishes for you.
              Please check back soon!
            </p>
            <div className="max-w-md mx-auto">
              <p className="text-sm text-muted-foreground">
                📍 Visit us at: Opposite INES-Ruhengeri, Musanze, Rwanda
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                📞 Phone: +250 725 181 325
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                ✉️ Email: ozonerestaurant@gmail.com
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-16">
            {categories.map((category) => (
              <MenuSection key={category.id} category={category} />
            ))}
          </div>
        )}
      </main>

      <footer className="bg-card border-t border-border mt-16">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <h3 className="font-semibold text-lg mb-2 text-foreground">Location</h3>
              <p className="text-muted-foreground">Opposite INES-Ruhengeri, Musanze, Rwanda</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2 text-foreground">Contact</h3>
              <p className="text-muted-foreground">Phone: +250 725 181 325</p>
              <p className="text-muted-foreground">Email: ozonerestaurant@gmail.com</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2 text-foreground">Hours</h3>
              <p className="text-muted-foreground">Mon-Sun: 07:00 AM - 10:00 PM</p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border text-center text-muted-foreground">
            <p>&copy; 2025 Taste of East Africa. All rights reserved by Developer.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
