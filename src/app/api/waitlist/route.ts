import { NextResponse } from 'next/server';
import { Pool } from 'pg';

// Create PostgreSQL connection with proper URL encoding
const pool = process.env.DATABASE_URL ? new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
}) : null;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, source, referrer } = body;

    // Basic email validation
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Check if database is configured
    if (!pool) {
      console.log('Database not configured, storing waitlist entry in console:', { email, source, referrer });
      return NextResponse.json({
        success: true,
        message: 'Successfully joined the waitlist',
        position: Math.floor(Math.random() * 100) + 1, // Random position for demo
        note: 'Database not configured - this is a demo response'
      });
    }

    const client = await pool.connect();
    
    try {
      // Create table if it doesn't exist
      await client.query(`
        CREATE TABLE IF NOT EXISTS waitlist (
          id SERIAL PRIMARY KEY,
          email VARCHAR(255) UNIQUE NOT NULL,
          source VARCHAR(100),
          referrer TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // Check if email already exists
      const existingResult = await client.query(
        'SELECT id FROM waitlist WHERE email = $1',
        [email]
      );

      if (existingResult.rows.length > 0) {
        return NextResponse.json(
          { error: 'This email is already on the waitlist' },
          { status: 400 }
        );
      }

      // Add to waitlist
      const insertResult = await client.query(
        'INSERT INTO waitlist (email, source, referrer) VALUES ($1, $2, $3) RETURNING id',
        [email, source, referrer]
      );

      // Get waitlist position
      const countResult = await client.query(
        'SELECT COUNT(*) as count FROM waitlist'
      );

      const position = parseInt(countResult.rows[0].count);

      console.log('New waitlist entry:', { email, source, referrer, position });

      return NextResponse.json({
        success: true,
        message: 'Successfully joined the waitlist',
        position,
        id: insertResult.rows[0].id,
      });

    } finally {
      client.release();
    }

  } catch (error) {
    console.error('Waitlist submission error:', error);
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      databaseUrl: process.env.DATABASE_URL ? 'Set' : 'Not set'
    });
    return NextResponse.json(
      { error: `Failed to join waitlist: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Check if database is configured
    if (!pool) {
      return NextResponse.json({
        count: Math.floor(Math.random() * 500) + 100, // Random count for demo
        message: 'Database not configured - demo response',
      });
    }

    const client = await pool.connect();
    
    try {
      // Create table if it doesn't exist
      await client.query(`
        CREATE TABLE IF NOT EXISTS waitlist (
          id SERIAL PRIMARY KEY,
          email VARCHAR(255) UNIQUE NOT NULL,
          source VARCHAR(100),
          referrer TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);

      const result = await client.query(
        'SELECT COUNT(*) as count FROM waitlist'
      );
      
      const count = parseInt(result.rows[0].count);
      
      return NextResponse.json({
        count,
        message: `${count} people on the waitlist`,
      });

    } finally {
      client.release();
    }

  } catch (error) {
    console.error('Waitlist count error:', error);
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      databaseUrl: process.env.DATABASE_URL ? 'Set' : 'Not set'
    });
    return NextResponse.json(
      { error: `Failed to get waitlist count: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    );
  }
}