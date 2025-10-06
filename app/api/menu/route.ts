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

    // Try to connect to database, but handle failures gracefully
    let categories = [];

    try {
      await connectToDatabase();
      categories = await MenuCategory.find({}).sort({ createdAt: 1 });

      // If no categories exist in database, return empty array (no auto-initialization)
      // Admin will need to add all content through the admin dashboard
    } catch (dbError) {
      console.error('Database connection failed:', dbError);
      return NextResponse.json(
        {
          error: 'Database connection failed. Please check your MongoDB Atlas connection string in .env.local',
          details: process.env.NODE_ENV === 'development' && dbError instanceof Error ? dbError.message : 'Contact administrator'
        },
        { status: 500 }
      );
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
    return NextResponse.json(
      {
        error: 'Failed to fetch menu data',
        details: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : 'Please try again later'
      },
      { status: 500 }
    );
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

    // Provide helpful error message for database connection issues
    if (error instanceof Error && error.message?.includes('MONGODB_URI')) {
      return NextResponse.json(
        {
          error: 'Database configuration error',
          details: 'Please check your MongoDB Atlas connection string in .env.local'
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        error: 'Failed to create category',
        details: process.env.NODE_ENV === 'development' ? error.message : 'Please try again later'
      },
      { status: 500 }
    );
  }
}
