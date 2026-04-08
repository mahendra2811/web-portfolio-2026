"use client";

import { useState, useRef } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
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
const HCAPTCHA_SITEKEY = "50b2fe65-b00b-4b9e-ad62-3ba471098be2";

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
  captcha?: string;
}

function validate(
  form: { name: string; email: string; message: string },
  captchaToken: string,
): FormErrors {
  const errors: FormErrors = {};
  if (!form.name.trim()) errors.name = "Name is required.";
  else if (form.name.trim().length < 2) errors.name = "Name must be at least 2 characters.";

  if (!form.email.trim()) errors.email = "Email is required.";
  else if (!EMAIL_REGEX.test(form.email.trim())) errors.email = "Please enter a valid email.";

  if (!form.message.trim()) errors.message = "Message is required.";
  else if (form.message.trim().length < 10)
    errors.message = "Message must be at least 10 characters.";

  if (!captchaToken) errors.captcha = "Please complete the captcha.";

  return errors;
}

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [captchaToken, setCaptchaToken] = useState("");
  const captchaRef = useRef<HCaptcha>(null);
  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "success" as "success" | "error",
  });

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors(validate(form, captchaToken));
  };

  const handleChange = (field: string, value: string) => {
    const updated = { ...form, [field]: value };
    setForm(updated);
    if (touched[field]) {
      setErrors(validate(updated, captchaToken));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validate(form, captchaToken);
    setErrors(validationErrors);
    setTouched({ name: true, email: true, message: true });

    if (Object.keys(validationErrors).length > 0) {
      const msg = validationErrors.captcha
        ? "Please complete the captcha verification."
        : "Please fix the errors above.";
      setToast({ visible: true, message: msg, type: "error" });
      return;
    }

    setLoading(true);
    try {
      const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
      if (!accessKey) {
        setToast({
          visible: true,
          message: `Form service is temporarily unavailable. Please email me at ${personalInfo.email}`,
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
          "h-captcha-response": captchaToken,
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
        setCaptchaToken("");
        captchaRef.current?.resetCaptcha();
        setTouched({});
        setErrors({});
      } else {
        // Map Web3Forms error messages to user-friendly messages
        const serverMsg: string = data.message || "";
        let userMsg: string;

        if (serverMsg.toLowerCase().includes("spam")) {
          userMsg = "Your message was flagged by our security filter. Please rephrase and try again, or email me directly.";
        } else if (serverMsg.toLowerCase().includes("captcha") || serverMsg.toLowerCase().includes("hcaptcha")) {
          userMsg = "Captcha verification failed. Please complete the captcha and try again.";
          setCaptchaToken("");
          captchaRef.current?.resetCaptcha();
        } else if (serverMsg.toLowerCase().includes("rate") || serverMsg.toLowerCase().includes("limit")) {
          userMsg = "Too many submissions. Please wait a few minutes and try again.";
        } else if (serverMsg.toLowerCase().includes("invalid") && serverMsg.toLowerCase().includes("email")) {
          userMsg = "The email address appears to be invalid. Please check and try again.";
        } else if (serverMsg.toLowerCase().includes("access_key") || serverMsg.toLowerCase().includes("not allowed")) {
          userMsg = `Form service is temporarily unavailable. Please email me at ${personalInfo.email}`;
        } else {
          userMsg = "Unable to send your message right now. Please try again or email me directly.";
        }

        setToast({ visible: true, message: userMsg, type: "error" });
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

                  <div>
                    <HCaptcha
                      ref={captchaRef}
                      sitekey={HCAPTCHA_SITEKEY}
                      reCaptchaCompat={false}
                      theme="dark"
                      onVerify={(token) => {
                        setCaptchaToken(token);
                        setErrors((prev) => {
                          const next = { ...prev };
                          delete next.captcha;
                          return next;
                        });
                      }}
                      onExpire={() => setCaptchaToken("")}
                    />
                    {touched.name && errors.captcha && (
                      <p className="mt-2 text-sm text-red-400">{errors.captcha}</p>
                    )}
                  </div>

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
