import express from 'express';
import { Resend } from 'resend';

const app = express();
const preferredPort = Number(process.env.PORT || 3001);

app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});

function sendJson(res, status, payload) {
  res.status(status).json(payload);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getResendApiKey() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error('Missing RESEND_API_KEY. Configure the environment variable before sending email.');
  }
  return apiKey;
}

function getResendClient() {
  return new Resend(getResendApiKey());
}

async function resendApiRequest(path, { method = 'GET', body } = {}) {
  const response = await fetch(`https://api.resend.com${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${getResendApiKey()}`,
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const rawText = await response.text();
  let data = null;
  if (rawText) {
    try {
      data = JSON.parse(rawText);
    } catch {
      data = { message: rawText };
    }
  }

  if (!response.ok) {
    throw new Error(data?.message || data?.error || `Resend request failed with status ${response.status}.`);
  }

  return data;
}

async function upsertNewsletterContact(email) {
  const payload = {
    unsubscribed: false,
    properties: {
      source: 'website_newsletter',
    },
  };

  try {
    await resendApiRequest(`/contacts/${encodeURIComponent(email)}`);
    const contact = await resendApiRequest(`/contacts/${encodeURIComponent(email)}`, {
      method: 'PATCH',
      body: payload,
    });
    return { action: 'updated', contact };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to save newsletter contact.';
    if (!/status 404/i.test(message) && !/not found/i.test(message)) {
      throw error;
    }

    const contact = await resendApiRequest('/contacts', {
      method: 'POST',
      body: {
        email,
        ...payload,
      },
    });
    return { action: 'created', contact };
  }
}

async function sendResendEmail(payload) {
  const resend = getResendClient();
  const { data, error } = await resend.emails.send(payload);
  if (error) {
    const message = error?.message || 'Email could not be sent.';
    throw new Error(message);
  }
  return data;
}

app.post('/api/contact', async (req, res) => {
  const { name, company, email, phone, inquiry, message } = req.body || {};

  if (!name || !company || !email || !message) {
    return sendJson(res, 400, { error: 'Required fields missing.' });
  }

  if (!isValidEmail(email)) {
    return sendJson(res, 400, { error: 'Invalid email address.' });
  }

  if (!process.env.RESEND_API_KEY) {
    return sendJson(res, 500, {
      error: 'Contact API is not configured. Missing RESEND_API_KEY.',
    });
  }

  try {
    const notifyTo = process.env.NOTIFY_EMAIL || 'info@aromaticsolutions.co.in';
    const year = new Date().getFullYear();

    await Promise.all([
      sendResendEmail({
        from: 'Aromatic Solutions <no-reply@aromaticsolutions.co.in>',
        to: [notifyTo],
        replyTo: email,
        subject: `New Enquiry: ${inquiry || 'General Support'} — ${company}`,
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1f2937;">
            <h2>New website enquiry</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Company:</strong> ${company}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
            <p><strong>Inquiry:</strong> ${inquiry || 'General Support'}</p>
            <p><strong>Message:</strong><br />${message}</p>
            <p style="margin-top: 16px; color: #6b7280;">Submitted on ${year}</p>
          </div>
        `,
      }),
      sendResendEmail({
        from: 'Aromatic Solutions <no-reply@aromaticsolutions.co.in>',
        to: [email],
        subject: "We've received your enquiry — Aromatic Solutions",
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1f2937;">
            <h2>Thank you for contacting us</h2>
            <p>We have received your enquiry and will get back to you shortly.</p>
          </div>
        `,
      }),
    ]);

    return sendJson(res, 200, { success: true });
  } catch (error) {
    console.error('Contact error:', error);
    return sendJson(res, 500, {
      error: error instanceof Error ? error.message : 'Failed to send your enquiry. Please try again.',
    });
  }
});

app.post('/api/subscribe', async (req, res) => {
  const { email } = req.body || {};

  if (!email || !isValidEmail(email)) {
    return sendJson(res, 400, { error: 'A valid email is required.' });
  }

  if (!process.env.RESEND_API_KEY) {
    return sendJson(res, 500, {
      error: 'Newsletter API is not configured. Missing RESEND_API_KEY.',
    });
  }

  try {
    const { action } = await upsertNewsletterContact(email);

    const promises = [
      sendResendEmail({
        from: 'Aromatic Solutions <newsletter@aromaticsolutions.co.in>',
        to: [email],
        subject: 'Welcome to The Aromatic Journal 🌿',
        html: '<div>Thank you for subscribing to The Aromatic Journal.</div>',
      }),
    ];

    if (process.env.NOTIFY_EMAIL) {
      promises.push(
        sendResendEmail({
          from: 'Aromatic Solutions <newsletter@aromaticsolutions.co.in>',
          to: [process.env.NOTIFY_EMAIL],
          subject: `New Newsletter Subscriber: ${email}`,
          html: `<p>New subscriber: <strong>${email}</strong></p>`,
        })
      );
    }

    await Promise.all(promises);
    return sendJson(res, 200, { success: true, contactAction: action });
  } catch (error) {
    console.error('Subscribe error:', error);
    return sendJson(res, 500, {
      error: error instanceof Error ? error.message : 'Failed to subscribe. Please try again.',
    });
  }
});

app.get('/health', (_req, res) => {
  res.json({ ok: true });
});

function listenOnPort(port) {
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  }).on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
      console.warn(`Port ${port} is busy, retrying on ${port + 1}...`);
      listenOnPort(port + 1);
      return;
    }

    console.error('Failed to start server:', error);
    process.exit(1);
  });
}

listenOnPort(preferredPort);
