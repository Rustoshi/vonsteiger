import mongoose, { Schema, type Document } from "mongoose";

export interface IOffice {
  name: string;
  street: string;
  city: string;
  postal: string;
  country: string;
  phone: string;
  email: string;
  hours: string;
}

export interface ISiteSettings extends Document {
  generalEmail: string;
  generalPhone: string;
  offices: IOffice[];
  updatedAt: Date;
}

const OfficeSchema = new Schema<IOffice>(
  {
    name: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    postal: { type: String, required: true },
    country: { type: String, default: "DE" },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    hours: { type: String, default: "Mon–Fri: 08:00–18:00 CET" },
  },
  { _id: false }
);

const SiteSettingsSchema = new Schema<ISiteSettings>(
  {
    generalEmail: { type: String, required: true },
    generalPhone: { type: String, required: true },
    offices: { type: [OfficeSchema], default: [] },
  },
  { timestamps: true }
);

export const DEFAULT_SETTINGS = {
  generalEmail: "info@vonsteiger.org",
  generalPhone: "+49 (40) 123 456 789",
  offices: [
    {
      name: "Hamburg Office",
      street: "Neuer Wall 50",
      city: "Hamburg",
      postal: "20354",
      country: "DE",
      phone: "+49 (40) 123 456 789",
      email: "hamburg@vonsteiger.org",
      hours: "Mon–Fri: 08:00–18:00 CET",
    },
    {
      name: "Berlin Office",
      street: "Friedrichstraße 191",
      city: "Berlin",
      postal: "10117",
      country: "DE",
      phone: "+49 (30) 987 654 321",
      email: "berlin@vonsteiger.org",
      hours: "Mon–Fri: 08:00–18:00 CET",
    },
  ],
};

export default mongoose.models.SiteSettings ||
  mongoose.model<ISiteSettings>("SiteSettings", SiteSettingsSchema);
