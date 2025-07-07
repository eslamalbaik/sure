
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend("re_ZLvsDaN4_9RtxHJXyquPebvYbi5YeKdWp");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ReplyRequest {
  consultation_id: string;
  user_email: string;
  user_name: string;
  reply_message: string;
  consultation_type: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { consultation_id, user_email, user_name, reply_message, consultation_type }: ReplyRequest = await req.json();

    const emailResponse = await resend.emails.send({
      from: "د. عبدالله السبيعي <consultation@extrabitfree.com>>",
      to: [user_email],
      subject: `رد على استشارتك - ${consultation_type === 'medical' ? 'استشارة طبية' : 'استشارة شخصية'}`,
      html: `
        <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #1a365d, #2d5aa0); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">رد من د. عبدالله السبيعي</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">استشاراتك تهمنا</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
            <p style="font-size: 16px; margin-bottom: 20px;"><strong>عزيزي/عزيزتي ${user_name}،</strong></p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; border-right: 4px solid #1a365d; margin: 20px 0;">
              <h3 style="color: #1a365d; margin-top: 0;">رد الطبيب:</h3>
              <p style="line-height: 1.6; color: #333; white-space: pre-wrap;">${reply_message}</p>
            </div>
            
            <div style="background: #e3f2fd; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0; font-size: 14px; color: #1565c0;">
                <strong>تنبيه:</strong> هذه رسالة أحادية الاتجاه ولا يمكن الرد عليها. إذا كنت بحاجة لاستشارة إضافية، يرجى زيارة الموقع وتقديم استشارة جديدة.
              </p>
            </div>
            
            <div style="text-align: center; margin-top: 30px;">
              <a href="https://your-website.com" style="background: #1a365d; color: white; padding: 12px 30px; border-radius: 6px; text-decoration: none; display: inline-block;">زيارة الموقع</a>
            </div>
            
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6;">
              <p style="color: #6c757d; font-size: 12px; margin: 0;">
                د. عبدالله السبيعي - استشاري الطب النفسي<br>
                هذه رسالة تلقائية، يرجى عدم الرد عليها
              </p>
            </div>
          </div>
        </div>
      `,
    });

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error sending reply:", error);
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
