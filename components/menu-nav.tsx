"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home } from "lucide-react"
import { useMenuData } from "@/hooks/use-menu-data"

export function MenuNav() {
  const [activeSection, setActiveSection] = useState("")
  const { categories, loading } = useMenuData()

  useEffect(() => {
    if (categories.length === 0) return

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
  }, [categories])

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

  if (loading || categories.length === 0) {
    return (
      <nav className="sticky top-0 z-40 bg-card/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center h-16">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
          </div>
        </div>
      </nav>
    )
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
            {categories.map(({ id, name }) => (
              <Button
                key={id}
                variant={activeSection === id ? "default" : "ghost"}
                size="sm"
                onClick={() => scrollToSection(id)}
                className="whitespace-nowrap text-xs sm:text-sm"
              >
                {name}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
