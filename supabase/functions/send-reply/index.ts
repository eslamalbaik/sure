import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.50.3/+esm";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const RESEND_API_KEY = 're_Nph5FYP1_7pvvMHrvkZmoosU1tEDGL9jJ';
const resend = new Resend(RESEND_API_KEY);
const supabaseUrl = "https://btwbkfguvamrcwfxjurh.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ0d2JrZmd1dmFtcmN3ZnhqdXJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE4MDA0MDYsImV4cCI6MjA2NzM3NjQwNn0.uNC-X9ofnASf4ndqNwlWmrfWdGecynCPVF9Le1eCGWk";
const supabase = createClient(supabaseUrl, supabaseKey);

interface ReplyRequest {
  consultation_id: string;
  user_email: string;
  user_name: string;
  reply_message: string;
  consultation_type: string;
  is_follow_up?: boolean;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { consultation_id, user_email, user_name, reply_message, consultation_type, is_follow_up }: ReplyRequest = await req.json();

    if (!user_email || !user_email.includes("@")) {
      return new Response(JSON.stringify({ success: false, error: "عنوان البريد الإلكتروني للمستلم غير صالح" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // Send email using Resend
    let emailResponse;
    try {
      emailResponse = await resend.emails.send({
        from: "د. عبدالله السبيعي <onboarding@resend.dev>",
        to: [user_email],
        subject: `${is_follow_up ? 'رد متابعة' : 'رد على استشارتك'} - ${consultation_type === 'medical' ? 'استشارة طبية' : 'استشارة شخصية'}`,
        html: `
          <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #1a365d, #2d5aa0); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
              <h1 style="margin: 0; font-size: 24px;">رد من د. عبدالله السبيعي</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">${is_follow_up ? 'رد متابعة' : 'استشاراتك تهمنا'}</p>
            </div>
            <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
              <p style="font-size: 16px; margin-bottom: 20px;"><strong>عزيزي/عزيزتي ${user_name}،</strong></p>
              <div style="background: white; padding: 20px; border-radius: 8px; border-right: 4px solid #1a365d; margin: 20px 0;">
                <h3 style="color: #1a365d; margin-top: 0;">${is_follow_up ? 'رد المتابعة:' : 'رد الطبيب:'}</h3>
                <p style="line-height: 1.6; color: #333; white-space: pre-wrap;">${reply_message}</p>
              </div>
              <div style="background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 0; font-size: 14px; color: #856404;">
                  <strong>تنبيه مهم:</strong> هذه رسالة أحادية الاتجاه ولا يمكن الرد عليها مباشرة.
                </p>
              </div>
              <div style="text-align: center; margin-top: 30px;">
                <a href="https://extrabitfree.com" style="background: #1a365d; color: white; padding: 12px 30px; border-radius: 6px; text-decoration: none; display: inline-block; margin-right: 10px;">زيارة الموقع</a>
                <a href="tel:+966123456789" style="background: #28a745; color: white; padding: 12px 30px; border-radius: 6px; text-decoration: none; display: inline-block;">اتصل بنا</a>
              </div>
            </div>
          </div>
        `,
        text: reply_message
      });
    } catch (emailError) {
      console.error("Resend API error:", emailError);
      return new Response(JSON.stringify({ success: false, error: "فشل إرسال البريد: " + (emailError?.message ?? emailError) }), {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // Update consultation status if not follow-up
    if (!is_follow_up) {
      const { error: updateError } = await supabase
        .from('consultations')
        .update({
          status: 'reviewed',
          updated_at: new Date().toISOString()
        })
        .eq('id', consultation_id);

      if (updateError) {
        console.error("Supabase update error:", updateError);
        return new Response(JSON.stringify({ success: false, error: "فشل تحديث حالة الاستشارة: " + updateError.message }), {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }
    }

    return new Response(JSON.stringify({
      success: true,
      emailId: emailResponse?.id,
      consultationUpdated: !is_follow_up
    }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });

  } catch (error) {
    console.error("Error in handler:", error);
    return new Response(JSON.stringify({
      success: false,
      error: error instanceof Error ? error.message : "حدث خطأ أثناء معالجة الطلب",
      ...(Deno.env.get("DENO_ENV") === "development" && { stack: error instanceof Error ? error.stack : undefined })
    }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
};

serve(handler);
