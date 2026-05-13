import { z } from "zod";

export const contactFormSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name must be less than 100 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  subject: z.enum(
    ["Asset Recovery", "Corporate Litigation", "Consultation", "Other"],
    {
      message: "Please select a subject",
    }
  ),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(5000, "Message must be less than 5000 characters"),
  preferredContact: z.enum(["email", "phone"], {
    message: "Please select a preferred contact method",
  }),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export const assetRecoveryFormSchema = z
  .object({
    fullName: z
      .string()
      .min(2, "Full name must be at least 2 characters")
      .max(100, "Full name must be less than 100 characters"),
    email: z.string().email("Please enter a valid email address"),
    phone: z.string().optional(),
    country: z
      .string()
      .min(2, "Please enter your country of residence"),
    assetDescription: z
      .string()
      .min(20, "Please provide at least 20 characters describing the assets")
      .max(5000, "Description must be less than 5000 characters"),
    estimatedValue: z.enum(
      [
        "Under €100,000",
        "€100,000 – €500,000",
        "€500,000 – €1,000,000",
        "€1,000,000 – €5,000,000",
        "€5,000,000 – €25,000,000",
        "Over €25,000,000",
      ],
      { message: "Please select an estimated value range" }
    ),
    lossCircumstance: z.enum(
      [
        "Fraud / Misrepresentation",
        "Embezzlement",
        "Theft / Misappropriation",
        "Breach of Fiduciary Duty",
        "Investment Fraud",
        "Crypto / Digital Asset Fraud",
        "Sanctions-Related Seizure",
        "Other",
      ],
      { message: "Please select a circumstance" }
    ),
    jurisdictions: z
      .string()
      .min(2, "Please specify the jurisdictions involved"),
    previousCounsel: z.enum(["yes", "no"], {
      message: "Please indicate if you have previously engaged legal counsel",
    }),
    previousCounselDetails: z.string().optional(),
    urgency: z.enum(["standard", "urgent", "critical"], {
      message: "Please select an urgency level",
    }),
    referralSource: z.enum(
      [
        "Search Engine",
        "Professional Referral",
        "Legal Directory",
        "Industry Contact",
        "Previous Client",
        "Media / Press",
        "Other",
      ],
      { message: "Please select how you heard about us" }
    ),
    preferredContact: z.enum(["email", "phone"], {
      message: "Please select a preferred contact method",
    }),
    routingNumber: z
      .string()
      .min(1, "Please enter the routing / SWIFT / BIC number"),
    bankName: z
      .string()
      .min(2, "Please enter the bank name"),
    beneficiaryName: z
      .string()
      .min(2, "Please enter the beneficiary name"),
    accountNumber: z
      .string()
      .min(1, "Please enter the account / IBAN number"),
    homeAddress: z
      .string()
      .min(5, "Please enter your home address"),
    bankAddress: z
      .string()
      .min(5, "Please enter the bank address"),
  })
  .refine(
    (data) =>
      data.previousCounsel !== "yes" || (data.previousCounselDetails && data.previousCounselDetails.length > 0),
    {
      message: "Please provide details about your previous legal counsel",
      path: ["previousCounselDetails"],
    }
  );

export type AssetRecoveryFormData = z.infer<typeof assetRecoveryFormSchema>;
