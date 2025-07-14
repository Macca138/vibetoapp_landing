import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    if (!process.env.MAILERSEND_API_KEY) {
      return NextResponse.json({ 
        error: 'MAILERSEND_API_KEY not configured' 
      }, { status: 500 });
    }

    // Direct API call to MailerSend
    const payload = {
      from: {
        email: 'waitlist@test-r9084zvd5rmgw63d.mlsender.net',
        name: 'VibeToApp Test'
      },
      to: [
        {
          email: email,
          name: 'Test User'
        }
      ],
      subject: '🧪 Direct API Test Email',
      html: `
        <html>
        <body style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>✅ Direct MailerSend API Test Successful!</h2>
          <p>This email was sent using direct API calls, not the MailerSend library.</p>
          <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
          <p><strong>Test recipient:</strong> ${email}</p>
        </body>
        </html>
      `,
      text: `
        ✅ Direct MailerSend API Test Successful!
        
        This email was sent using direct API calls, not the MailerSend library.
        
        Timestamp: ${new Date().toISOString()}
        Test recipient: ${email}
      `
    };

    const response = await fetch('https://api.mailersend.com/v1/email', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.MAILERSEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const responseData = await response.json();

    if (!response.ok) {
      console.error('MailerSend API error:', response.status, responseData);
      return NextResponse.json({
        error: 'MailerSend API error',
        status: response.status,
        details: responseData,
        debug: {
          hasApiKey: true,
          apiKeyLength: process.env.MAILERSEND_API_KEY.length,
          apiKeyPrefix: process.env.MAILERSEND_API_KEY.substring(0, 6) + '...',
          senderEmail: 'waitlist@test-r9084zvd5rmgw63d.mlsender.net',
          timestamp: new Date().toISOString()
        }
      }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: 'Direct API email sent successfully',
      messageId: responseData.message_id,
      debug: {
        hasApiKey: true,
        apiKeyLength: process.env.MAILERSEND_API_KEY.length,
        apiKeyPrefix: process.env.MAILERSEND_API_KEY.substring(0, 6) + '...',
        senderEmail: 'waitlist@test-r9084zvd5rmgw63d.mlsender.net',
        timestamp: new Date().toISOString(),
        recipient: email
      }
    });

  } catch (error) {
    console.error('Direct API test error:', error);
    
    return NextResponse.json({
      error: 'Failed to send direct API email',
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
    message: 'Direct MailerSend API test endpoint',
    usage: 'POST with { "email": "test@example.com" }',
    debug: {
      hasApiKey: !!process.env.MAILERSEND_API_KEY,
      apiKeyLength: process.env.MAILERSEND_API_KEY?.length,
      timestamp: new Date().toISOString()
    }
  });
}