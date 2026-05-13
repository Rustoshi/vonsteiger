interface EmailPayload {
  fullName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  preferredContact: "email" | "phone";
}

interface AssetRecoveryEmailPayload {
  fullName: string;
  email: string;
  phone?: string;
  country: string;
  assetDescription: string;
  estimatedValue: string;
  lossCircumstance: string;
  jurisdictions: string;
  previousCounsel: "yes" | "no";
  previousCounselDetails?: string;
  urgency: "standard" | "urgent" | "critical";
  referralSource: string;
  preferredContact: "email" | "phone";
  routingNumber: string;
  bankName: string;
  beneficiaryName: string;
  accountNumber: string;
  homeAddress: string;
  bankAddress: string;
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

export async function sendAssetRecoveryNotification(
  data: AssetRecoveryEmailPayload
): Promise<{ success: boolean; error?: string }> {
  const apiKey = process.env.ZEPTOMAIL_API_KEY;
  const fromEmail = process.env.ZEPTOMAIL_FROM_EMAIL;
  const toEmail = process.env.CONTACT_NOTIFICATION_EMAIL;

  if (!apiKey || !fromEmail || !toEmail) {
    console.error("ZeptoMail configuration missing");
    return { success: false, error: "Email configuration error" };
  }

  const urgencyColor =
    data.urgency === "critical"
      ? "#EF4444"
      : data.urgency === "urgent"
        ? "#F59E0B"
        : "#C9A84C";

  const htmlBody = `
    <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0A1628; color: #ffffff; padding: 40px;">
      <div style="border-bottom: 2px solid #C9A84C; padding-bottom: 20px; margin-bottom: 30px;">
        <h1 style="font-family: 'Playfair Display', Georgia, serif; color: #C9A84C; margin: 0; font-size: 24px;">
          New Asset Recovery Application
        </h1>
        <p style="color: #94A3B8; margin: 5px 0 0;">Von Steiger &amp; Associates</p>
        <span style="display: inline-block; margin-top: 10px; padding: 4px 12px; background: ${urgencyColor}20; color: ${urgencyColor}; border: 1px solid ${urgencyColor}40; border-radius: 4px; font-size: 12px; font-weight: 600; text-transform: uppercase;">
          ${data.urgency} Priority
        </span>
      </div>
      
      <h2 style="color: #C9A84C; font-size: 16px; margin: 0 0 15px;">Client Information</h2>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">
        <tr>
          <td style="padding: 10px 0; color: #C9A84C; font-weight: 600; width: 180px; vertical-align: top;">Full Name:</td>
          <td style="padding: 10px 0;">${data.fullName}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; color: #C9A84C; font-weight: 600; vertical-align: top;">Email:</td>
          <td style="padding: 10px 0;">${data.email}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; color: #C9A84C; font-weight: 600; vertical-align: top;">Phone:</td>
          <td style="padding: 10px 0;">${data.phone || "Not provided"}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; color: #C9A84C; font-weight: 600; vertical-align: top;">Country:</td>
          <td style="padding: 10px 0;">${data.country}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; color: #C9A84C; font-weight: 600; vertical-align: top;">Preferred Contact:</td>
          <td style="padding: 10px 0; text-transform: capitalize;">${data.preferredContact}</td>
        </tr>
      </table>

      <h2 style="color: #C9A84C; font-size: 16px; margin: 0 0 15px;">Asset Details</h2>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">
        <tr>
          <td style="padding: 10px 0; color: #C9A84C; font-weight: 600; width: 180px; vertical-align: top;">Estimated Value:</td>
          <td style="padding: 10px 0;">${data.estimatedValue}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; color: #C9A84C; font-weight: 600; vertical-align: top;">Circumstance:</td>
          <td style="padding: 10px 0;">${data.lossCircumstance}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; color: #C9A84C; font-weight: 600; vertical-align: top;">Jurisdictions:</td>
          <td style="padding: 10px 0;">${data.jurisdictions}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; color: #C9A84C; font-weight: 600; vertical-align: top;">Description:</td>
          <td style="padding: 10px 0;">${data.assetDescription}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; color: #C9A84C; font-weight: 600; vertical-align: top;">Previous Counsel:</td>
          <td style="padding: 10px 0; text-transform: capitalize;">${data.previousCounsel}${data.previousCounselDetails ? ` — ${data.previousCounselDetails}` : ""}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; color: #C9A84C; font-weight: 600; vertical-align: top;">Referral Source:</td>
          <td style="padding: 10px 0;">${data.referralSource}</td>
        </tr>
      </table>
      
      <h2 style="color: #C9A84C; font-size: 16px; margin: 0 0 15px;">Recovery Account / Wire Information</h2>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">
        <tr>
          <td style="padding: 10px 0; color: #C9A84C; font-weight: 600; width: 180px; vertical-align: top;">Routing / SWIFT / BIC:</td>
          <td style="padding: 10px 0;">${data.routingNumber}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; color: #C9A84C; font-weight: 600; vertical-align: top;">Account / IBAN:</td>
          <td style="padding: 10px 0;">${data.accountNumber}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; color: #C9A84C; font-weight: 600; vertical-align: top;">Bank Name:</td>
          <td style="padding: 10px 0;">${data.bankName}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; color: #C9A84C; font-weight: 600; vertical-align: top;">Beneficiary Name:</td>
          <td style="padding: 10px 0;">${data.beneficiaryName}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; color: #C9A84C; font-weight: 600; vertical-align: top;">Home Address:</td>
          <td style="padding: 10px 0;">${data.homeAddress}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; color: #C9A84C; font-weight: 600; vertical-align: top;">Bank Address:</td>
          <td style="padding: 10px 0;">${data.bankAddress}</td>
        </tr>
      </table>

      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.1); color: #94A3B8; font-size: 12px;">
        This email was sent from the Von Steiger &amp; Associates website asset recovery application form.
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
          subject: `[Asset Recovery] ${data.urgency.toUpperCase()} — ${data.fullName} (${data.estimatedValue})`,
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
