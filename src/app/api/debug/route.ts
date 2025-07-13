import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    databaseUrl: process.env.DATABASE_URL ? 'Present' : 'Missing',
    databaseUrlLength: process.env.DATABASE_URL?.length || 0,
    databaseUrlStart: process.env.DATABASE_URL?.substring(0, 30) || 'N/A',
    nodeEnv: process.env.NODE_ENV,
    allEnvKeys: Object.keys(process.env).filter(key => 
      key.toLowerCase().includes('database') || 
      key.toLowerCase().includes('postgres') ||
      key.toLowerCase().includes('supabase')
    )
  });
}