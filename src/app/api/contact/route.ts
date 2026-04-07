import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Name, email, and message are required." },
        { status: 400 },
      );
    }

    // Save to Supabase (graceful fallback)
    const supabase = await createSupabaseServerClient();
    if (supabase) {
      const { error } = await supabase
        .from("contacts")
        .insert({ name, email, subject: subject || null, message });
      if (error) {
        console.error("Supabase insert error:", error.message);
      }
    }

    // Send email via Resend (graceful fallback)
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      try {
        const { Resend } = await import("resend");
        const resend = new Resend(resendKey);
        await resend.emails.send({
          from: "Portfolio Contact <onboarding@resend.dev>",
          to: "mahendrapuniya92@gmail.com",
          subject: `Portfolio Contact: ${subject || "New Message"}`,
          html: `<p><strong>From:</strong> ${name} (${email})</p><p><strong>Subject:</strong> ${subject || "N/A"}</p><p><strong>Message:</strong></p><p>${message}</p>`,
        });
      } catch (emailError) {
        console.error("Resend error:", emailError);
      }
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false, error: "Internal server error." }, { status: 500 });
  }
}
