const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Owner Notification Email Template (Dark modern theme matching website)
 */
function getOwnerNotificationTemplate({ name, email, subject, message }) {
  const logoUrl = 'https://quadriadekunle.vercel.app/logo.png';
  const siteUrl = 'https://quadriadekunle.vercel.app';
  
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Portfolio Contact Message</title>
      <style>
        body {
          margin: 0;
          padding: 0;
          background-color: #030014;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          color: #ffffff;
          -webkit-font-smoothing: antialiased;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 40px 20px;
        }
        .card {
          background-color: #0a081d;
          border: 1px solid rgba(203, 172, 249, 0.2);
          border-radius: 16px;
          padding: 32px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
        }
        .header {
          display: flex;
          align-items: center;
          margin-bottom: 28px;
          padding-bottom: 20px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        .logo {
          height: 40px;
          width: auto;
        }
        .badge {
          display: inline-block;
          background: rgba(203, 172, 249, 0.15);
          color: #CBACF9;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          padding: 6px 12px;
          border-radius: 20px;
          margin-bottom: 16px;
        }
        h1 {
          font-size: 22px;
          font-weight: 700;
          margin: 0 0 8px 0;
          color: #ffffff;
        }
        p {
          font-size: 15px;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.7);
          margin: 0 0 16px 0;
        }
        .meta-box {
          background-color: rgba(255, 255, 255, 0.03);
          border-radius: 12px;
          padding: 20px;
          margin: 24px 0;
          border-left: 4px solid #CBACF9;
        }
        .meta-field {
          margin-bottom: 12px;
        }
        .meta-field:last-child {
          margin-bottom: 0;
        }
        .meta-label {
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: #CBACF9;
          font-weight: 700;
          margin-bottom: 4px;
        }
        .meta-value {
          font-size: 15px;
          color: #ffffff;
          font-weight: 500;
        }
        .message-box {
          background-color: rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          padding: 20px;
          margin-top: 16px;
          font-size: 15px;
          line-height: 1.6;
          color: #e4e4e7;
          white-space: pre-wrap;
        }
        .btn {
          display: inline-block;
          background-color: #CBACF9;
          color: #030014;
          font-weight: 700;
          font-size: 14px;
          padding: 14px 28px;
          border-radius: 8px;
          text-decoration: none;
          margin-top: 24px;
          transition: all 0.3s ease;
        }
        .footer {
          text-align: center;
          margin-top: 32px;
          font-size: 13px;
          color: rgba(255, 255, 255, 0.4);
        }
        .footer a {
          color: #CBACF9;
          text-decoration: none;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="card">
          <div class="header">
            <img src="${logoUrl}" alt="Quadri Adekunle Logo" class="logo" />
          </div>
          <span class="badge">New Inquiry</span>
          <h1>You received a new message</h1>
          <p>Someone reached out through the contact form on your portfolio website.</p>
          
          <div class="meta-box">
            <div class="meta-field">
              <div class="meta-label">Name</div>
              <div class="meta-value">${escapeHtml(name)}</div>
            </div>
            <div class="meta-field">
              <div class="meta-label">Email</div>
              <div class="meta-value"><a href="mailto:${escapeHtml(email)}" style="color:#CBACF9; text-decoration:none;">${escapeHtml(email)}</a></div>
            </div>
            <div class="meta-field">
              <div class="meta-label">Subject</div>
              <div class="meta-value">${escapeHtml(subject || 'General Inquiry')}</div>
            </div>
          </div>

          <div class="meta-label">Message Content</div>
          <div class="message-box">${escapeHtml(message)}</div>

          <a href="mailto:${escapeHtml(email)}?subject=Re: ${encodeURIComponent(subject || 'Inquiry')}" class="btn">
            Reply to ${escapeHtml(name)}
          </a>
        </div>

        <div class="footer">
          <p>© ${new Date().getFullYear()} Quadri Adekunle | <a href="${siteUrl}">${siteUrl}</a></p>
        </div>
      </div>
    </body>
    </html>
  `;
}

/**
 * Client Auto-Reply Email Template (Branded for Quadri Adekunle)
 */
function getClientAutoReplyTemplate({ name, subject, message }) {
  const logoUrl = 'https://quadriadekunle.vercel.app/logo.png';
  const siteUrl = 'https://quadriadekunle.vercel.app';
  
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Thank you for reaching out!</title>
      <style>
        body {
          margin: 0;
          padding: 0;
          background-color: #030014;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          color: #ffffff;
          -webkit-font-smoothing: antialiased;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 40px 20px;
        }
        .card {
          background-color: #0a081d;
          border: 1px solid rgba(203, 172, 249, 0.25);
          border-radius: 16px;
          padding: 36px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
        }
        .header {
          text-align: center;
          margin-bottom: 32px;
          padding-bottom: 24px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        .logo {
          height: 48px;
          width: auto;
          margin-bottom: 12px;
        }
        .subtitle {
          color: #CBACF9;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          margin: 0;
        }
        h1 {
          font-size: 24px;
          font-weight: 700;
          margin: 0 0 16px 0;
          color: #ffffff;
        }
        p {
          font-size: 15px;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.8);
          margin: 0 0 20px 0;
        }
        .highlight {
          color: #CBACF9;
          font-weight: 600;
        }
        .summary-box {
          background-color: rgba(255, 255, 255, 0.03);
          border: 1px dashed rgba(203, 172, 249, 0.3);
          border-radius: 12px;
          padding: 20px;
          margin: 24px 0;
        }
        .summary-title {
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #CBACF9;
          font-weight: 700;
          margin-bottom: 8px;
        }
        .summary-text {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.7);
          font-style: italic;
          line-height: 1.5;
          margin: 0;
        }
        .action-row {
          text-align: center;
          margin: 32px 0 16px 0;
        }
        .btn {
          display: inline-block;
          background: linear-gradient(135deg, #CBACF9 0%, #a777f7 100%);
          color: #030014;
          font-weight: 700;
          font-size: 15px;
          padding: 14px 32px;
          border-radius: 10px;
          text-decoration: none;
          box-shadow: 0 8px 20px rgba(203, 172, 249, 0.25);
        }
        .social-links {
          text-align: center;
          margin-top: 32px;
          padding-top: 24px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        .social-links a {
          color: #CBACF9;
          text-decoration: none;
          margin: 0 12px;
          font-size: 13px;
          font-weight: 600;
        }
        .footer {
          text-align: center;
          margin-top: 28px;
          font-size: 12px;
          color: rgba(255, 255, 255, 0.4);
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="card">
          <div class="header">
            <img src="${logoUrl}" alt="Quadri Adekunle Logo" class="logo" />
            <div class="subtitle">Quadri Adekunle • Full Stack Developer</div>
          </div>

          <h1>Hello ${escapeHtml(name)},</h1>
          <p>
            Thank you for reaching out! I have received your message regarding 
            <span class="highlight">"${escapeHtml(subject || 'your project inquiry')}"</span>.
          </p>
          <p>
            I appreciate you taking the time to connect. I will review your message carefully and get back to you within <strong>24 hours</strong>.
          </p>

          <div class="summary-box">
            <div class="summary-title">Summary of Your Message</div>
            <p class="summary-text">"${escapeHtml(message)}"</p>
          </div>

          <p>In the meantime, feel free to explore my latest projects or connect with me across social platforms.</p>

          <div class="action-row">
            <a href="${siteUrl}" class="btn">Explore Portfolio</a>
          </div>

          <div class="social-links">
            <a href="https://github.com/iam-donlarry" target="_blank">GitHub</a> • 
            <a href="https://linkedin.com/in/adekunle-quadri-920038213" target="_blank">LinkedIn</a> • 
            <a href="https://twitter.com/Coredrii" target="_blank">Twitter</a>
          </div>
        </div>

        <div class="footer">
          <p>© ${new Date().getFullYear()} Quadri Adekunle. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

module.exports = async function handler(req, res) {
  // CORS Preflight
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, subject, message } = req.body || {};

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required.' });
    }

    const fromEmail = process.env.RESEND_FROM_EMAIL || 'Portfolio Contact <onboarding@resend.dev>';
    const toOwnerEmail = process.env.CONTACT_NOTIFICATION_EMAIL || 'adekunlequadri3@gmail.com';

    // 1. Notification to Quadri (Owner)
    const ownerEmailPromise = resend.emails.send({
      from: fromEmail,
      to: toOwnerEmail,
      subject: `New Portfolio Message: ${subject || 'General Inquiry'} from ${name}`,
      replyTo: email,
      html: getOwnerNotificationTemplate({ name, email, subject, message }),
    });

    // 2. Auto-reply to Client/Visitor
    const clientAutoReplyPromise = resend.emails.send({
      from: fromEmail,
      to: email,
      subject: `Thank you for reaching out, ${name}! - Quadri Adekunle`,
      html: getClientAutoReplyTemplate({ name, subject, message }),
    });

    const [ownerResult, clientResult] = await Promise.allSettled([
      ownerEmailPromise,
      clientAutoReplyPromise,
    ]);

    if (ownerResult.status === 'rejected') {
      console.error('Failed to send owner notification:', ownerResult.reason);
      return res.status(500).json({
        error: ownerResult.reason?.message || 'Failed to send notification email.',
      });
    }

    if (clientResult.status === 'rejected') {
      console.warn('Failed to send client auto-reply:', clientResult.reason);
    }

    return res.status(200).json({
      success: true,
      message: 'Message sent successfully!',
    });
  } catch (error) {
    console.error('Contact API error:', error);
    return res.status(500).json({
      error: error.message || 'An unexpected error occurred.',
    });
  }
};
