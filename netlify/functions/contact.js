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

  let fields;
  try {
    fields = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'Invalid JSON body.' }) };
  }

  const { name, company, email, phone, inquiry, message } = fields;

  if (!name || !company || !email || !message) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'Required fields missing.' }) };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'Invalid email address.' }) };
  }

  const year = new Date().getFullYear();
  const notifyTo = process.env.NOTIFY_EMAIL || 'info@aromaticsolutions.co.in';

  try {
    await Promise.all([
      // 1. Notify internal team with full enquiry details
      resend.emails.send({
        from: 'Aromatic Solutions <no-reply@aromaticsolutions.co.in>',
        to: notifyTo,
        replyTo: email,
        subject: `New Enquiry: ${inquiry} — ${company}`,
        html: `
          <!DOCTYPE html>
          <html lang="en">
          <head><meta charset="UTF-8" /></head>
          <body style="margin:0;padding:0;background:#f7f8f5;font-family:Inter,Arial,sans-serif;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#f7f8f5;padding:40px 16px;">
              <tr><td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.06);max-width:100%;">
                  <tr>
                    <td style="background:#1b4332;padding:28px 40px;">
                      <p style="margin:0 0 4px;color:#d4af37;font-size:11px;font-weight:600;letter-spacing:3px;text-transform:uppercase;">New Website Enquiry</p>
                      <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:700;">${inquiry}</h1>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:36px 40px;">
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;">
                            <p style="margin:0;color:#718096;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:1px;">Name</p>
                            <p style="margin:4px 0 0;color:#1a202c;font-size:15px;">${name}</p>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;">
                            <p style="margin:0;color:#718096;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:1px;">Company</p>
                            <p style="margin:4px 0 0;color:#1a202c;font-size:15px;">${company}</p>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;">
                            <p style="margin:0;color:#718096;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:1px;">Email</p>
                            <p style="margin:4px 0 0;"><a href="mailto:${email}" style="color:#1b4332;font-size:15px;">${email}</a></p>
                          </td>
                        </tr>
                        ${phone ? `
                        <tr>
                          <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;">
                            <p style="margin:0;color:#718096;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:1px;">Phone</p>
                            <p style="margin:4px 0 0;color:#1a202c;font-size:15px;">${phone}</p>
                          </td>
                        </tr>` : ''}
                        <tr>
                          <td style="padding:10px 0;">
                            <p style="margin:0;color:#718096;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:1px;">Message</p>
                            <p style="margin:8px 0 0;color:#2d3748;font-size:15px;line-height:1.7;white-space:pre-wrap;">${message}</p>
                          </td>
                        </tr>
                      </table>
                      <div style="margin-top:28px;">
                        <a href="mailto:${email}?subject=Re: ${encodeURIComponent(inquiry)}" style="display:inline-block;padding:12px 28px;background:#1b4332;color:#ffffff;font-weight:600;font-size:14px;border-radius:50px;text-decoration:none;">
                          Reply to ${name.split(' ')[0]} →
                        </a>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style="background:#f7f8f5;padding:20px 40px;border-top:1px solid #e8ede9;">
                      <p style="margin:0;color:#a0aec0;font-size:12px;text-align:center;">
                        Submitted via aromaticsolutions.co.in/contact · ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST
                      </p>
                    </td>
                  </tr>
                </table>
              </td></tr>
            </table>
          </body>
          </html>
        `,
      }),

      // 2. Send confirmation to the enquirer
      resend.emails.send({
        from: 'Aromatic Solutions <no-reply@aromaticsolutions.co.in>',
        to: email,
        subject: `We've received your enquiry — Aromatic Solutions`,
        html: `
          <!DOCTYPE html>
          <html lang="en">
          <head><meta charset="UTF-8" /></head>
          <body style="margin:0;padding:0;background:#fdfbf7;font-family:Inter,Arial,sans-serif;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#fdfbf7;padding:40px 16px;">
              <tr><td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.06);max-width:100%;">
                  <tr>
                    <td style="background:#1b4332;padding:32px 40px;text-align:center;">
                      <p style="margin:0 0 4px;color:#d4af37;font-size:11px;font-weight:600;letter-spacing:3px;text-transform:uppercase;">Aromatic Solutions</p>
                      <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:700;">Thank you, ${name.split(' ')[0]}! 🌿</h1>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:40px;">
                      <p style="margin:0 0 16px;color:#2d3748;font-size:16px;line-height:1.7;">
                        We've received your <strong>${inquiry}</strong> enquiry from <strong>${company}</strong> and will be in touch within <strong>24 business hours</strong>.
                      </p>
                      <p style="margin:0 0 24px;color:#4a5568;font-size:15px;line-height:1.7;">
                        In the meantime, explore our knowledge hub for formulation insights and sourcing stories.
                      </p>
                      <div style="text-align:center;margin:28px 0;">
                        <a href="https://www.aromaticsolutions.co.in/blog" style="display:inline-block;padding:14px 32px;background:#1b4332;color:#ffffff;font-weight:600;font-size:14px;border-radius:50px;text-decoration:none;">
                          Visit The Aromatic Journal →
                        </a>
                      </div>
                      <p style="margin:0;color:#718096;font-size:13px;line-height:1.6;">
                        If your enquiry is urgent, call us at <a href="tel:+918025561234" style="color:#1b4332;">+91 80 2556 1234</a> or reply to this email.
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style="background:#f7f8f5;padding:24px 40px;text-align:center;border-top:1px solid #e8ede9;">
                      <p style="margin:0;color:#a0aec0;font-size:12px;">
                        © ${year} Aromatic Solutions Pvt. Ltd. · Bangalore, India
                      </p>
                    </td>
                  </tr>
                </table>
              </td></tr>
            </table>
          </body>
          </html>
        `,
      }),
    ]);

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
      body: JSON.stringify({ error: 'Failed to send your enquiry. Please try again.' }),
    };
  }
};
