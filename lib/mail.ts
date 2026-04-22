interface EmailPayload {
  fullName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  preferredContact: "email" | "phone";
}

export async function sendContactNotification(
  data: EmailPayload
): Promise<{ success: boolean; error?: string }> {
  const apiKey = process.env.ZEPTOMAIL_API_KEY;
  const fromEmail = process.env.ZEPTOMAIL_FROM_EMAIL;
  const toEmail = process.env.CONTACT_NOTIFICATION_EMAIL;

  if (!apiKey || !fromEmail || !toEmail) {
    console.error("ZeptoMail configuration missing");
    return { success: false, error: "Email configuration error" };
  }

  const htmlBody = `
    <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0A1628; color: #ffffff; padding: 40px;">
      <div style="border-bottom: 2px solid #C9A84C; padding-bottom: 20px; margin-bottom: 30px;">
        <h1 style="font-family: 'Playfair Display', Georgia, serif; color: #C9A84C; margin: 0; font-size: 24px;">
          New Contact Submission
        </h1>
        <p style="color: #94A3B8; margin: 5px 0 0;">Von Steiger &amp; Associates</p>
      </div>
      
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 12px 0; color: #C9A84C; font-weight: 600; width: 160px; vertical-align: top;">Full Name:</td>
          <td style="padding: 12px 0;">${data.fullName}</td>
        </tr>
        <tr>
          <td style="padding: 12px 0; color: #C9A84C; font-weight: 600; vertical-align: top;">Email:</td>
          <td style="padding: 12px 0;">${data.email}</td>
        </tr>
        <tr>
          <td style="padding: 12px 0; color: #C9A84C; font-weight: 600; vertical-align: top;">Phone:</td>
          <td style="padding: 12px 0;">${data.phone || "Not provided"}</td>
        </tr>
        <tr>
          <td style="padding: 12px 0; color: #C9A84C; font-weight: 600; vertical-align: top;">Subject:</td>
          <td style="padding: 12px 0;">${data.subject}</td>
        </tr>
        <tr>
          <td style="padding: 12px 0; color: #C9A84C; font-weight: 600; vertical-align: top;">Preferred Contact:</td>
          <td style="padding: 12px 0; text-transform: capitalize;">${data.preferredContact}</td>
        </tr>
        <tr>
          <td style="padding: 12px 0; color: #C9A84C; font-weight: 600; vertical-align: top;">Message:</td>
          <td style="padding: 12px 0;">${data.message}</td>
        </tr>
      </table>
      
      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.1); color: #94A3B8; font-size: 12px;">
        This email was sent from the Von Steiger &amp; Associates website contact form.
      </div>
    </div>
  `;

  try {
    const response = await fetch(
      "https://api.zeptomail.com/v1.1/email",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Zoho-enczapikey ${apiKey}`,
        },
        body: JSON.stringify({
          from: {
            address: fromEmail,
            name: "Von Steiger & Associates Website",
          },
          to: [
            {
              email_address: {
                address: toEmail,
                name: "Von Steiger & Associates",
              },
            },
          ],
          subject: `New Contact: ${data.subject} — ${data.fullName}`,
          htmlbody: htmlBody,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("ZeptoMail API error:", errorText);
      return { success: false, error: "Failed to send email notification" };
    }

    return { success: true };
  } catch (error) {
    console.error("Email sending error:", error);
    return { success: false, error: "Failed to send email notification" };
  }
}
