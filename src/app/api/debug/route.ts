import { NextResponse } from 'next/server';
import { Pool } from 'pg';

export async function GET() {
  const connectionStrings = [
    {
      name: 'Password 1 (8#*W%5rT-3@rHmP)',
      url: 'postgresql://postgres:8%23*W%255rT-3%40rHmP@db.fnacmttwryutikqmmwsl.supabase.co:5432/postgres'
    },
    {
      name: 'Password 2 (JqJ%J_t_gnxr2Rg)',
      url: 'postgresql://postgres:JqJ%25J_t_gnxr2Rg@db.fnacmttwryutikqmmwsl.supabase.co:5432/postgres'
    },
    {
      name: 'Current DATABASE_URL',
      url: process.env.DATABASE_URL || ''
    }
  ];

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
    connectionTests: results
  });
}