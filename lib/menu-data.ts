export interface MenuItem {
  id: string
  name: string
  description: string
  descriptionRw: string
  price: number
  image: string
}

export interface MenuCategory {
  id: string
  name: string
  nameRw: string
  items: MenuItem[]
}

// Start with empty menu data - all content will be added by admin
export const menuData: MenuCategory[] = []
