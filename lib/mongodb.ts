import mongoose from 'mongoose';

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache | undefined;
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase(): Promise<typeof mongoose> {
  // Get environment variables at runtime, not module load time
  const MONGODB_URI = process.env.MONGODB_URI;
  const DATABASE_NAME = process.env.DATABASE_NAME || 'restaurant_menu';

  if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
  }

  // During build time or when MongoDB URI is not available, skip connection
  if (process.env.NODE_ENV === 'production' && !process.env.MONGODB_URI) {
    console.warn('MongoDB connection skipped during production build or missing URI');
    return mongoose;
  }

  // Additional check for build-time scenarios
  if (process.env.NEXT_PHASE === 'phase-production-build' || process.env.BUILDING === 'true') {
    console.warn('MongoDB connection skipped during build phase');
    return mongoose;
  }

  if (cached!.conn) {
    return cached!.conn;
  }

  if (!cached!.promise) {
    const opts = {
      bufferCommands: false,
      dbName: DATABASE_NAME,
    };

    cached!.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached!.conn = await cached!.promise;
  } catch (e) {
    cached!.promise = null;
    throw e;
  }

  return cached!.conn;
}

export default connectToDatabase;
