import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.CONTACT_EMAIL_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.CONTACT_EMAIL_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.CONTACT_EMAIL_USER,
        pass: process.env.CONTACT_EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.CONTACT_EMAIL_USER,
      to: process.env.CONTACT_EMAIL_TO || 'saurabh4442kumar@gmail.com',
      subject: `Portfolio Contact: ${name}`,
      text: `Name: ${name}
Email: ${email}

Message:
${message}`,
      html: `
        <div style="font-family: monospace; background: #0d1117; color: #e6edf3; padding: 20px; border-radius: 8px;">
          <h2 style="color: #00ff41;">New Contact Form Submission</h2>
          <p><strong style="color: #00d2ff;">Name:</strong> ${name}</p>
          <p><strong style="color: #00d2ff;">Email:</strong> ${email}</p>
          <p><strong style="color: #00d2ff;">Message:</strong></p>
          <div style="background: #161b22; padding: 12px; border-radius: 4px; border: 1px solid rgba(255,255,255,0.08);">
            ${message.replace(/ /g, '&nbsp;').replace(/\n/g, '<br>')}
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { success: true, message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
