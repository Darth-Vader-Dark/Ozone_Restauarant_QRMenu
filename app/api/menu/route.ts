import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import MenuCategory from '@/lib/models/menu';
import { menuData } from '@/lib/menu-data';

// GET /api/menu - Fetch all menu categories
export async function GET() {
  try {
    await connectToDatabase();

    const categories = await MenuCategory.find({}).sort({ createdAt: 1 });

    // If no categories exist in database, initialize with default data
    if (categories.length === 0) {
      await MenuCategory.insertMany(menuData);
      const initializedCategories = await MenuCategory.find({}).sort({ createdAt: 1 });
      return NextResponse.json(initializedCategories);
    }

    return NextResponse.json(categories);
  } catch (error) {
    console.error('Error fetching menu:', error);
    return NextResponse.json(
      { error: 'Failed to fetch menu data' },
      { status: 500 }
    );
  }
}

// POST /api/menu - Create a new menu category
export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const body = await request.json();
    const { id, name, nameRw, items } = body;

    // Check if category already exists
    const existingCategory = await MenuCategory.findOne({ id });
    if (existingCategory) {
      return NextResponse.json(
        { error: 'Category already exists' },
        { status: 400 }
      );
    }

    const newCategory = new MenuCategory({
      id,
      name,
      nameRw,
      items: items || [],
    });

    const savedCategory = await newCategory.save();
    return NextResponse.json(savedCategory, { status: 201 });
  } catch (error) {
    console.error('Error creating category:', error);
    return NextResponse.json(
      { error: 'Failed to create category' },
      { status: 500 }
    );
  }
}
