import Link from "next/link"
import { Button } from "@/components/ui/button"
import { QrCode, Menu, Phone, MapPin, Lock } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-br from-primary via-accent to-secondary p-4">
        <div className="max-w-2xl w-full text-center space-y-8">
          <div className="space-y-4">
            <h1 className="font-sans text-5xl md:text-7xl font-bold text-primary-foreground text-balance">
              Ozone Restaurant
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 text-pretty">
              Authentic Rwandan, Sudanese & South Sudanese Cuisine in the Heart of Musanze
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="w-full sm:w-auto text-lg">
              <Link href="/menu">
                <Menu className="mr-2 h-5 w-5" />
                View Menu
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary" className="w-full sm:w-auto text-lg">
              <Link href="/qr">
                <QrCode className="mr-2 h-5 w-5" />
                Get QR Code
              </Link>
            </Button>
          </div>

          <div className="pt-8 space-y-3 text-primary-foreground/80">
            <div className="flex items-center justify-center gap-2">
              <Phone className="h-5 w-5" />
              <span>+250 725 181 325</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <MapPin className="h-5 w-5" />
              <span>Opposite INES-Ruhengeri, Musanze, Rwanda</span>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-background/50 backdrop-blur-sm border-t border-border py-6">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">© 2025 Taste of East Africa. All rights reserved.</p>
          <Link
            href="/admin/login"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
          >
            <Lock className="h-3 w-3" />
            Admin Access
          </Link>
        </div>
      </footer>
    </div>
  )
}
