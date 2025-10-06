import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import MenuCategory from '@/lib/models/menu';

// Force this route to be treated as dynamic
export const dynamic = 'force-dynamic';

// PUT /api/menu/[id] - Update a specific menu category
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const categoryId = params.id;

    // Only skip during actual build time, not development
    if (process.env.NEXT_PHASE === 'phase-production-build') {
      return NextResponse.json({ message: 'Build time - no operations' });
    }

    await connectToDatabase();

    const body = await request.json();
    const { name, nameRw, items } = body;

    const updatedCategory = await MenuCategory.findOneAndUpdate(
      { id: categoryId },
      {
        ...(name && { name }),
        ...(nameRw && { nameRw }),
        ...(items && { items }),
      },
      { new: true, runValidators: true }
    );

    if (!updatedCategory) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedCategory);
  } catch (error) {
    console.error('Error updating category:', error);

    // Provide helpful error message for database connection issues
    if (error.message?.includes('MONGODB_URI')) {
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
        error: 'Failed to update category',
        details: process.env.NODE_ENV === 'development' ? error.message : 'Please try again later'
      },
      { status: 500 }
    );
  }
}

// DELETE /api/menu/[id] - Delete a specific menu category
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const categoryId = params.id;

    // Only skip during actual build time, not development
    if (process.env.NEXT_PHASE === 'phase-production-build') {
      return NextResponse.json({ message: 'Build time - no operations' });
    }

    await connectToDatabase();

    const deletedCategory = await MenuCategory.findOneAndDelete({ id: categoryId });

    if (!deletedCategory) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Error deleting category:', error);

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
        error: 'Failed to delete category',
        details: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : 'Please try again later'
      },
      { status: 500 }
    );
  }
}
