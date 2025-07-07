
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface NotificationRequest {
  name: string;
  email: string;
  consultation_type: string;
  message: string;
}

const sendMailerSendEmail = async (to: string[], subject: string, html: string, from?: string) => {
  const MAILERSEND_API_KEY = Deno.env.get("MAILERSEND_API_KEY");
  
  if (!MAILERSEND_API_KEY) {
    throw new Error("MAILERSEND_API_KEY is not configured");
  }

  const response = await fetch("https://api.mailersend.com/v1/email", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${MAILERSEND_API_KEY}`,
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest"
    },
    body: JSON.stringify({
      from: {
        email: from || "noreply@extrabitfree.com",
        name: "د. عبدالله السبيعي"
      },
      to: to.map(email => ({ email })),
      subject,
      html
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("MailerSend error:", errorText);
    throw new Error(`MailerSend API error: ${response.status} - ${errorText}`);
  }

  return await response.json();
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, consultation_type, message }: NotificationRequest = await req.json();

    console.log('Sending notification for:', { name, email, consultation_type });

    // إرسال إيميل إشعار للإدارة
    const adminEmailResponse = await sendMailerSendEmail(
      ["alsubaie.dr@gmail.com"],
      `استشارة جديدة من ${name}`,
      `
        <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #1a365d; color: white; padding: 20px; text-align: center;">
            <h2 style="margin: 0;">استشارة جديدة</h2>
          </div>
          <div style="background: #f8f9fa; padding: 20px;">
            <p><strong>الاسم:</strong> ${name}</p>
            <p><strong>البريد الإلكتروني:</strong> ${email}</p>
            <p><strong>نوع الاستشارة:</strong> ${consultation_type === 'medical' ? 'طبية' : 'شخصية'}</p>
            <div style="background: white; padding: 15px; border-radius: 5px; margin: 15px 0;">
              <p><strong>الرسالة:</strong></p>
              <p style="white-space: pre-wrap;">${message}</p>
            </div>
            <div style="text-align: center; margin-top: 20px;">
              <a href="https://extrabitfree.com/admin" style="background: #1a365d; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">الذهاب للوحة التحكم</a>
            </div>
          </div>
        </div>
      `,
      "noreply@extrabitfree.com"
    );

    // إرسال إيميل تأكيد للمراجع
    const confirmationEmailResponse = await sendMailerSendEmail(
      [email],
      "تم استلام استشارتك بنجاح",
      `
        <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #1a365d; color: white; padding: 30px; text-align: center;">
            <h1 style="margin: 0;">د. عبدالله السبيعي</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">استشاري الطب النفسي</p>
          </div>
          <div style="background: #f8f9fa; padding: 30px;">
            <p style="font-size: 16px;"><strong>عزيزي/عزيزتي ${name}،</strong></p>
            <div style="background: #d4edda; border: 1px solid #c3e6cb; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <p style="margin: 0; color: #155724;">✅ تم استلام استشارتك بنجاح وسيتم الرد عليها في أقرب وقت ممكن.</p>
            </div>
            <p>نوع الاستشارة: <strong>${consultation_type === 'medical' ? 'طبية' : 'شخصية'}</strong></p>
            <p>سيتم إرسال الرد على نفس هذا البريد الإلكتروني.</p>
            <div style="background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <p style="margin: 0; color: #856404;">
                <strong>ملاحظة:</strong> يرجى عدم الرد على هذا الإيميل. سيتم إرسال رد الطبيب على إيميل منفصل.
              </p>
            </div>
            <div style="text-align: center; margin-top: 30px;">
              <p style="color: #6c757d; font-size: 12px;">
                د. عبدالله السبيعي - استشاري الطب النفسي<br>
                هذه رسالة تلقائية، يرجى عدم الرد عليها
              </p>
            </div>
          </div>
        </div>
      `,
      "consult@extrabitfree.com"
    );

    console.log('Emails sent successfully via MailerSend:', { adminEmailResponse, confirmationEmailResponse });

    return new Response(JSON.stringify({ 
      success: true, 
      adminEmail: adminEmailResponse,
      confirmationEmail: confirmationEmailResponse 
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error sending emails:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
