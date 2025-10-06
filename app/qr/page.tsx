import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Download } from "lucide-react"
import { QRCodeDisplay } from "@/components/qr-code-display"

export default function QRPage() {
  return (
    <div className="min-h-screen bg-background p-4">
      <div className="container mx-auto max-w-2xl py-8">
        <Button asChild variant="ghost" className="mb-6">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>

        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold">Restaurant Menu QR Code</CardTitle>
            <CardDescription className="text-lg">Scan this QR code to view our digital menu</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-6">
            <QRCodeDisplay />

            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">
                Print this QR code and place it on your tables for easy menu access
              </p>
              <Button variant="outline" className="mt-4 bg-transparent">
                <Download className="mr-2 h-4 w-4" />
                Download QR Code
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 p-6 bg-muted rounded-lg">
          <h3 className="font-semibold text-lg mb-3">How to use:</h3>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>Download the QR code image</li>
            <li>Print it on table tents, menus, or posters</li>
            <li>Customers scan with their phone camera</li>
            <li>They instantly access your digital menu</li>
          </ol>
        </div>
      </div>
    </div>
  )
}
