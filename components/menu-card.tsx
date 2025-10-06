import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import type { MenuItem } from "@/lib/menu-data"

interface MenuCardProps {
  item: MenuItem
}

export function MenuCard({ item }: MenuCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 w-full">
        <Image
          src={item.image || "/placeholder.svg"}
          alt={item.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg text-foreground">{item.name}</h3>
          <span className="font-bold text-primary whitespace-nowrap ml-2">{item.price.toLocaleString()} RWF</span>
        </div>
        <p className="text-sm text-muted-foreground mb-1">{item.description}</p>
        <p className="text-xs text-muted-foreground italic">{item.descriptionRw}</p>
      </CardContent>
    </Card>
  )
}
