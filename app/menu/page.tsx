"use client"

import { MenuNav } from "@/components/menu-nav"
import { MenuSection } from "@/components/menu-section"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import { useMenuData } from "@/hooks/use-menu-data"

export default function MenuPage() {
  const { categories } = useMenuData()

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

        <div className="space-y-16">
          {categories.map((category) => (
            <MenuSection key={category.id} category={category} />
          ))}
        </div>
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
