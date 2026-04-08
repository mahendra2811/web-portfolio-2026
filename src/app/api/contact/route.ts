import { NextResponse } from "next/server";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validation
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { success: false, error: "Name, email, and message are required." },
        { status: 400 },
      );
    }

    if (name.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: "Name must be at least 2 characters." },
        { status: 400 },
      );
    }

    if (!EMAIL_REGEX.test(email.trim())) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address." },
        { status: 400 },
      );
    }

    if (message.trim().length < 10) {
      return NextResponse.json(
        { success: false, error: "Message must be at least 10 characters." },
        { status: 400 },
      );
    }

    // Primary: Web3Forms
    const web3Key = process.env.WEB3FORMS_ACCESS_KEY;
    if (web3Key) {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: web3Key,
          name: name.trim(),
          email: email.trim(),
          subject: subject?.trim() || "New Portfolio Contact",
          message: message.trim(),
          from_name: "Portfolio Contact Form",
          botcheck: "",
        }),
      });

      const data = await res.json();
      if (!data.success) {
        console.error("Web3Forms error:", data.message);
        return NextResponse.json(
          { success: false, error: "Failed to send message. Please try again." },
          { status: 500 },
        );
      }
    }

    // Optional: Save to Supabase as backup
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      if (supabaseUrl && supabaseKey) {
        const { createSupabaseServerClient } = await import("@/lib/supabase/server");
        const supabase = await createSupabaseServerClient();
        if (supabase) {
          const { error } = await supabase.from("contacts").insert({
            name: name.trim(),
            email: email.trim(),
            subject: subject?.trim() || null,
            message: message.trim(),
          });
          if (error) console.error("Supabase insert error:", error.message);
        }
      }
    } catch (supabaseError) {
      console.error("Supabase error:", supabaseError);
    }

    // Optional: Send email via Resend
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      try {
        const { Resend } = await import("resend");
        const resend = new Resend(resendKey);
        await resend.emails.send({
          from: "Portfolio Contact <onboarding@resend.dev>",
          to: "mahendrapuniya92@gmail.com",
          subject: `Portfolio Contact: ${subject?.trim() || "New Message"}`,
          html: `<p><strong>From:</strong> ${name.trim()} (${email.trim()})</p><p><strong>Subject:</strong> ${subject?.trim() || "N/A"}</p><p><strong>Message:</strong></p><p>${message.trim()}</p>`,
        });
      } catch (emailError) {
        console.error("Resend error:", emailError);
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again later." },
      { status: 500 },
    );
  }
}
