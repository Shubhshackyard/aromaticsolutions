const BRAND = {
  name: 'Aromatic Solutions',
  tagline: 'Crafting nature into fragrance',
  website: 'https://aromaticsolutions.co.in',
  journal: 'https://aromaticsolutions.co.in/blog',
  supportEmail: 'newsletter@aromaticsolutions.co.in',
  city: 'Kannauj, India',
};

const COLORS = {
  background: '#FAF8F4',
  card: '#FFFFFF',
  text: '#1B1B1B',
  muted: '#6A6A6A',
  accent: '#214B3E',
  accentHover: '#17372D',
  gold: '#A67C32',
  divider: '#ECE7DF',
  footer: '#F5F2EC',
};

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatRecipientName(email) {
  const localPart = String(email ?? '').split('@')[0] || '';
  const primary = localPart.split(/[._+-]/)[0] || '';
  const stripped = primary.replace(/\d+/g, '').trim();
  if (!stripped) {
    return 'there';
  }

  return stripped
    .split(/[^a-zA-Z]+/)
    .filter(Boolean)
    .map((chunk) => chunk.charAt(0).toUpperCase() + chunk.slice(1).toLowerCase())
    .join(' ') || 'there';
}

function renderButton({ href, label }) {
  if (!href || !label) {
    return '';
  }

  return `
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin: 28px 0 0;">
      <tr>
        <td>
          <a
            href="${escapeHtml(href)}"
            style="display:inline-block;background:${COLORS.accent};color:#ffffff;text-decoration:none;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1;padding:15px 24px;border-radius:999px;font-weight:600;"
          >
            ${escapeHtml(label)}
          </a>
        </td>
      </tr>
    </table>
  `;
}

function renderBulletList(items) {
  if (!items?.length) {
    return '';
  }

  return `
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="width:100%;margin-top:24px;">
      ${items
        .map(
          (item) => `
            <tr>
              <td style="padding:0 0 14px;vertical-align:top;width:22px;color:${COLORS.gold};font-size:20px;line-height:1;">&bull;</td>
              <td style="padding:0 0 14px;color:${COLORS.text};font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.7;">${escapeHtml(item)}</td>
            </tr>
          `
        )
        .join('')}
    </table>
  `;
}

function renderDetailTable(items) {
  if (!items?.length) {
    return '';
  }

  return `
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="width:100%;margin-top:24px;border-top:1px solid ${COLORS.divider};">
      ${items
        .map(
          (item) => `
            <tr>
              <td style="width:165px;padding:14px 0;border-bottom:1px solid ${COLORS.divider};font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.5;color:${COLORS.muted};text-transform:uppercase;letter-spacing:0.08em;">${escapeHtml(item.label)}</td>
              <td style="padding:14px 0;border-bottom:1px solid ${COLORS.divider};font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.7;color:${COLORS.text};word-break:break-word;">${escapeHtml(item.value)}</td>
            </tr>
          `
        )
        .join('')}
    </table>
  `;
}

