"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { personalInfo } from "@/data/personal";
import { Section } from "@/components/layout/Section";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { Toast } from "@/components/ui/Toast";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "success" as "success" | "error",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setToast({ visible: true, message: "Please fill in all required fields.", type: "error" });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setToast({
          visible: true,
          message: "Message sent successfully! I'll get back to you soon.",
          type: "success",
        });
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setToast({ visible: true, message: data.error || "Something went wrong.", type: "error" });
      }
    } catch {
      setToast({
        visible: true,
        message: "Failed to send. Please try again later.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    { icon: Mail, label: "Email", value: personalInfo.email, href: `mailto:${personalInfo.email}` },
    { icon: Phone, label: "Phone", value: personalInfo.phone, href: `tel:${personalInfo.phone}` },
    { icon: MapPin, label: "Location", value: personalInfo.location, href: null },
    { icon: GithubIcon, label: "GitHub", value: "mahendra2811", href: personalInfo.github },
    {
      icon: LinkedinIcon,
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
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Input
                    id="name"
                    label="Name *"
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                  />
                  <Input
                    id="email"
                    label="Email *"
                    type="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                  />
                </div>
                <Input
                  id="subject"
                  label="Subject"
                  placeholder="What's this about?"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                />
                <Textarea
                  id="message"
                  label="Message *"
                  placeholder="Tell me about your project..."
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  required
                />
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  loading={loading}
                  className="w-full"
                >
                  <Send className="h-4 w-4" /> Send Message
                </Button>
              </form>
            </Card>
          </ScrollReveal>
        </div>

        <div className="space-y-4 lg:col-span-2">
          {contactInfo.map(({ icon: Icon, label, value, href }) => (
            <ScrollReveal key={label} direction="right">
              <Card className="flex items-center gap-4" hover={false}>
                <div className="glass rounded-card p-2.5">
                  <Icon className="text-primary-400 h-5 w-5" />
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
