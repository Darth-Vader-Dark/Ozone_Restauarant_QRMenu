"use client"

import { useState, useEffect, useCallback } from "react"
import { menuData as defaultMenuData, type MenuCategory } from "@/lib/menu-data"

export function useMenuData() {
  const [categories, setCategories] = useState<MenuCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  // Fetch menu data from API
  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch(`/api/menu?refresh=${refreshTrigger}`)

      if (!response.ok) {
        throw new Error('Failed to fetch menu data')
      }

      const data = await response.json()
      setCategories(data || []) // Ensure we always have an array
    } catch (err) {
      console.error('Error fetching menu data:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch menu data')
      // Don't fallback to default data - keep empty array
      setCategories([])
    } finally {
      setLoading(false)
    }
  }, [refreshTrigger])

  // Initialize data on mount
  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  // Manual refresh function
  const refreshData = useCallback(() => {
    setRefreshTrigger(prev => prev + 1)
  }, [])

  // Update category via API
  const updateCategory = useCallback(async (updatedCategory: MenuCategory) => {
    try {
      const response = await fetch(`/api/menu/${updatedCategory.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: updatedCategory.name,
          nameRw: updatedCategory.nameRw,
          items: updatedCategory.items,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to update category')
      }

      const updatedData = await response.json()
      setCategories((prev) =>
        prev.map((cat) => (cat.id === updatedCategory.id ? updatedData : cat))
      )

      // Trigger refresh for public pages
      refreshData()
    } catch (err) {
      console.error('Error updating category:', err)
      setError(err instanceof Error ? err.message : 'Failed to update category')
      throw err
    }
  }, [refreshData])

  // Add new category via API
  const addCategory = useCallback(async (newCategory: MenuCategory) => {
    try {
      const response = await fetch('/api/menu', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCategory),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to create category')
      }

      const createdCategory = await response.json()
      setCategories((prev) => [...prev, createdCategory])

      // Trigger refresh for public pages
      refreshData()
    } catch (err) {
      console.error('Error creating category:', err)
      setError(err instanceof Error ? err.message : 'Failed to create category')
      throw err
    }
  }, [refreshData])

  // Delete category via API
  const deleteCategory = useCallback(async (categoryId: string) => {
    try {
      const response = await fetch(`/api/menu/${categoryId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete category')
      }

      setCategories((prev) => prev.filter((cat) => cat.id !== categoryId))

      // Trigger refresh for public pages
      refreshData()
    } catch (err) {
      console.error('Error deleting category:', err)
      setError(err instanceof Error ? err.message : 'Failed to delete category')
      throw err
    }
  }, [refreshData])

  // Reset to default data
  const resetToDefault = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      // Delete all existing categories
      for (const category of categories) {
        await deleteCategory(category.id)
      }

      // Reinitialize with default data
      for (const category of defaultMenuData) {
        await addCategory(category)
      }

      await fetchCategories()
    } catch (err) {
      console.error('Error resetting to default:', err)
      setError(err instanceof Error ? err.message : 'Failed to reset to default')
    } finally {
      setLoading(false)
    }
  }, [categories, deleteCategory, addCategory, fetchCategories])

  return {
    categories,
    loading,
    error,
    updateCategory,
    addCategory,
    deleteCategory,
    resetToDefault,
    refetch: fetchCategories,
    refreshData,
  }
}