function buildEmailShell({
  preheader,
  recipientName,
  title,
  intro,
  bodyHtml = '',
  sections = [],
  button,
  closing,
  footerNote,
  manageUrl,
  extraLinks = [],
}) {
  const recipient = recipientName || 'there';
  const managementLinks = [];

  if (manageUrl) {
    managementLinks.push(`<a href="${escapeHtml(manageUrl)}" style="color:${COLORS.accent};text-decoration:none;">Manage subscription</a>`);
  }

  for (const link of extraLinks) {
    if (link?.href && link?.label) {
      managementLinks.push(
        `<a href="${escapeHtml(link.href)}" style="color:${COLORS.accent};text-decoration:none;">${escapeHtml(link.label)}</a>`
      );
    }
  }

  return `<!doctype html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="x-apple-disable-message-reformatting" />
      <title>${escapeHtml(title)}</title>
    </head>
    <body style="margin:0;padding:0;background:${COLORS.background};">
      <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;mso-hide:all;">
        ${escapeHtml(preheader)}
      </div>
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:${COLORS.background};width:100%;padding:32px 16px;">
        <tr>
          <td align="center">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="width:100%;max-width:600px;">
              <tr>
                <td style="padding:0 0 16px;text-align:center;font-family:Arial,Helvetica,sans-serif;">
                  <div style="font-size:18px;line-height:1.2;font-weight:700;letter-spacing:0.04em;color:${COLORS.text};">${escapeHtml(BRAND.name)}</div>
                  <div style="margin-top:6px;font-size:12px;line-height:1.4;color:${COLORS.muted};letter-spacing:0.02em;">${escapeHtml(BRAND.tagline)}</div>
                </td>
              </tr>
              <tr>
                <td style="border-top:1px solid ${COLORS.divider};font-size:0;line-height:0;">&nbsp;</td>
              </tr>
              <tr>
                <td style="padding:20px 0 0;">
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:${COLORS.card};border:1px solid ${COLORS.divider};border-radius:24px;overflow:hidden;">
                    <tr>
                      <td style="padding:40px 40px 32px;font-family:Arial,Helvetica,sans-serif;color:${COLORS.text};">
                        <div style="font-size:14px;line-height:1.4;color:${COLORS.muted};text-transform:uppercase;letter-spacing:0.12em;">Aromatic Solutions</div>
                        <h1 style="margin:10px 0 0;font-size:32px;line-height:1.2;font-weight:700;letter-spacing:-0.02em;color:${COLORS.text};">${escapeHtml(title)}</h1>
                        <p style="margin:18px 0 0;font-size:16px;line-height:1.75;color:${COLORS.text};">Hello ${escapeHtml(recipient)},</p>
                        ${intro ? `<p style="margin:16px 0 0;font-size:16px;line-height:1.75;color:${COLORS.text};">${escapeHtml(intro)}</p>` : ''}
                        ${bodyHtml}
                        ${sections
                          .map(
                            (section) => `
                              <div style="margin-top:28px;">
                                <div style="font-size:22px;line-height:1.3;font-weight:600;color:${COLORS.text};">${escapeHtml(section.heading)}</div>
                                ${section.copy ? `<p style="margin:12px 0 0;font-size:16px;line-height:1.75;color:${COLORS.text};">${escapeHtml(section.copy)}</p>` : ''}
                                ${section.bullets ? renderBulletList(section.bullets) : ''}
                                ${section.detailRows ? renderDetailTable(section.detailRows) : ''}
                              </div>
                            `
                          )
                          .join('')}
                        ${button ? renderButton(button) : ''}
                        ${closing ? `<p style="margin:28px 0 0;font-size:16px;line-height:1.75;color:${COLORS.text};">${escapeHtml(closing)}</p>` : ''}
                        ${footerNote ? `<p style="margin:18px 0 0;font-size:13px;line-height:1.7;color:${COLORS.muted};">${escapeHtml(footerNote)}</p>` : ''}
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td style="padding:18px 0 0;">
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:${COLORS.footer};border:1px solid ${COLORS.divider};border-radius:20px;">
                    <tr>
                      <td style="padding:20px 24px;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.8;color:${COLORS.muted};text-align:center;">
                        <div style="font-weight:600;color:${COLORS.text};">${escapeHtml(BRAND.name)}</div>
                        <div>${escapeHtml(BRAND.city)}</div>
                        <div><a href="${escapeHtml(BRAND.website)}" style="color:${COLORS.accent};text-decoration:none;">${escapeHtml(BRAND.website)}</a></div>
                        ${managementLinks.length ? `<div style="margin-top:8px;">${managementLinks.join(' <span style="color:${COLORS.divider};">|</span> ')}</div>` : ''}
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>`;
}

