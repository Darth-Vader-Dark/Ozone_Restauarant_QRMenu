import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import MenuCategory from '@/lib/models/menu';
import { menuData } from '@/lib/menu-data';

// GET /api/menu - Fetch all menu categories
export async function GET(request: NextRequest) {
  try {
    // Check if this is a refresh request (to bypass any caching)
    const url = new URL(request.url);
    const isRefresh = url.searchParams.get('refresh');

    // Only skip during actual build time, not development
    if (process.env.NEXT_PHASE === 'phase-production-build') {
      return NextResponse.json({ message: 'Build time - no operations' });
    }

    // Try to connect to database, but don't fail if it's not available
    let categories = [];

    try {
      await connectToDatabase();
      categories = await MenuCategory.find({}).sort({ createdAt: 1 });

      // If no categories exist in database, return empty array (no auto-initialization)
      // Admin will need to add all content through the admin dashboard
    } catch (dbError) {
      console.warn('Database connection failed, returning empty menu:', dbError);
      // Return empty array if database is not available
      categories = [];
    }

    // Set cache control headers to prevent caching of dynamic content
    const headers = {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
    };

    return NextResponse.json(categories, { headers });
  } catch (error) {
    console.error('Error fetching menu:', error);
    // Return empty array on any error
    return NextResponse.json([], {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      }
    });
  }
}

// POST /api/menu - Create a new menu category
export async function POST(request: NextRequest) {
  try {
    // Only skip during actual build time, not development
    if (process.env.NEXT_PHASE === 'phase-production-build') {
      return NextResponse.json({ message: 'Build time - no operations' });
    }

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
