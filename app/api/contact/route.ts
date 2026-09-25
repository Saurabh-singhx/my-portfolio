import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { z } from 'zod';

const contactRequestSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Invalid email address').max(150),
  message: z.string().min(5, 'Message must be at least 5 characters').max(2000),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = contactRequestSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, errors: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { name, email, message } = result.data;

    // Optional nodemailer transport if SMTP env variables are configured
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (smtpHost && smtpUser && smtpPass) {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: Number(smtpPort) || 587,
        secure: Number(smtpPort) === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      await transporter.sendMail({
        from: `"${name} (Portfolio)" <${smtpUser}>`,
        to: process.env.CONTACT_RECEIVER_EMAIL || 'saurabh4442kumar@gmail.com',
        replyTo: email,
        subject: `[Portfolio Inquiry] from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
            <h2 style="color: #0066cc;">New Message from Portfolio Website</h2>
            <p><strong>From:</strong> ${name} &lt;${email}&gt;</p>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
            <p style="white-space: pre-wrap; font-size: 15px; line-height: 1.6;">${message}</p>
          </div>
        `,
      });
    } else {
      // In development or when SMTP is not configured, log transmission
      console.log(`[Contact Form Submission] Name: ${name}, Email: ${email}, Message: ${message}`);
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Message delivered successfully.',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[Contact API Error]:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error processing contact message.' },
      { status: 500 }
    );
  }
}