function buildPlainText({ title, recipientName, intro, sections = [], closing, footerNote, ctaLabel, ctaUrl, manageUrl }) {
  const lines = [
    `Aromatic Solutions`,
    ``,
    `${title}`,
    ``,
    `Hello ${recipientName || 'there'},`,
  ];

  if (intro) {
    lines.push(``, intro);
  }

  for (const section of sections) {
    lines.push(``, section.heading);
    if (section.copy) {
      lines.push(section.copy);
    }
    if (section.bullets?.length) {
      for (const bullet of section.bullets) {
        lines.push(`- ${bullet}`);
      }
    }
    if (section.detailRows?.length) {
      for (const row of section.detailRows) {
        lines.push(`${row.label}: ${row.value}`);
      }
    }
  }

  if (ctaLabel && ctaUrl) {
    lines.push(``, `${ctaLabel}: ${ctaUrl}`);
  }

  if (closing) {
    lines.push(``, closing);
  }

  if (footerNote) {
    lines.push(``, footerNote);
  }

  lines.push(
    ``,
    `Aromatic Solutions`,
    `Kannauj, India`,
    BRAND.website,
  );

  if (manageUrl) {
    lines.push(`Manage subscription: ${manageUrl}`);
  }

  return lines.join('\n');
}

export function buildNewsletterWelcomeEmail(email) {
  const recipientName = formatRecipientName(email);
  const manageUrl = `mailto:${BRAND.supportEmail}?subject=${encodeURIComponent('Manage my subscription')}`;

  const html = buildEmailShell({
    preheader: 'Welcome to The Aromatic Journal. Discover new stories, craft notes, and seasonal releases.',
    recipientName,
    title: 'Welcome to The Aromatic Journal',
    intro: 'Thank you for joining our journal. We will send considered notes on fragrance craft, new launches, and the quieter details that shape the world of aromatic ingredients.',
    sections: [
      {
        heading: 'What to expect',
        bullets: [
          'Elegant stories from our world of essential oils, attars, and botanical ingredients.',
          'Occasional release notes, seasonal highlights, and thoughtful product updates.',
          'Minimal volume, carefully edited, and always easy to leave if your inbox changes.',
        ],
      },
      {
        heading: 'Start reading',
        copy: 'Our latest journal entries are available online whenever you want to browse deeper.',
      },
    ],
    button: {
      href: BRAND.journal,
      label: 'Read the Journal',
    },
    closing: 'If you ever want to adjust what you receive, use the subscription link below or simply reply to this email.',
    footerNote: 'We respect your inbox and keep our messages calm, useful, and infrequent.',
    manageUrl,
    extraLinks: [
      {
        href: BRAND.journal,
        label: 'Visit Journal',
      },
    ],
  });

  const text = buildPlainText({
    title: 'Welcome to The Aromatic Journal',
    recipientName,
    intro: 'Thank you for joining our journal. We will send considered notes on fragrance craft, new launches, and the quieter details that shape the world of aromatic ingredients.',
    sections: [
      {
        heading: 'What to expect',
        bullets: [
          'Elegant stories from our world of essential oils, attars, and botanical ingredients.',
          'Occasional release notes, seasonal highlights, and thoughtful product updates.',
          'Minimal volume, carefully edited, and always easy to leave if your inbox changes.',
        ],
      },
      {
        heading: 'Start reading',
        copy: 'Our latest journal entries are available online whenever you want to browse deeper.',
      },
    ],
    closing: 'If you ever want to adjust what you receive, use the subscription link below or simply reply to this email.',
    footerNote: 'We respect your inbox and keep our messages calm, useful, and infrequent.',
    ctaLabel: 'Read the Journal',
    ctaUrl: BRAND.journal,
    manageUrl,
  });

  return {
    html,
    text,
    headers: {
      'List-Unsubscribe': `<${manageUrl}>`,
      'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
      'Precedence': 'bulk',
    },
  };
}

