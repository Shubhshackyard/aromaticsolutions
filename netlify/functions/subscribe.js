const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method Not Allowed' }) };
  }

  let email;
  try {
    ({ email } = JSON.parse(event.body));
  } catch {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'Invalid JSON body.' }) };
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'A valid email is required.' }) };
  }

  try {
    const promises = [];

    // 1. Add contact to Resend Audience (if Audience ID is configured)
    if (process.env.RESEND_AUDIENCE_ID) {
      promises.push(
        resend.contacts.create({
          email,
          audienceId: process.env.RESEND_AUDIENCE_ID,
          unsubscribed: false,
        })
      );
    }

    // 2. Send a welcome confirmation email to the subscriber
    promises.push(
      resend.emails.send({
        from: 'Aromatic Solutions <newsletter@aromaticsolutions.co.in>',
        to: email,
        subject: 'Welcome to The Aromatic Journal 🌿',
        html: `
          <!DOCTYPE html>
          <html lang="en">
          <head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /></head>
          <body style="margin:0;padding:0;background:#fdfbf7;font-family:Inter,Arial,sans-serif;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#fdfbf7;padding:40px 16px;">
              <tr><td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.06);max-width:100%;">
                  <!-- Header -->
                  <tr>
                    <td style="background:#1b4332;padding:32px 40px;text-align:center;">
                      <p style="margin:0 0 4px;color:#d4af37;font-size:11px;font-weight:600;letter-spacing:3px;text-transform:uppercase;">The Aromatic Journal</p>
                      <h1 style="margin:0;color:#ffffff;font-size:28px;font-weight:700;">Welcome, Botanical Explorer 🌿</h1>
                    </td>
                  </tr>
                  <!-- Body -->
                  <tr>
                    <td style="padding:40px;">
                      <p style="margin:0 0 16px;color:#2d3748;font-size:16px;line-height:1.7;">
                        Thank you for subscribing to <strong>The Aromatic Journal</strong> — the knowledge hub of Aromatic Solutions.
                      </p>
                      <p style="margin:0 0 16px;color:#4a5568;font-size:15px;line-height:1.7;">
                        You'll receive monthly deep-dives covering:
                      </p>
                      <ul style="margin:0 0 24px;padding-left:20px;color:#4a5568;font-size:15px;line-height:2;">
                        <li>🔬 Aromatherapy & terpene science</li>
                        <li>🌱 Sustainable sourcing stories</li>
                        <li>📈 Industry trends in natural cosmetics & fragrances</li>
                        <li>🧪 Formulation insights for professionals</li>
                      </ul>
                      <div style="text-align:center;margin:32px 0;">
                        <a href="https://www.aromaticsolutions.co.in/blog" style="display:inline-block;padding:14px 32px;background:#1b4332;color:#ffffff;font-weight:600;font-size:14px;border-radius:50px;text-decoration:none;">
                          Read Our Latest Articles →
                        </a>
                      </div>
                      <p style="margin:0;color:#718096;font-size:13px;line-height:1.6;">
                        Have a sourcing or formulation enquiry? Reply to this email or visit
                        <a href="https://www.aromaticsolutions.co.in/contact" style="color:#1b4332;">aromaticsolutions.co.in/contact</a>.
                      </p>
                    </td>
                  </tr>
                  <!-- Footer -->
                  <tr>
                    <td style="background:#f7f8f5;padding:24px 40px;text-align:center;border-top:1px solid #e8ede9;">
                      <p style="margin:0 0 8px;color:#a0aec0;font-size:12px;">
                        © ${new Date().getFullYear()} Aromatic Solutions Pvt. Ltd. · Bangalore, India
                      </p>
                      <p style="margin:0;color:#a0aec0;font-size:12px;">
                        You're receiving this because you subscribed at aromaticsolutions.co.in.
                        <br/>
                        <a href="{{unsubscribeUrl}}" style="color:#a0aec0;">Unsubscribe</a>
                      </p>
                    </td>
                  </tr>
                </table>
              </td></tr>
            </table>
          </body>
          </html>
        `,
      })
    );

    // 3. Notify internal team
    if (process.env.NOTIFY_EMAIL) {
      promises.push(
        resend.emails.send({
          from: 'Aromatic Solutions <newsletter@aromaticsolutions.co.in>',
          to: process.env.NOTIFY_EMAIL,
          subject: `New Newsletter Subscriber: ${email}`,
          html: `<p>New subscriber: <strong>${email}</strong></p>`,
        })
      );
    }

    await Promise.all(promises);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true }),
    };
  } catch (err) {
    console.error('Resend error:', err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to subscribe. Please try again.' }),
    };
  }
};
