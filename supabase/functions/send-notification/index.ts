
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend("re_M3PU9ZZZ_GjjnBe16FeWVW7QrEf5CbKh8");

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

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, consultation_type, message }: NotificationRequest = await req.json();

    console.log('Sending notification for:', { name, email, consultation_type });

    // إرسال إيميل إشعار للإدارة
    const adminEmailResponse = await resend.emails.send({
      from: "نظام الاستشارات <noreply@extrabitfree.com>",
      to: ["alsubaie.dr@gmail.com"],
      subject: `استشارة جديدة من ${name}`,
      html: `
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
    });

    // إرسال إيميل تأكيد للمراجع
    const confirmationEmailResponse = await resend.emails.send({
      from: "د. عبدالله السبيعي <noreply@extrabitfree.com>",
      to: [email],
      subject: "تم استلام استشارتك بنجاح",
      html: `
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
    });

    console.log('Emails sent successfully:', { adminEmailResponse, confirmationEmailResponse });

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
