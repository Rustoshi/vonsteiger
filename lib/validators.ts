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
