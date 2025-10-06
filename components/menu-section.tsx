import { MenuCard } from "@/components/menu-card"
import type { MenuCategory } from "@/lib/menu-data"

interface MenuSectionProps {
  category: MenuCategory
}

export function MenuSection({ category }: MenuSectionProps) {
  return (
    <section id={category.id} className="scroll-mt-20">
      <div className="mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">{category.name}</h2>
        <p className="text-muted-foreground text-sm">{category.nameRw}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {category.items.map((item) => (
          <MenuCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  )
}
