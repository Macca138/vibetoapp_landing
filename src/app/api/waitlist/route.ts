import { NextResponse } from 'next/server';

// Simple in-memory storage for demo - replace with database in production
const waitlistEntries: Array<{
  email: string;
  source?: string;
  referrer?: string;
  timestamp: string;
}> = [];

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

    // Check if email already exists
    const existing = waitlistEntries.find(entry => entry.email === email);
    if (existing) {
      return NextResponse.json(
        { error: 'This email is already on the waitlist' },
        { status: 400 }
      );
    }

    // Add to waitlist
    const entry = {
      email,
      source,
      referrer,
      timestamp: new Date().toISOString(),
    };
    
    waitlistEntries.push(entry);

    // Log the entry (in production, you'd save to database)
    console.log('New waitlist entry:', entry);

    return NextResponse.json({
      success: true,
      message: 'Successfully joined the waitlist',
      position: waitlistEntries.length,
    });
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
    const count = waitlistEntries.length;
    
    return NextResponse.json({
      count,
      message: `${count} people on the waitlist`,
    });
  } catch (error) {
    console.error('Waitlist count error:', error);
    return NextResponse.json(
      { error: 'Failed to get waitlist count' },
      { status: 500 }
    );
  }
}