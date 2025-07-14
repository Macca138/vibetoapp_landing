import { NextResponse } from 'next/server';
import { MailerSend } from 'mailersend';

export async function GET() {
  try {
    if (!process.env.MAILERSEND_API_KEY) {
      return NextResponse.json({ 
        error: 'MAILERSEND_API_KEY not configured' 
      }, { status: 500 });
    }

    // Try to get account info/domains
    try {
      // This should work to test the API key
      const response = await fetch('https://api.mailersend.com/v1/domains', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${process.env.MAILERSEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return NextResponse.json({
          error: 'MailerSend API error',
          status: response.status,
          details: data,
          debug: {
            hasApiKey: true,
            apiKeyLength: process.env.MAILERSEND_API_KEY.length,
            apiKeyPrefix: process.env.MAILERSEND_API_KEY.substring(0, 6) + '...'
          }
        }, { status: 500 });
      }

      return NextResponse.json({
        success: true,
        domains: data.data || [],
        apiKeyStatus: 'Valid',
        debug: {
          hasApiKey: true,
          apiKeyLength: process.env.MAILERSEND_API_KEY.length,
          apiKeyPrefix: process.env.MAILERSEND_API_KEY.substring(0, 6) + '...',
          totalDomains: data.data?.length || 0
        }
      });

    } catch (fetchError) {
      return NextResponse.json({
        error: 'Failed to fetch domain status',
        details: fetchError instanceof Error ? fetchError.message : 'Unknown error',
        debug: {
          hasApiKey: true,
          apiKeyLength: process.env.MAILERSEND_API_KEY.length,
          apiKeyPrefix: process.env.MAILERSEND_API_KEY.substring(0, 6) + '...'
        }
      }, { status: 500 });
    }

  } catch (error) {
    return NextResponse.json({
      error: 'MailerSend initialization failed',
      details: error instanceof Error ? error.message : 'Unknown error',
      debug: {
        hasApiKey: !!process.env.MAILERSEND_API_KEY,
        apiKeyLength: process.env.MAILERSEND_API_KEY?.length,
        timestamp: new Date().toISOString()
      }
    }, { status: 500 });
  }
}