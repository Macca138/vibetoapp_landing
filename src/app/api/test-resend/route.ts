import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ 
        error: 'RESEND_API_KEY not configured',
        debug: {
          hasApiKey: false,
          envVars: Object.keys(process.env).filter(key => key.includes('RESEND')),
        }
      }, { status: 500 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const { data, error } = await resend.emails.send({
      from: 'VibeToApp Test <waitlist@vibetoapp.com>',
      to: [email],
      subject: '🧪 Resend Test Email',
      html: `
        <html>
        <body style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>✅ Resend Test Successful!</h2>
          <p>This is a test email from your VibeToApp waitlist system using Resend.</p>
          <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
          <p><strong>API Key Status:</strong> Configured</p>
          <p><strong>From:</strong> waitlist@vibetoapp.com</p>
          <hr>
          <p><small>If you received this email, your Resend integration is working correctly.</small></p>
        </body>
        </html>
      `,
      text: `
        ✅ Resend Test Successful!
        
        This is a test email from your VibeToApp waitlist system using Resend.
        
        Timestamp: ${new Date().toISOString()}
        API Key Status: Configured
        From: waitlist@vibetoapp.com
        
        If you received this email, your Resend integration is working correctly.
      `
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({
        error: 'Failed to send test email',
        details: error.message,
        debug: {
          hasApiKey: true,
          apiKeyLength: process.env.RESEND_API_KEY?.length,
          apiKeyPrefix: process.env.RESEND_API_KEY?.substring(0, 8) + '...',
          timestamp: new Date().toISOString(),
          recipient: email,
          sender: 'waitlist@vibetoapp.com',
          errorType: error.name || 'ResendError'
        }
      }, { status: 500 });
    }
    
    return NextResponse.json({
      success: true,
      message: 'Test email sent successfully',
      messageId: data?.id,
      debug: {
        hasApiKey: true,
        apiKeyLength: process.env.RESEND_API_KEY?.length,
        apiKeyPrefix: process.env.RESEND_API_KEY?.substring(0, 8) + '...',
        timestamp: new Date().toISOString(),
        recipient: email,
        sender: 'waitlist@vibetoapp.com'
      }
    });

  } catch (error) {
    console.error('Resend test error:', error);
    
    return NextResponse.json({
      error: 'Failed to send test email',
      details: error instanceof Error ? error.message : 'Unknown error',
      debug: {
        hasApiKey: !!process.env.RESEND_API_KEY,
        apiKeyLength: process.env.RESEND_API_KEY?.length,
        errorType: error instanceof Error ? error.constructor.name : 'Unknown',
        timestamp: new Date().toISOString()
      }
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Resend test endpoint',
    usage: 'POST with { "email": "test@example.com" }',
    debug: {
      hasApiKey: !!process.env.RESEND_API_KEY,
      apiKeyLength: process.env.RESEND_API_KEY?.length,
      timestamp: new Date().toISOString()
    }
  });
}