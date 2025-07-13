import { NextResponse } from 'next/server';
import { Pool } from 'pg';

export async function GET() {
  // Let's also try some common Supabase hostname patterns
  const connectionStrings = [
    {
      name: 'Current DATABASE_URL (as-is)',
      url: process.env.DATABASE_URL || ''
    },
    {
      name: 'AWS hostname (alternative)',
      url: 'postgresql://postgres:8%23*W%255rT-3%40rHmP@aws-0-eu-west-1.pooler.supabase.com:5432/postgres'
    },
    {
      name: 'Original hostname - Password 1',
      url: 'postgresql://postgres:8%23*W%255rT-3%40rHmP@db.fnacmttwryutikqmmwsl.supabase.co:5432/postgres'
    },
    {
      name: 'Original hostname - Password 2',
      url: 'postgresql://postgres:JqJ%25J_t_gnxr2Rg@db.fnacmttwryutikqmmwsl.supabase.co:5432/postgres'
    }
  ];
  
  // Also try to parse the current DATABASE_URL to see what's in it
  let parsedUrl = null;
  if (process.env.DATABASE_URL) {
    try {
      const url = new URL(process.env.DATABASE_URL);
      parsedUrl = {
        protocol: url.protocol,
        hostname: url.hostname,
        port: url.port,
        pathname: url.pathname,
        username: url.username,
        password: url.password ? '***masked***' : 'none'
      };
    } catch (error) {
      parsedUrl = { error: 'Failed to parse URL', details: error instanceof Error ? error.message : 'Unknown' };
    }
  }

  const results = [];

  for (const conn of connectionStrings) {
    if (!conn.url) {
      results.push({
        name: conn.name,
        status: 'No URL provided',
        error: null
      });
      continue;
    }

    try {
      const pool = new Pool({
        connectionString: conn.url,
        ssl: { rejectUnauthorized: false },
        connectionTimeoutMillis: 5000
      });

      const client = await pool.connect();
      await client.query('SELECT 1');
      client.release();
      await pool.end();

      results.push({
        name: conn.name,
        status: 'SUCCESS - Connection works!',
        error: null
      });
    } catch (error) {
      results.push({
        name: conn.name,
        status: 'FAILED',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  return NextResponse.json({
    timestamp: new Date().toISOString(),
    environment: {
      databaseUrl: process.env.DATABASE_URL ? 'Present' : 'Missing',
      databaseUrlLength: process.env.DATABASE_URL?.length || 0,
      nodeEnv: process.env.NODE_ENV
    },
    parsedCurrentUrl: parsedUrl,
    connectionTests: results,
    recommendations: [
      '1. Check if Supabase project is paused (https://supabase.com/dashboard)',
      '2. Verify the hostname in your Supabase project settings',
      '3. Check if you need to use the pooler connection string',
      '4. Ensure the project is in the correct region'
    ]
  });
}