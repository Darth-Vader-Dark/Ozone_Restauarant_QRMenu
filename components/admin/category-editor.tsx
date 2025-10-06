"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Pencil, Trash2, Save, X } from "lucide-react"
import type { MenuCategory } from "@/lib/menu-data"

interface CategoryEditorProps {
  category: MenuCategory
  onUpdate: (category: MenuCategory) => void
  onDelete: () => void
}

export function CategoryEditor({ category, onUpdate, onDelete }: CategoryEditorProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedCategory, setEditedCategory] = useState(category)

  const handleSave = () => {
    onUpdate(editedCategory)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedCategory(category)
    setIsEditing(false)
  }

  if (!isEditing) {
    return (
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-lg">{category.name}</h4>
              <p className="text-sm text-muted-foreground">{category.nameRw}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {category.items.length} item{category.items.length !== 1 ? "s" : ""}
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={() => setIsEditing(true)}>
                <Pencil className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={onDelete}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent className="p-4 space-y-4">
        <div className="space-y-2">
          <Label htmlFor={`cat-name-${category.id}`}>Category Name (English)</Label>
          <Input
            id={`cat-name-${category.id}`}
            value={editedCategory.name}
            onChange={(e) => setEditedCategory({ ...editedCategory, name: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor={`cat-name-rw-${category.id}`}>Category Name (Kinyarwanda)</Label>
          <Input
            id={`cat-name-rw-${category.id}`}
            value={editedCategory.nameRw}
            onChange={(e) => setEditedCategory({ ...editedCategory, nameRw: e.target.value })}
          />
        </div>

        <div className="flex gap-2 justify-end">
          <Button variant="outline" onClick={handleCancel}>
            <X className="mr-2 h-4 w-4" />
            Cancel
          </Button>
          <Button onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
