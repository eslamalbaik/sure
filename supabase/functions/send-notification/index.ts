import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "https://shor.solutions",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};

const MAILERSEND_API_KEY = "mlsn.34f21d3d00ae4a31b4bf336208c1aa7ba8c3e23d2649618ee793ab581caee0a0";
const FROM_EMAIL = "noreply@extrabitfree.com";

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

    const emailData = {
      from: {
        email: FROM_EMAIL,
        name: "شور للإستشارات"
      },
      to: [
        {
          email: "shoorconsulting@gmail.com",
          name: "إدارة شور للإستشارات"
        }
      ],
      subject: "إشعار استشارة جديدة - منصة شور للإستشارات",
      html: `
        <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #1a365d, #2d5aa0); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">استشارة جديدة</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">تم استلام استشارة جديدة على منصة شور للإستشارات</p>
          </div>
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
            <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h3 style="color: #1a365d; margin-top: 0;">معلومات المستشار</h3>
              <p><strong>الاسم:</strong> ${name}</p>
              <p><strong>البريد الإلكتروني:</strong> ${email}</p>
              <p><strong>نوع الاستشارة:</strong> ${consultation_type === 'medical' ? 'طبية' : 'شخصية'}</p>
            </div>
            <div style="background: white; padding: 20px; border-radius: 8px; border-right: 4px solid #1a365d;">
              <h3 style="color: #1a365d; margin-top: 0;">محتوى الاستشارة:</h3>
              <p style="line-height: 1.6; color: #333;">${message}</p>
            </div>
            <div style="text-align: center; margin-top: 30px;">
              <a href="/" style="background: #1a365d; color: white; padding: 12px 30px; border-radius: 6px; text-decoration: none; display: inline-block;">الذهاب إلى لوحة التحكم</a>
            </div>
          </div>
        </div>
      `,
      text: `استشارة جديدة من ${name}: ${message}`
    };

    const emailResponse = await fetch('https://api.mailersend.com/v1/email', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${MAILERSEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData)
    });

    if (!emailResponse.ok) {
      const errorData = await emailResponse.text();
      console.error("MailerSend API error:", errorData);
      throw new Error(errorData);
    }

    const result = await emailResponse.json();

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error sending notification:", error);
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