import { NextResponse } from 'next/server';
import { promisify } from 'util';
import { lookup } from 'dns';

const dnsLookup = promisify(lookup);

export async function GET() {
  const hostnames = [
    'db.fnacmttwryutikqmmwsl.supabase.co',
    'aws-0-eu-west-1.pooler.supabase.com',
    'google.com' // Control test
  ];

  const results = [];

  for (const hostname of hostnames) {
    try {
      const result = await dnsLookup(hostname);
      results.push({
        hostname,
        status: 'RESOLVED',
        ip: result.address,
        family: result.family
      });
    } catch (error) {
      results.push({
        hostname,
        status: 'FAILED',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  return NextResponse.json({
    timestamp: new Date().toISOString(),
    dnsTests: results
  });
}