export function buildNewsletterNotificationEmail(email) {
  const html = buildEmailShell({
    preheader: 'A new subscriber joined The Aromatic Journal.',
    recipientName: 'team',
    title: 'New Newsletter Subscriber',
    intro: 'A new reader signed up for The Aromatic Journal.',
    sections: [
      {
        heading: 'Subscriber details',
        detailRows: [
          { label: 'Email address', value: email },
          { label: 'Source', value: 'Website newsletter form' },
        ],
      },
    ],
    footerNote: 'This notification keeps the team aligned without exposing any sensitive content.',
  });

  const text = buildPlainText({
    title: 'New Newsletter Subscriber',
    recipientName: 'team',
    intro: 'A new reader signed up for The Aromatic Journal.',
    sections: [
      {
        heading: 'Subscriber details',
        detailRows: [
          { label: 'Email address', value: email },
          { label: 'Source', value: 'Website newsletter form' },
        ],
      },
    ],
  });

  return { html, text };
}

export function buildContactAutoReply({ name, inquiry }) {
  const html = buildEmailShell({
    preheader: 'We received your enquiry and will respond within one business day.',
    recipientName: name,
    title: 'We have received your enquiry',
    intro: 'Thank you for reaching out to Aromatic Solutions. We have received your message and a member of our team will review it carefully.',
    sections: [
      {
        heading: 'What happens next',
        bullets: [
          'We will review your inquiry and reply as soon as possible.',
          'If your request is urgent, reply directly to this email so we can prioritize it.',
          'For wholesale or formulation work, we will route your message to the most relevant specialist.',
        ],
      },
    ],
    closing: inquiry ? `We noted your inquiry as ${inquiry}.` : '',
    footerNote: 'We aim to respond within 1 business day.',
  });

  const text = buildPlainText({
    title: 'We have received your enquiry',
    recipientName: name,
    intro: 'Thank you for reaching out to Aromatic Solutions. We have received your message and a member of our team will review it carefully.',
    sections: [
      {
        heading: 'What happens next',
        bullets: [
          'We will review your inquiry and reply as soon as possible.',
          'If your request is urgent, reply directly to this email so we can prioritize it.',
          'For wholesale or formulation work, we will route your message to the most relevant specialist.',
        ],
      },
    ],
    closing: inquiry ? `We noted your inquiry as ${inquiry}.` : '',
    footerNote: 'We aim to respond within 1 business day.',
  });

  return { html, text };
}

export function buildContactNotificationEmail({ name, company, email, phone, inquiry, message, year }) {
  const html = buildEmailShell({
    preheader: `New website enquiry from ${name}.`,
    recipientName: 'team',
    title: 'New Website Enquiry',
    intro: 'A new enquiry was submitted through the website.',
    sections: [
      {
        heading: 'Enquiry details',
        detailRows: [
          { label: 'Name', value: name },
          { label: 'Company', value: company },
          { label: 'Email', value: email },
          ...(phone ? [{ label: 'Phone', value: phone }] : []),
          { label: 'Inquiry', value: inquiry || 'General Support' },
          { label: 'Message', value: message },
        ],
      },
    ],
    footerNote: `Submitted in ${year}. Reply directly to the sender to continue the conversation.`,
  });

  const text = buildPlainText({
    title: 'New Website Enquiry',
    recipientName: 'team',
    intro: 'A new enquiry was submitted through the website.',
    sections: [
      {
        heading: 'Enquiry details',
        detailRows: [
          { label: 'Name', value: name },
          { label: 'Company', value: company },
          { label: 'Email', value: email },
          ...(phone ? [{ label: 'Phone', value: phone }] : []),
          { label: 'Inquiry', value: inquiry || 'General Support' },
          { label: 'Message', value: message },
        ],
      },
    ],
    footerNote: `Submitted in ${year}. Reply directly to the sender to continue the conversation.`,
  });

  return { html, text };
}
