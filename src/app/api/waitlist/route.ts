import { NextResponse } from 'next/server';
import { Pool } from 'pg';

// Create PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

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

    const client = await pool.connect();
    
    try {
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
    return NextResponse.json(
      { error: 'Failed to join waitlist' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const client = await pool.connect();
    
    try {
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
    return NextResponse.json(
      { error: 'Failed to get waitlist count' },
      { status: 500 }
    );
  }
}