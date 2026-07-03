import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Resend } from 'resend';
import {
  buildContactAutoReply,
  buildContactNotificationEmail,
  buildNewsletterNotificationEmail,
  buildNewsletterWelcomeEmail,
} from './emailTemplates.js';

const app = express();
const preferredPort = Number(process.env.PORT || 3001);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.join(__dirname, 'dist');

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

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error('Missing RESEND_API_KEY. Configure the environment variable before sending email.');
  }
  return new Resend(apiKey);
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
    const notificationEmail = buildContactNotificationEmail({
      name,
      company,
      email,
      phone,
      inquiry,
      message,
      year,
    });
    const autoReplyEmail = buildContactAutoReply({
      name,
      inquiry: inquiry || 'General Support',
    });

    await Promise.all([
      sendResendEmail({
        from: 'Aromatic Solutions <no-reply@aromaticsolutions.co.in>',
        to: [notifyTo],
        reply_to: email,
        subject: `New Enquiry: ${inquiry || 'General Support'} — ${company}`,
        html: notificationEmail.html,
        text: notificationEmail.text,
        headers: {
          'X-Entity-Ref-ID': 'contact-notification',
        },
      }),
      sendResendEmail({
        from: 'Aromatic Solutions <info@aromaticsolutions.co.in>',
        to: [email],
        subject: "We've received your enquiry — Aromatic Solutions",
        html: autoReplyEmail.html,
        text: autoReplyEmail.text,
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
    const welcomeEmail = buildNewsletterWelcomeEmail(email);
    const subscriberNotification = buildNewsletterNotificationEmail(email);
    const promises = [
      sendResendEmail({
        from: 'Aromatic Solutions <newsletter@aromaticsolutions.co.in>',
        to: [email],
        subject: 'Welcome to The Aromatic Journal',
        html: welcomeEmail.html,
        text: welcomeEmail.text,
        headers: welcomeEmail.headers,
      }),
    ];

    if (process.env.NOTIFY_EMAIL) {
      promises.push(
        sendResendEmail({
          from: 'Aromatic Solutions <newsletter@aromaticsolutions.co.in>',
          to: [process.env.NOTIFY_EMAIL],
          subject: `New Newsletter Subscriber: ${email}`,
          html: subscriberNotification.html,
          text: subscriberNotification.text,
        })
      );
    }

    await Promise.all(promises);
    return sendJson(res, 200, { success: true });
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

app.use(express.static(distPath));

app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api/')) {
    return next();
  }

  return res.sendFile(path.join(distPath, 'index.html'), (error) => {
    if (error) {
      next(error);
    }
  });
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
