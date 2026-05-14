"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { toast } from "sonner";
import { Send, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { assetRecoveryFormSchema } from "@/lib/validators";

const inputClass =
  "flex h-10 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/20";

const selectClass =
  "flex h-10 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/20";

const textareaClass =
  "flex w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/20 resize-none";

const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  country: "",
  assetDescription: "",
  estimatedValue: "",
  lossCircumstance: "",
  jurisdictions: "",
  previousCounsel: "no",
  previousCounselDetails: "",
  urgency: "standard",
  referralSource: "",
  preferredContact: "email",
  routingNumber: "",
  bankName: "",
  beneficiaryName: "",
  accountNumber: "",
  homeAddress: "",
  bankAddress: "",
};

type FormFields = typeof initialForm;
type FormErrors = Partial<Record<keyof FormFields, string>>;

export default function AssetRecoveryForm() {
  const [form, setForm] = useState<FormFields>({ ...initialForm });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormFields]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name as keyof FormFields];
        return next;
      });
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const result = assetRecoveryFormSchema.safeParse(form);

    if (!result.success) {
      const fieldErrors: FormErrors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof FormFields;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      const firstKey = result.error.issues[0]?.path[0] as string | undefined;
      if (firstKey) {
        const el = document.getElementById(firstKey);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    setSubmitting(true);
    fetch("/api/asset-recovery", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(result.data),
    })
      .then(async (res) => {
        const json = await res.json();
        if (res.ok) {
          setSubmitted(true);
          toast.success("Application submitted successfully", {
            description:
              "A senior associate will review your case and contact you within 48 hours.",
          });
          setForm({ ...initialForm });
          setErrors({});
        } else {
          toast.error("Failed to submit application", {
            description: json.error || "Please try again later.",
          });
        }
      })
      .catch(() => {
        toast.error("Network error", {
          description: "Please check your connection and try again.",
        });
      })
      .finally(() => {
        setSubmitting(false);
      });
  }

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-gold" />
        </div>
        <h3 className="font-heading text-2xl font-bold mb-3">
          Application Received
        </h3>
        <p className="text-white/60 max-w-md mx-auto text-sm leading-relaxed mb-6">
          Thank you for submitting your asset recovery application. A senior
          associate will review your case details and contact you within 48
          business hours.
        </p>
        <p className="text-white/40 text-xs">
          Reference confirmation has been sent to your email address.
        </p>
        <Button
          onClick={() => setSubmitted(false)}
          variant="outline"
          className="mt-8 border-gold/30 text-gold hover:bg-gold/10"
        >
          Submit Another Application
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Section 1: Personal Information */}
      <div>
        <h3 className="text-gold text-xs font-semibold tracking-wider uppercase mb-5">
          Personal Information
        </h3>
        <div className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-white/80">
                Full Name <span className="text-gold">*</span>
              </Label>
              <input
                id="fullName"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                placeholder="Full legal name"
                className={inputClass}
              />
              {errors.fullName && (
                <p className="text-red-400 text-xs">{errors.fullName}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-white/80">
                Email <span className="text-gold">*</span>
              </Label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className={inputClass}
              />
              {errors.email && (
                <p className="text-red-400 text-xs">{errors.email}</p>
              )}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-white/80">
                Phone
              </Label>
              <input
                id="phone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+49 (40) 123 456 789"
                className={inputClass}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="country" className="text-white/80">
                Country of Residence <span className="text-gold">*</span>
              </Label>
              <input
                id="country"
                name="country"
                value={form.country}
                onChange={handleChange}
                placeholder="e.g. Germany"
                className={inputClass}
              />
              {errors.country && (
                <p className="text-red-400 text-xs">{errors.country}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5" />

      {/* Section 2: Asset Details */}
      <div>
        <h3 className="text-gold text-xs font-semibold tracking-wider uppercase mb-5">
          Asset Details
        </h3>
        <div className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="estimatedValue" className="text-white/80">
                Estimated Asset Value <span className="text-gold">*</span>
              </Label>
              <select
                id="estimatedValue"
                name="estimatedValue"
                value={form.estimatedValue}
                onChange={handleChange}
                className={selectClass}
              >
                <option value="" disabled className="bg-navy text-white/50">
                  Select a range
                </option>
                <option value="Under €100,000" className="bg-navy text-white">Under €100,000</option>
                <option value="€100,000 – €500,000" className="bg-navy text-white">€100,000 – €500,000</option>
                <option value="€500,000 – €1,000,000" className="bg-navy text-white">€500,000 – €1,000,000</option>
                <option value="€1,000,000 – €5,000,000" className="bg-navy text-white">€1,000,000 – €5,000,000</option>
                <option value="€5,000,000 – €25,000,000" className="bg-navy text-white">€5,000,000 – €25,000,000</option>
                <option value="Over €25,000,000" className="bg-navy text-white">Over €25,000,000</option>
              </select>
              {errors.estimatedValue && (
                <p className="text-red-400 text-xs">{errors.estimatedValue}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="lossCircumstance" className="text-white/80">
                Nature of Loss <span className="text-gold">*</span>
              </Label>
              <select
                id="lossCircumstance"
                name="lossCircumstance"
                value={form.lossCircumstance}
                onChange={handleChange}
                className={selectClass}
              >
                <option value="" disabled className="bg-navy text-white/50">Select circumstance</option>
                <option value="Fraud / Misrepresentation" className="bg-navy text-white">Fraud / Misrepresentation</option>
                <option value="Embezzlement" className="bg-navy text-white">Embezzlement</option>
                <option value="Theft / Misappropriation" className="bg-navy text-white">Theft / Misappropriation</option>
                <option value="Breach of Fiduciary Duty" className="bg-navy text-white">Breach of Fiduciary Duty</option>
                <option value="Investment Fraud" className="bg-navy text-white">Investment Fraud</option>
                <option value="Crypto / Digital Asset Fraud" className="bg-navy text-white">Crypto / Digital Asset Fraud</option>
                <option value="Sanctions-Related Seizure" className="bg-navy text-white">Sanctions-Related Seizure</option>
                <option value="Other" className="bg-navy text-white">Other</option>
              </select>
              {errors.lossCircumstance && (
                <p className="text-red-400 text-xs">{errors.lossCircumstance}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="jurisdictions" className="text-white/80">
              Jurisdictions Involved <span className="text-gold">*</span>
            </Label>
            <input
              id="jurisdictions"
              name="jurisdictions"
              value={form.jurisdictions}
              onChange={handleChange}
              placeholder="e.g. Germany, Switzerland, United Kingdom"
              className={inputClass}
            />
            <p className="text-white/30 text-xs">
              List all countries or jurisdictions where assets are located or
              where the loss occurred.
            </p>
            {errors.jurisdictions && (
              <p className="text-red-400 text-xs">{errors.jurisdictions}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="assetDescription" className="text-white/80">
              Description of Assets & Circumstances{" "}
              <span className="text-gold">*</span>
            </Label>
            <textarea
              id="assetDescription"
              name="assetDescription"
              rows={5}
              value={form.assetDescription}
              onChange={handleChange}
              placeholder="Please describe the assets in question and the circumstances of the loss. Include any relevant dates, amounts, parties involved, and documentation you may have."
              className={textareaClass}
            />
            {errors.assetDescription && (
              <p className="text-red-400 text-xs">{errors.assetDescription}</p>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-white/5" />

      {/* Section 3: Additional Information */}
      <div>
        <h3 className="text-gold text-xs font-semibold tracking-wider uppercase mb-5">
          Additional Information
        </h3>
        <div className="space-y-6">
          <div id="previousCounsel" className="space-y-2">
            <Label className="text-white/80">
              Have you previously engaged legal counsel for this matter?{" "}
              <span className="text-gold">*</span>
            </Label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="previousCounsel"
                  value="no"
                  checked={form.previousCounsel === "no"}
                  onChange={handleChange}
                  className="accent-gold w-4 h-4"
                />
                <span className="text-sm text-white/70">No</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="previousCounsel"
                  value="yes"
                  checked={form.previousCounsel === "yes"}
                  onChange={handleChange}
                  className="accent-gold w-4 h-4"
                />
                <span className="text-sm text-white/70">Yes</span>
              </label>
            </div>
            {errors.previousCounsel && (
              <p className="text-red-400 text-xs">{errors.previousCounsel}</p>
            )}
          </div>

          {form.previousCounsel === "yes" && (
            <div className="space-y-2">
              <Label htmlFor="previousCounselDetails" className="text-white/80">
                Previous Counsel Details <span className="text-gold">*</span>
              </Label>
              <input
                id="previousCounselDetails"
                name="previousCounselDetails"
                value={form.previousCounselDetails}
                onChange={handleChange}
                placeholder="Firm name, jurisdiction, and outcome if applicable"
                className={inputClass}
              />
              {errors.previousCounselDetails && (
                <p className="text-red-400 text-xs">{errors.previousCounselDetails}</p>
              )}
            </div>
          )}

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="urgency" className="text-white/80">
                Urgency Level <span className="text-gold">*</span>
              </Label>
              <select
                id="urgency"
                name="urgency"
                value={form.urgency}
                onChange={handleChange}
                className={selectClass}
              >
                <option value="standard" className="bg-navy text-white">Standard — Within weeks</option>
                <option value="urgent" className="bg-navy text-white">Urgent — Within days</option>
                <option value="critical" className="bg-navy text-white">Critical — Immediate attention required</option>
              </select>
              {errors.urgency && (
                <p className="text-red-400 text-xs">{errors.urgency}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="referralSource" className="text-white/80">
                How did you hear about us? <span className="text-gold">*</span>
              </Label>
              <select
                id="referralSource"
                name="referralSource"
                value={form.referralSource}
                onChange={handleChange}
                className={selectClass}
              >
                <option value="" disabled className="bg-navy text-white/50">Select source</option>
                <option value="Search Engine" className="bg-navy text-white">Search Engine</option>
                <option value="Professional Referral" className="bg-navy text-white">Professional Referral</option>
                <option value="Legal Directory" className="bg-navy text-white">Legal Directory</option>
                <option value="Industry Contact" className="bg-navy text-white">Industry Contact</option>
                <option value="Previous Client" className="bg-navy text-white">Previous Client</option>
                <option value="Media / Press" className="bg-navy text-white">Media / Press</option>
                <option value="Other" className="bg-navy text-white">Other</option>
              </select>
              {errors.referralSource && (
                <p className="text-red-400 text-xs">{errors.referralSource}</p>
              )}
            </div>
          </div>

          <div id="preferredContact" className="space-y-2">
            <Label className="text-white/80">
              Preferred Contact Method <span className="text-gold">*</span>
            </Label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="preferredContact"
                  value="email"
                  checked={form.preferredContact === "email"}
                  onChange={handleChange}
                  className="accent-gold w-4 h-4"
                />
                <span className="text-sm text-white/70">Email</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="preferredContact"
                  value="phone"
                  checked={form.preferredContact === "phone"}
                  onChange={handleChange}
                  className="accent-gold w-4 h-4"
                />
                <span className="text-sm text-white/70">Phone</span>
              </label>
            </div>
            {errors.preferredContact && (
              <p className="text-red-400 text-xs">{errors.preferredContact}</p>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-white/5" />

      {/* Section 4: Recovery Account Details */}
      <div>
        <h3 className="text-gold text-xs font-semibold tracking-wider uppercase mb-2">
          Recovery Account Details
        </h3>
        <p className="text-white/40 text-xs mb-5">
          Provide the bank account where recovered assets should be wired. This
          information is encrypted and handled with the strictest
          confidentiality.
        </p>
        <div className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="beneficiaryName" className="text-white/80">
                Beneficiary Name <span className="text-gold">*</span>
              </Label>
              <input
                id="beneficiaryName"
                name="beneficiaryName"
                value={form.beneficiaryName}
                onChange={handleChange}
                placeholder="Account holder's full legal name"
                className={inputClass}
              />
              {errors.beneficiaryName && (
                <p className="text-red-400 text-xs">{errors.beneficiaryName}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="bankName" className="text-white/80">
                Bank Name <span className="text-gold">*</span>
              </Label>
              <input
                id="bankName"
                name="bankName"
                value={form.bankName}
                onChange={handleChange}
                placeholder="e.g. Deutsche Bank AG"
                className={inputClass}
              />
              {errors.bankName && (
                <p className="text-red-400 text-xs">{errors.bankName}</p>
              )}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="accountNumber" className="text-white/80">
                Account Number / IBAN <span className="text-gold">*</span>
              </Label>
              <input
                id="accountNumber"
                name="accountNumber"
                value={form.accountNumber}
                onChange={handleChange}
                placeholder="e.g. DE89 3704 0044 0532 0130 00"
                className={inputClass}
              />
              {errors.accountNumber && (
                <p className="text-red-400 text-xs">{errors.accountNumber}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="routingNumber" className="text-white/80">
                Routing / SWIFT / BIC <span className="text-gold">*</span>
              </Label>
              <input
                id="routingNumber"
                name="routingNumber"
                value={form.routingNumber}
                onChange={handleChange}
                placeholder="e.g. DEUTDEDBFRA"
                className={inputClass}
              />
              {errors.routingNumber && (
                <p className="text-red-400 text-xs">{errors.routingNumber}</p>
              )}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="homeAddress" className="text-white/80">
                Home Address <span className="text-gold">*</span>
              </Label>
              <input
                id="homeAddress"
                name="homeAddress"
                value={form.homeAddress}
                onChange={handleChange}
                placeholder="Full residential address"
                className={inputClass}
              />
              {errors.homeAddress && (
                <p className="text-red-400 text-xs">{errors.homeAddress}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="bankAddress" className="text-white/80">
                Bank Address <span className="text-gold">*</span>
              </Label>
              <input
                id="bankAddress"
                name="bankAddress"
                value={form.bankAddress}
                onChange={handleChange}
                placeholder="Bank branch address"
                className={inputClass}
              />
              {errors.bankAddress && (
                <p className="text-red-400 text-xs">{errors.bankAddress}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5" />

      <div className="p-4 rounded-sm bg-white/5 border border-white/10">
        <p className="text-white/50 text-xs leading-relaxed">
          By submitting this application, you acknowledge that the information
          provided is accurate to the best of your knowledge. All information
          shared is protected by attorney-client privilege and treated with the
          strictest confidentiality under applicable law. Submission of this form
          does not establish an attorney-client relationship.
        </p>
      </div>

      <div className="rounded-sm border border-gold/30 bg-gold/5 p-5 sm:p-6">
        <div className="flex items-start gap-3 mb-4">
          <AlertCircle className="w-5 h-5 text-gold shrink-0 mt-0.5" />
          <h3 className="font-heading text-base font-semibold text-gold">
            Fee Arrangement Notice
          </h3>
        </div>
        <div className="space-y-3 text-white/80 text-sm leading-relaxed pl-8">
          <p>
            The Firm has agreed to absorb 1% of the standard 2% processing
            fee on your behalf. This portion has been settled and requires no
            further action from you.
          </p>
          <p>
            The remaining 1% of the processing fee will be invoiced upon
            successful completion and finalisation of the recovery
            proceedings.
          </p>
          <p className="font-medium text-white/90">
            Please note that applicable court filing fees remain the
            responsibility of the client and must be remitted separately as
            required by the relevant jurisdiction(s). Your assigned associate
            will provide a detailed schedule of anticipated court costs
            during the initial case review.
          </p>
        </div>
        <p className="mt-4 pt-3 border-t border-gold/10 text-white/30 text-xs pl-8">
          This fee arrangement is specific to the engagement terms agreed for
          this matter and does not constitute a general fee policy of Von
          Steiger & Associates.
        </p>
      </div>

      <Button
        type="submit"
        disabled={submitting}
        className="w-full bg-gold hover:bg-gold-dark text-navy font-semibold py-6 text-base rounded-sm"
      >
        {submitting ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Submitting Application...
          </>
        ) : (
          <>
            <Send className="w-5 h-5 mr-2" />
            Submit Application
          </>
        )}
      </Button>

      <p className="text-white/30 text-xs text-center">
        All submissions are encrypted and treated as strictly confidential. A
        senior associate will review your case within 48 business hours.
      </p>
    </form>
  );
}
