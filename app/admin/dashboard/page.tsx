"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LogOut, Plus } from "lucide-react"
import { MenuItemEditor } from "@/components/admin/menu-item-editor"
import { CategoryEditor } from "@/components/admin/category-editor"
import { useMenuData } from "@/hooks/use-menu-data"
import type { MenuCategory } from "@/lib/menu-data"

export default function AdminDashboardPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const { categories, loading, error, updateCategory, addCategory, deleteCategory } = useMenuData()

  useEffect(() => {
    const auth = sessionStorage.getItem("admin_authenticated")
    if (auth !== "true") {
      router.push("/admin/login")
    } else {
      setIsAuthenticated(true)
    }
  }, [router])

  const handleLogout = () => {
    sessionStorage.removeItem("admin_authenticated")
    router.push("/")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading menu data...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-destructive">Error Loading Data</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>
              Retry
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground">Manage your restaurant menu</p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="menu" className="space-y-6">
          <TabsList>
            <TabsTrigger value="menu">Menu Items</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
          </TabsList>

          <TabsContent value="menu" className="space-y-6">
            {categories.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <h3 className="text-lg font-semibold mb-2">No Menu Categories Yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Start by creating your first menu category using the "Categories" tab above.
                  </p>
                  <Button
                    onClick={() => {
                      const tabsList = document.querySelector('[role="tablist"]') as HTMLElement;
                      const categoriesTab = tabsList?.querySelector('[value="categories"]') as HTMLElement;
                      categoriesTab?.click();
                    }}
                  >
                    Go to Categories
                  </Button>
                </CardContent>
              </Card>
            ) : (
              categories.map((category) => (
                <Card key={category.id}>
                  <CardHeader>
                    <CardTitle>{category.name}</CardTitle>
                    <CardDescription>
                      {category.items.length} item{category.items.length !== 1 ? "s" : ""}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {category.items.map((item) => (
                      <MenuItemEditor
                        key={item.id}
                        item={item}
                        categoryId={category.id}
                        onUpdate={(updatedItem) => {
                          const updatedCategory = {
                            ...category,
                            items: category.items.map((i) => (i.id === item.id ? updatedItem : i)),
                          }
                          updateCategory(updatedCategory)
                        }}
                        onDelete={() => {
                          const updatedCategory = {
                            ...category,
                            items: category.items.filter((i) => i.id !== item.id),
                          }
                          updateCategory(updatedCategory)
                        }}
                      />
                    ))}
                    <Button
                      variant="outline"
                      className="w-full bg-transparent"
                      onClick={() => {
                        const newItem = {
                          id: `item-${Date.now()}`,
                          name: "New Item",
                          description: "Description",
                          descriptionRw: "Ibisobanuro",
                          price: 0,
                          image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80",
                        }
                        const updatedCategory = {
                          ...category,
                          items: [...category.items, newItem],
                        }
                        updateCategory(updatedCategory)
                      }}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add Item to {category.name}
                    </Button>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="categories" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Manage Categories</CardTitle>
                <CardDescription>Add, edit, or remove menu categories</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {categories.map((category) => (
                  <CategoryEditor
                    key={category.id}
                    category={category}
                    onUpdate={updateCategory}
                    onDelete={() => deleteCategory(category.id)}
                  />
                ))}
                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={() => {
                    const newCategory: MenuCategory = {
                      id: `category-${Date.now()}`,
                      name: "New Category",
                      nameRw: "Icyiciro Gishya",
                      items: [],
                    }
                    addCategory(newCategory)
                  }}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Category
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
