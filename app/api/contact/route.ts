import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, budget, message } = body;

    // Validasyon
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Lütfen tüm zorunlu alanları doldurun (İsim, Email, Mesaj)' },
        { status: 400 }
      );
    }

    // Email format kontrolü
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Geçerli bir email adresi girin' },
        { status: 400 }
      );
    }

    // Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // SMTP bağlantısını test et
    await transporter.verify();

    // Email gönder
    const mailOptions = {
      from: `"${process.env.MAIL_FROM_NAME}" <${process.env.SMTP_USER}>`,
      to: process.env.MAIL_TO,
      replyTo: email,
      subject: `📩 Yeni İletişim Formu: ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #8b5cf6, #3b82f6); padding: 30px; border-radius: 12px 12px 0 0; color: white; text-align: center; }
              .content { background: #f9fafb; padding: 30px; border-radius: 0 0 12px 12px; }
              .field { margin-bottom: 20px; padding: 15px; background: white; border-radius: 8px; border-left: 4px solid #8b5cf6; }
              .label { font-weight: bold; color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 5px; }
              .value { color: #111827; font-size: 16px; }
              .message-box { background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #10b981; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0; font-size: 24px; font-weight: bold;">Yeni İletişim Mesajı</h1>
                <p style="margin: 10px 0 0; opacity: 0.9; color: #ff0000;">Wingcrea Studio'ya yeni bir mesaj geldi</p>
              </div>
              <div class="content" style="background: #f9fafb; padding: 30px; border-radius: 0 0 12px 12px;">
                <div class="field">
                  <div class="label">İsim: ${name}</div>
                </div>
                <div class="field">
                  <div class="label">Email: <a href="mailto:${email}" style="color: #8b5cf6;">${email}</a></div>
                </div>
                ${company ? `
                <div class="field">
                  <div class="label">Şirket: ${company}</div>
                </div>
                ` : ''}
                ${budget ? `
                <div class="field">
                  <div class="label">Bütçe: ${budget}</div>
                </div>
                ` : ''}
                <div class="message-box">
                  <div class="label">Mesaj:</div>
                  <div class="value" style="white-space: pre-wrap;">${message}</div>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ 
      success: true, 
      message: 'Mesajınız başarıyla gönderildi' 
    });
  } catch (error) {
    console.error('📧 Email gönderme hatası:', error);
    
    // Detaylı hata mesajı
    const errorMessage = error instanceof Error ? error.message : 'Bilinmeyen hata';
    
    return NextResponse.json(
      { error: `Mesaj gönderilemedi: ${errorMessage}` },
      { status: 500 }
    );
  }
}