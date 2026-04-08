"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone,
  faLocationDot,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { personalInfo } from "@/data/personal";
import { Section } from "@/components/layout/Section";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { Toast } from "@/components/ui/Toast";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

interface ContactItem {
  icon: IconDefinition;
  color: string;
  label: string;
  value: string;
  href: string | null;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const WEB3FORMS_URL = "https://api.web3forms.com/submit";

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

function validate(form: { name: string; email: string; message: string }): FormErrors {
  const errors: FormErrors = {};
  if (!form.name.trim()) errors.name = "Name is required.";
  else if (form.name.trim().length < 2) errors.name = "Name must be at least 2 characters.";

  if (!form.email.trim()) errors.email = "Email is required.";
  else if (!EMAIL_REGEX.test(form.email.trim())) errors.email = "Please enter a valid email.";

  if (!form.message.trim()) errors.message = "Message is required.";
  else if (form.message.trim().length < 10)
    errors.message = "Message must be at least 10 characters.";

  return errors;
}

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "success" as "success" | "error",
  });

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors(validate(form));
  };

  const handleChange = (field: string, value: string) => {
    const updated = { ...form, [field]: value };
    setForm(updated);
    if (touched[field]) {
      setErrors(validate(updated));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (honeypot) return;

    const validationErrors = validate(form);
    setErrors(validationErrors);
    setTouched({ name: true, email: true, message: true });

    if (Object.keys(validationErrors).length > 0) {
      setToast({ visible: true, message: "Please fix the errors above.", type: "error" });
      return;
    }

    setLoading(true);
    try {
      const accessKey = process.env.WEB3FORMS_KEY;
      if (!accessKey) {
        setToast({
          visible: true,
          message: "Contact form is not configured yet. Please email me directly.",
          type: "error",
        });
        setLoading(false);
        return;
      }

      const res = await fetch(WEB3FORMS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: accessKey,
          name: form.name.trim(),
          email: form.email.trim(),
          subject: `Message from Mahendra Portfolio 2026 — ${form.subject.trim() || "New Contact"}`,
          message: form.message.trim(),
          from_name: "Mahendra Portfolio 2026",
          botcheck: "",
        }),
      });

      const data = await res.json();

      if (data.success) {
        setSent(true);
        setToast({
          visible: true,
          message: "Message sent successfully! I'll get back to you soon.",
          type: "success",
        });
        setForm({ name: "", email: "", subject: "", message: "" });
        setTouched({});
        setErrors({});
      } else {
        setToast({
          visible: true,
          message: data.message || "Failed to send message. Please try again.",
          type: "error",
        });
      }
    } catch {
      setToast({
        visible: true,
        message: "Network error. Please check your connection and try again.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const contactInfo: ContactItem[] = [
    {
      icon: faEnvelope,
      color: "#F59E0B",
      label: "Email",
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
    },
    // {
    //   icon: faPhone,
    //   color: "#06B6D4",
    //   label: "Phone",
    //   value: personalInfo.phone,
    //   href: `tel:${personalInfo.phone}`,
    // },
    {
      icon: faLocationDot,
      color: "#E34F26",
      label: "Location",
      value: personalInfo.location,
      href: null,
    },
    {
      icon: faGithub,
      color: "#FFFFFF",
      label: "GitHub",
      value: "mahendra2811",
      href: personalInfo.github,
    },
    {
      icon: faLinkedinIn,
      color: "#0A66C2",
      label: "LinkedIn",
      value: "pooniyamahendra",
      href: personalInfo.linkedin,
    },
  ];

  return (
    <Section title="Get In Touch" subtitle="Have a project in mind? Let's talk about it.">
      <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <ScrollReveal direction="left">
            <Card>
              {sent ? (
                <div className="py-8 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10">
                    <FontAwesomeIcon
                      icon={faPaperPlane}
                      className="h-7 w-7"
                      style={{ color: "#10B981" }}
                    />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">Message Sent!</h3>
                  <p className="mb-6 text-[var(--text-secondary)]">
                    Thank you for reaching out. I&apos;ll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="text-primary-400 hover:text-primary-300 text-sm font-medium transition-colors"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Honeypot — hidden from real users, bots fill it */}
                  <div className="absolute -left-[9999px] opacity-0" aria-hidden="true">
                    <input
                      type="text"
                      name="botcheck"
                      tabIndex={-1}
                      autoComplete="off"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                    />
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Input
                      id="name"
                      label="Name *"
                      placeholder="Your name"
                      value={form.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      onBlur={() => handleBlur("name")}
                      error={touched.name ? errors.name : undefined}
                      required
                    />
                    <Input
                      id="email"
                      label="Email *"
                      type="email"
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      onBlur={() => handleBlur("email")}
                      error={touched.email ? errors.email : undefined}
                      required
                    />
                  </div>
                  <Input
                    id="subject"
                    label="Subject"
                    placeholder="What's this about?"
                    value={form.subject}
                    onChange={(e) => handleChange("subject", e.target.value)}
                  />
                  <Textarea
                    id="message"
                    label="Message *"
                    placeholder="Tell me about your project..."
                    rows={5}
                    value={form.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    onBlur={() => handleBlur("message")}
                    error={touched.message ? errors.message : undefined}
                    required
                  />
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    loading={loading}
                    className="w-full"
                  >
                    <FontAwesomeIcon icon={faPaperPlane} className="h-4 w-4" />
                    {loading ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              )}
            </Card>
          </ScrollReveal>
        </div>

        <div className="space-y-4 lg:col-span-2">
          {contactInfo.map(({ icon, color, label, value, href }) => (
            <ScrollReveal key={label} direction="right">
              <Card className="flex items-center gap-4" hover={false}>
                <div className="glass rounded-card p-2.5">
                  <FontAwesomeIcon icon={icon} className="h-5 w-5" style={{ color }} />
                </div>
                <div>
                  <p className="text-xs text-[var(--text-secondary)]">{label}</p>
                  {href ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary-400 text-sm font-medium transition-colors"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="text-sm font-medium">{value}</p>
                  )}
                </div>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>

      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.visible}
        onClose={() => setToast({ ...toast, visible: false })}
      />
    </Section>
  );
}
