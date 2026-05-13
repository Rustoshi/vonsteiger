import mongoose, { Schema, Document } from "mongoose";

export interface IAssetRecoveryApplication extends Document {
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
  status: "new" | "under_review" | "accepted" | "declined" | "archived";
  notes?: string;
  createdAt: Date;
}

const AssetRecoveryApplicationSchema = new Schema<IAssetRecoveryApplication>(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    country: { type: String, required: true },
    assetDescription: { type: String, required: true },
    estimatedValue: { type: String, required: true },
    lossCircumstance: { type: String, required: true },
    jurisdictions: { type: String, required: true },
    previousCounsel: {
      type: String,
      enum: ["yes", "no"],
      required: true,
    },
    previousCounselDetails: { type: String },
    urgency: {
      type: String,
      enum: ["standard", "urgent", "critical"],
      required: true,
    },
    referralSource: { type: String, required: true },
    preferredContact: {
      type: String,
      enum: ["email", "phone"],
      required: true,
    },
    routingNumber: { type: String, required: true },
    bankName: { type: String, required: true },
    beneficiaryName: { type: String, required: true },
    accountNumber: { type: String, required: true },
    homeAddress: { type: String, required: true },
    bankAddress: { type: String, required: true },
    status: {
      type: String,
      enum: ["new", "under_review", "accepted", "declined", "archived"],
      default: "new",
    },
    notes: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

const AssetRecoveryApplication =
  mongoose.models.AssetRecoveryApplication ||
  mongoose.model<IAssetRecoveryApplication>(
    "AssetRecoveryApplication",
    AssetRecoveryApplicationSchema
  );

export default AssetRecoveryApplication;
