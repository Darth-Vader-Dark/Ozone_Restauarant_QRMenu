"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Pencil, Trash2, Save, X } from "lucide-react"
import type { MenuItem } from "@/lib/menu-data"
import Image from "next/image"

interface MenuItemEditorProps {
  item: MenuItem
  categoryId: string
  onUpdate: (item: MenuItem) => void
  onDelete: () => void
}

export function MenuItemEditor({ item, onUpdate, onDelete }: MenuItemEditorProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedItem, setEditedItem] = useState(item)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const handleSave = () => {
    const finalItem = imagePreview ? { ...editedItem, image: imagePreview } : editedItem
    onUpdate(finalItem)
    setIsEditing(false)
    setImageFile(null)
    setImagePreview(null)
  }

  const handleCancel = () => {
    setEditedItem(item)
    setIsEditing(false)
    setImageFile(null)
    setImagePreview(null)
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  if (!isEditing) {
    return (
      <Card>
        <CardContent className="p-4">
          <div className="flex items-start gap-4">
            <div className="relative h-20 w-20 rounded-lg overflow-hidden flex-shrink-0">
              <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-lg">{item.name}</h4>
              <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
              <p className="text-sm text-muted-foreground mt-1">{item.descriptionRw}</p>
              <p className="text-lg font-bold text-primary mt-2">{item.price.toLocaleString()} RWF</p>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor={`name-${item.id}`}>Name (English)</Label>
            <Input
              id={`name-${item.id}`}
              value={editedItem.name}
              onChange={(e) => setEditedItem({ ...editedItem, name: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor={`price-${item.id}`}>Price (RWF)</Label>
            <Input
              id={`price-${item.id}`}
              type="number"
              value={editedItem.price}
              onChange={(e) => setEditedItem({ ...editedItem, price: Number(e.target.value) })}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor={`desc-${item.id}`}>Description (English)</Label>
          <Textarea
            id={`desc-${item.id}`}
            value={editedItem.description}
            onChange={(e) => setEditedItem({ ...editedItem, description: e.target.value })}
            rows={2}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor={`desc-rw-${item.id}`}>Description (Kinyarwanda)</Label>
          <Textarea
            id={`desc-rw-${item.id}`}
            value={editedItem.descriptionRw}
            onChange={(e) => setEditedItem({ ...editedItem, descriptionRw: e.target.value })}
            rows={2}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor={`image-${item.id}`}>Image</Label>
          <div className="flex items-center gap-4">
            <div className="relative h-24 w-24 rounded-lg overflow-hidden flex-shrink-0 border border-border">
              <Image src={imagePreview || editedItem.image} alt={editedItem.name} fill className="object-cover" />
            </div>
            <div className="flex-1">
              <Input
                id={`image-${item.id}`}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="cursor-pointer"
              />
              <p className="text-xs text-muted-foreground mt-1">Upload a new image or keep the current one</p>
            </div>
          </div>
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
