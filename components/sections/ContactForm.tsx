"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { contactFormSchema, type ContactFormData } from "@/lib/validators";

export default function ContactForm() {
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      preferredContact: "email",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        toast.success("Message sent successfully", {
          description:
            "Thank you for contacting Von Steiger & Associates. We will respond within 24 hours.",
        });
        reset();
      } else {
        toast.error("Failed to send message", {
          description: result.error || "Please try again later.",
        });
      }
    } catch {
      toast.error("Network error", {
        description: "Please check your connection and try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="fullName" className="text-white/80">
            Full Name <span className="text-gold">*</span>
          </Label>
          <Input
            id="fullName"
            placeholder="Julian von Steiger"
            className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-gold/50 focus:ring-gold/20"
            {...register("fullName")}
          />
          {errors.fullName && (
            <p className="text-red-400 text-xs">{errors.fullName.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-white/80">
            Email <span className="text-gold">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="julian@example.com"
            className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-gold/50 focus:ring-gold/20"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-400 text-xs">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-white/80">
            Phone
          </Label>
          <Input
            id="phone"
            placeholder="+49 (40) 123 456 789"
            className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-gold/50 focus:ring-gold/20"
            {...register("phone")}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="subject" className="text-white/80">
            Subject <span className="text-gold">*</span>
          </Label>
          <select
            id="subject"
            className="flex h-10 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/20"
            {...register("subject")}
            defaultValue=""
          >
            <option value="" disabled className="bg-navy text-white/50">
              Select a subject
            </option>
            <option value="Asset Recovery" className="bg-navy text-white">
              Asset Recovery
            </option>
            <option value="Corporate Litigation" className="bg-navy text-white">
              Corporate Litigation
            </option>
            <option value="Consultation" className="bg-navy text-white">
              Consultation
            </option>
            <option value="Other" className="bg-navy text-white">
              Other
            </option>
          </select>
          {errors.subject && (
            <p className="text-red-400 text-xs">{errors.subject.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message" className="text-white/80">
          Message <span className="text-gold">*</span>
        </Label>
        <Textarea
          id="message"
          rows={5}
          placeholder="Describe your legal matter..."
          className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-gold/50 focus:ring-gold/20 resize-none"
          {...register("message")}
        />
        {errors.message && (
          <p className="text-red-400 text-xs">{errors.message.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label className="text-white/80">
          Preferred Contact Method <span className="text-gold">*</span>
        </Label>
        <div className="flex gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value="email"
              {...register("preferredContact")}
              className="accent-gold w-4 h-4"
            />
            <span className="text-sm text-white/70">Email</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value="phone"
              {...register("preferredContact")}
              className="accent-gold w-4 h-4"
            />
            <span className="text-sm text-white/70">Phone</span>
          </label>
        </div>
        {errors.preferredContact && (
          <p className="text-red-400 text-xs">
            {errors.preferredContact.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        disabled={submitting}
        className="w-full bg-gold hover:bg-gold-dark text-navy font-semibold py-6 text-base rounded-sm"
      >
        {submitting ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="w-5 h-5 mr-2" />
            Send Message
          </>
        )}
      </Button>

      <p className="text-white/30 text-xs text-center">
        All communications are treated as strictly confidential. We typically
        respond within 24 business hours.
      </p>
    </form>
  );
}
