import connectToDatabase from './lib/mongodb';
import MenuCategory from './lib/models/menu';

async function testConnection() {
  try {
    console.log('Testing MongoDB connection...');
    await connectToDatabase();
    console.log('✓ Database connected successfully');

    const count = await MenuCategory.countDocuments();
    console.log(`✓ Found ${count} categories in database`);

    process.exit(0);
  } catch (error) {
    console.error('✗ Database connection failed:', error);
    process.exit(1);
  }
}

testConnection();
