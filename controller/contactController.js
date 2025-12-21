export const handleContactForm = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all fields.",
      });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address.",
      });
    }

    const SENDMAIL_URL = "https://mail-api-iuw1zw.fly.dev/sendMail";
    const ADMIN_EMAIL = "anubhavsinghcustomer@gmail.com";

    // Helper function to escape HTML
    function escapeHtml(str = "") {
      return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
    }

    // Create HTML template for user confirmation
    function createUserHtmlTemplate({ name, subject, message }) {
      const n = escapeHtml(name);
      const s = escapeHtml(subject);
      const m = escapeHtml(message).replace(/\n/g, "<br/>");
      return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width,initial-scale=1"/>
        <style>
          body{font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;background:#f4f4f7;margin:0;padding:20px}
          .container{max-width:600px;margin:0 auto;background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 4px 15px rgba(0,0,0,0.08)}
          .header{background:#f8f9fa;padding:30px;text-align:center}
          .content{padding:28px;color:#333;line-height:1.6}
          .message-box{background:#f1f3f5;border-left:4px solid #007bff;padding:14px;margin-top:18px}
          .footer{background:#e9ecef;padding:18px;text-align:center;color:#6c757d;font-size:12px}
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header"><h2>PhishShield</h2></div>
          <div class="content">
            <h3>We've Received Your Feedback!</h3>
            <p>Hi ${n},</p>
            <p>Thank you for reaching out — we received the following message from you:</p>
            <div class="message-box">
              <p><strong>Subject:</strong> ${s}</p>
              <p>${m}</p>
            </div>
            <p>Our team will review it and get back to you if needed.</p>
            <p>Best regards,<br/><strong>The PhishShield Team</strong></p>
          </div>
          <div class="footer">&copy; ${new Date().getFullYear()} PhishShield — Developer: Anubhav Singh</div>
        </div>
      </body>
      </html>
    `;
    }

    // Admin payload (HTML message)
    const adminPayload = {
      to: ADMIN_EMAIL,
      subject: `New contact form submission: ${subject}`,
      websiteName: "PhishShield",
      message: `
        <h2>New contact form submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
        <p><strong>Message:</strong><br/>${escapeHtml(message).replace(
          /\n/g,
          "<br/>"
        )}</p>
      `,
    };

    // Send admin notification
    const adminRes = await fetch(SENDMAIL_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(adminPayload),
    });

    let adminJson = null;
    try {
      adminJson = await adminRes.json();
    } catch (e) {
      /* ignore parse error */
    }

    if (!adminRes.ok || (adminJson && adminJson.success === false)) {
      console.error("Admin send failed:", adminRes.status, adminJson);
      return res.status(500).json({
        success: false,
        message: "Failed to send message to admin. Please try again later.",
      });
    }

    // Admin succeeded — send confirmation to user
    const userPayload = {
      to: email,
      subject: "We've Received Your Feedback | PhishShield",
      websiteName: "PhishShield",
      message: createUserHtmlTemplate({ name, subject, message }),
    };

    const userRes = await fetch(SENDMAIL_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userPayload),
    });

    let userJson = null;
    try {
      userJson = await userRes.json();
    } catch (e) {
      /* ignore parse error */
    }

    if (!userRes.ok || (userJson && userJson.success === false)) {
      console.warn("User confirmation send failed:", userRes.status, userJson);
      // Still succeed overall because admin already got the message
      return res.status(200).json({
        success: true,
        message:
          "Your message was sent to admin, but we couldn't send the confirmation email to you. Thank you!",
      });
    }

    // Everything ok
    return res.status(200).json({
      success: true,
      message:
        "Message sent successfully. A confirmation email has been sent to your address. Thank you!",
    });
  } catch (err) {
    console.error("Contact form error:", err);
    return res.status(500).json({
      success: false,
      message:
        "An error occurred while sending your message. Please try again later.",
    });
  }
};
