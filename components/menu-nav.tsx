"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home } from "lucide-react"

const categories = [
  { id: "rwandan", label: "Rwandan 🇷🇼", labelRw: "Ibiryo bya Rwanda 🇷🇼" },
  { id: "sudanese", label: "Sudanese 🇸🇩", labelRw: "Ibiryo bya Sudani 🇸🇩" },
  { id: "south-sudanese", label: "South Sudanese 🇸🇸", labelRw: "Ibiryo bya Sudani y'Amajyepfo 🇸🇸" },
  { id: "drinks", label: "Drinks 🍹", labelRw: "Ibinyobwa 🍹" },
]

export function MenuNav() {
  const [activeSection, setActiveSection] = useState("")

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: "-50% 0px -50% 0px" },
    )

    categories.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }

  return (
    <nav className="sticky top-0 z-40 bg-card/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Button asChild variant="ghost" size="sm">
            <Link href="/">
              <Home className="h-4 w-4" />
            </Link>
          </Button>

          <div className="flex gap-1 overflow-x-auto scrollbar-hide">
            {categories.map(({ id, label }) => (
              <Button
                key={id}
                variant={activeSection === id ? "default" : "ghost"}
                size="sm"
                onClick={() => scrollToSection(id)}
                className="whitespace-nowrap text-xs sm:text-sm"
              >
                {label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
