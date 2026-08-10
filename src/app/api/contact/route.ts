import { NextResponse } from "next/server";
import { IDENTITY } from "@/data/portfolio";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, error: "All fields are required." },
        { status: 400 }
      );
    }

    // 1. Try Resend if RESEND_API_KEY is configured in .env
    if (process.env.RESEND_API_KEY) {
      const resendRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Portfolio Contact Form <onboarding@resend.dev>",
          to: [IDENTITY.email],
          subject: `[Portfolio Contact] ${subject} - from ${name}`,
          reply_to: email,
          text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
        }),
      });

      if (resendRes.ok) {
        return NextResponse.json({
          success: true,
          message: "Email sent successfully via Resend.",
        });
      }
    }

    // 2. Try Web3Forms (Works out-of-the-box with access_key or default key)
    if (process.env.WEB3FORMS_ACCESS_KEY) {
      const web3Res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: process.env.WEB3FORMS_ACCESS_KEY,
          name,
          email,
          subject: `[Portfolio] ${subject}`,
          message,
          to: IDENTITY.email,
          from_name: `${name} (Portfolio)`,
        }),
      });

      const web3Data = await web3Res.json();
      if (web3Res.ok && web3Data.success) {
        return NextResponse.json({
          success: true,
          message: "Message delivered successfully.",
        });
      }
    }

    // Failsafe fallback indicator (if no backend key set, client handles mailto)
    return NextResponse.json(
      {
        success: true,
        fallbackMailto: true,
        message: "Message ready for dispatch via default mail client.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      {
        success: false,
        fallbackMailto: true,
        error: "Server processing error.",
      },
      { status: 500 }
    );
  }
}
