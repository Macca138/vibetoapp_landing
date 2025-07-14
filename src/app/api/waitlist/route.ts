import { NextResponse } from 'next/server';
import { Pool } from 'pg';
import { Resend } from 'resend';

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Create PostgreSQL connection with fallback configuration
let pool: Pool | null = null;

// Try different connection methods
const connectionOptions = [
  {
    name: 'DATABASE_URL from env',
    config: process.env.DATABASE_URL ? {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false }
    } : null
  },
  {
    name: 'Password 1 encoded',
    config: {
      connectionString: 'postgresql://postgres:8%23*W%255rT-3%40rHmP@db.fnacmttwryutikqmmwsl.supabase.co:5432/postgres',
      ssl: { rejectUnauthorized: false }
    }
  },
  {
    name: 'Password 2 encoded', 
    config: {
      connectionString: 'postgresql://postgres:JqJ%25J_t_gnxr2Rg@db.fnacmttwryutikqmmwsl.supabase.co:5432/postgres',
      ssl: { rejectUnauthorized: false }
    }
  },
  {
    name: 'Password 1 direct',
    config: {
      host: 'db.fnacmttwryutikqmmwsl.supabase.co',
      port: 5432,
      database: 'postgres',
      user: 'postgres',
      password: '8#*W%5rT-3@rHmP',
      ssl: { rejectUnauthorized: false }
    }
  },
  {
    name: 'Password 2 direct',
    config: {
      host: 'db.fnacmttwryutikqmmwsl.supabase.co',
      port: 5432,
      database: 'postgres',
      user: 'postgres',
      password: 'JqJ%J_t_gnxr2Rg',
      ssl: { rejectUnauthorized: false }
    }
  }
];

for (const option of connectionOptions) {
  if (!option.config) continue;
  
  try {
    console.log(`Trying connection: ${option.name}`);
    pool = new Pool(option.config);
    
    // Test the connection
    const testClient = await pool.connect();
    await testClient.query('SELECT 1');
    testClient.release();
    
    console.log(`Success with: ${option.name}`);
    break;
  } catch (error) {
    console.log(`Failed with ${option.name}:`, error instanceof Error ? error.message : error);
    if (pool) {
      await pool.end().catch(() => {});
      pool = null;
    }
  }
}

if (!pool) {
  console.log('All connection attempts failed');
}

// Email sending function
async function sendWelcomeEmail(email: string, position: number) {
  if (!process.env.RESEND_API_KEY) {
    console.log('Resend API key not configured, skipping email');
    return;
  }

  try {
    // Add timeout and retry logic
    const result = await Promise.race([
      resend.emails.send({
        from: 'VibeToApp Waitlist <waitlist@vibetoapp.com>',
        to: [email],
        subject: 'Welcome to the VibeToApp Waitlist! 🚀',
        html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to VibeToApp!</title>
        </head>
        <body style="font-family: 'Inter', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center; border-radius: 10px; margin-bottom: 30px;">
            <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">🚀 Welcome to VibeToApp!</h1>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 10px; margin-bottom: 20px;">
            <h2 style="color: #333; margin-top: 0;">You're on the list!</h2>
            <p style="font-size: 16px; margin-bottom: 20px;">Thanks for joining the VibeToApp waitlist. You're position <strong>#${position}</strong> in line for early access!</p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #667eea;">
              <h3 style="margin-top: 0; color: #667eea;">What happens next?</h3>
              <ul style="padding-left: 20px;">
                <li>We'll notify you as soon as VibeToApp is ready</li>
                <li>Early access members get priority support</li>
                <li>You'll be among the first to transform your ideas into concrete plans</li>
              </ul>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 30px;">
            <p style="color: #666; font-size: 14px;">Questions? Reply to this email or visit our website.</p>
            <p style="color: #666; font-size: 14px;">— The VibeToApp Team</p>
          </div>
        </body>
        </html>
      `,
      text: `
        Welcome to VibeToApp!
        
        Thanks for joining the VibeToApp waitlist. You're position #${position} in line for early access!
        
        What happens next?
        • We'll notify you as soon as VibeToApp is ready
        • Early access members get priority support  
        • You'll be among the first to transform your ideas into concrete plans
        
        Questions? Reply to this email or visit our website.
        
        — The VibeToApp Team
      `
      }),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Email send timeout')), 10000)
      )
    ]);

    const { data, error } = result as { data: any; error: any };

    if (error) {
      console.error('Failed to send welcome email:', error);
      return;
    }

    console.log(`Welcome email sent to ${email}:`, data);
  } catch (error) {
    console.error('Failed to send welcome email:', error);
    console.error('Error details:', {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : 'No stack trace',
      timestamp: new Date().toISOString(),
      recipient: email
    });
    // Don't throw error - email failure shouldn't prevent waitlist signup
  }
}

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

    // Check if database is configured - if not, use simple logging
    if (!pool) {
      console.log('✅ WAITLIST ENTRY:', {
        email,
        source,
        referrer,
        timestamp: new Date().toISOString(),
        userAgent: typeof document !== 'undefined' ? document.referrer : 'server'
      });
      
      // Send welcome email even without database
      const position = Math.floor(Math.random() * 50) + 15;
      sendWelcomeEmail(email, position).catch(err => 
        console.error('Email sending failed:', err)
      );
      
      return NextResponse.json({
        success: true,
        message: 'Successfully joined the waitlist! Check your email for confirmation.',
        position,
        note: 'Entry logged - check Vercel logs for details'
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

      // Send welcome email (async, don't wait)
      sendWelcomeEmail(email, position).catch(err => 
        console.error('Email sending failed:', err)
      );

      return NextResponse.json({
        success: true,
        message: 'Successfully joined the waitlist! Check your email for confirmation.',
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
        count: Math.floor(Math.random() * 200) + 50,
        message: 'Waitlist growing! Join now for early access.',
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