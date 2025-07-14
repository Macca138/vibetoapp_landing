import { NextResponse } from 'next/server';
import { MailerSend, EmailParams, Sender, Recipient } from 'mailersend';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Check if API key is configured
    if (!process.env.MAILERSEND_API_KEY) {
      return NextResponse.json({ 
        error: 'MAILERSEND_API_KEY not configured',
        debug: {
          hasApiKey: false,
          envVars: Object.keys(process.env).filter(key => key.includes('MAILER')),
        }
      }, { status: 500 });
    }

    // Initialize MailerSend
    const mailerSend = new MailerSend({
      apiKey: process.env.MAILERSEND_API_KEY,
    });

    // Create test email
    const sentFrom = new Sender('waitlist@vibetoapp.com', 'VibeToApp Test');
    const recipients = [new Recipient(email, 'Test User')];

    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setSubject('🧪 MailerSend Test Email')
      .setHtml(`
        <html>
        <body style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>✅ MailerSend Test Successful!</h2>
          <p>This is a test email from your VibeToApp waitlist system.</p>
          <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
          <p><strong>API Key Status:</strong> Configured</p>
          <p><strong>Domain:</strong> vibetoapp.com</p>
          <hr>
          <p><small>If you received this email, your MailerSend integration is working correctly.</small></p>
        </body>
        </html>
      `)
      .setText(`
        ✅ MailerSend Test Successful!
        
        This is a test email from your VibeToApp waitlist system.
        
        Timestamp: ${new Date().toISOString()}
        API Key Status: Configured
        Domain: vibetoapp.com
        
        If you received this email, your MailerSend integration is working correctly.
      `);

    // Send the email
    const result = await mailerSend.email.send(emailParams);
    
    return NextResponse.json({
      success: true,
      message: 'Test email sent successfully',
      result: result,
      debug: {
        hasApiKey: true,
        apiKeyLength: process.env.MAILERSEND_API_KEY?.length,
        timestamp: new Date().toISOString(),
        recipient: email,
        sender: 'waitlist@vibetoapp.com'
      }
    });

  } catch (error) {
    console.error('MailerSend test error:', error);
    
    return NextResponse.json({
      error: 'Failed to send test email',
      details: error instanceof Error ? error.message : 'Unknown error',
      debug: {
        hasApiKey: !!process.env.MAILERSEND_API_KEY,
        apiKeyLength: process.env.MAILERSEND_API_KEY?.length,
        errorType: error instanceof Error ? error.constructor.name : 'Unknown',
        timestamp: new Date().toISOString()
      }
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'MailerSend test endpoint',
    usage: 'POST with { "email": "test@example.com" }',
    debug: {
      hasApiKey: !!process.env.MAILERSEND_API_KEY,
      apiKeyLength: process.env.MAILERSEND_API_KEY?.length,
      timestamp: new Date().toISOString()
    }
  });
}