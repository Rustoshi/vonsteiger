import mongoose, { Schema, Document } from "mongoose";

export interface IContact extends Document {
  fullName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  preferredContact: "email" | "phone";
  status: "new" | "read" | "replied" | "archived";
  notes?: string;
  createdAt: Date;
}

const ContactSchema = new Schema<IContact>(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    preferredContact: {
      type: String,
      enum: ["email", "phone"],
      required: true,
    },
    status: {
      type: String,
      enum: ["new", "read", "replied", "archived"],
      default: "new",
    },
    notes: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

const Contact =
  mongoose.models.Contact ||
  mongoose.model<IContact>("Contact", ContactSchema);

export default Contact;
