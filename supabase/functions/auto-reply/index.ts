import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const MAILERSEND_API_KEY = "mlsn.34f21d3d00ae4a31b4bf336208c1aa7ba8c3e23d2649618ee793ab581caee0a0";
const FROM_EMAIL = "noreply@extrabitfree.com";
const supabaseUrl = "https://btwbkfguvamrcwfxjurh.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ0d2JrZmd1dmFtcmN3ZnhqdXJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE4MDA0MDYsImV4cCI6MjA2NzM3NjQwNn0.uNC-X9ofnASf4ndqNwlWmrfWdGecynCPVF9Le1eCGWk";

const supabase = createClient(supabaseUrl, supabaseKey);

interface AutoReplyRequest {
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
    const { name, email, consultation_type, message }: AutoReplyRequest = await req.json();

    if (!email || !email.includes("@")) {
      return new Response(JSON.stringify({ success: false, error: "عنوان البريد الإلكتروني للمستلم غير صالح" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    console.log("Sending auto-reply to:", email);

    // التحقق من وجود رد تلقائي سابق في آخر 24 ساعة
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const { data: existingReply, error: queryError } = await supabase
      .from('auto_reply_log')
      .select('*')
      .eq('user_email', email)
      .gte('sent_at', oneDayAgo)
      .limit(1);

    if (queryError) {
      console.error("Supabase query error:", queryError);
    }

    if (existingReply && existingReply.length > 0) {
      console.log('Auto reply already sent to:', email);
      return new Response(JSON.stringify({ success: true, message: "Auto reply already sent" }), {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // Send auto-reply email using MailerSend
    try {
      const emailData = {
        from: {
          email: FROM_EMAIL,
          name: "شور للإستشارات"
        },
        to: [
          {
            email: email,
            name: name
          }
        ],
        subject: "تأكيد استلام استشارتك - منصة شور للإستشارات",
        html: `
          <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #1a365d, #2d5aa0); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
              <h1 style="margin: 0; font-size: 24px;">شكراً لاختيارك منصة شور للإستشارات</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">تم استلام استشارتك بنجاح</p>
            </div>
            <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
              <p style="font-size: 16px; margin-bottom: 20px;"><strong>عزيزي/عزيزتي ${name}،</strong></p>
              <div style="background: white; padding: 20px; border-radius: 8px; border-right: 4px solid #1a365d; margin: 20px 0;">
                <h3 style="color: #1a365d; margin-top: 0;">تم استلام استشارتك بنجاح</h3>
                <p style="line-height: 1.6; color: #333;">
                  شكراً لك على ثقتك في منصة شور للإستشارات. تم استلام ${consultation_type === 'medical' ? 'استشارتك الطبية' : 'استشارتك الشخصية'} وسيتم مراجعتها من قبل فريقنا المتخصص والرد عليك في أقرب وقت ممكن.
                </p>
                <p style="line-height: 1.6; color: #333; margin-top: 15px;">
                  يرجى العلم أن فريقنا يعمل على مدار الساعة لضمان تقديم أفضل الاستشارات وأكثرها دقة وفائدة لك.
                </p>
              </div>
              <div style="background: #e3f2fd; border: 1px solid #2196f3; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 0; font-size: 14px; color: #1565c0;">
                  <strong>ملاحظة:</strong> ستصلك رسالة بريد إلكتروني تحتوي على رد مفصل من المتخصصين لدينا خلال 24-48 ساعة.
                </p>
              </div>
              <div style="text-align: center; margin-top: 30px;">
                <a href="/" style="background: #1a365d; color: white; padding: 12px 30px; border-radius: 6px; text-decoration: none; display: inline-block; margin-right: 10px;">زيارة الموقع</a>
                <a href="tel:+966123456789" style="background: #28a745; color: white; padding: 12px 30px; border-radius: 6px; text-decoration: none; display: inline-block;">اتصل بنا</a>
              </div>
            </div>
          </div>
        `,
        text: `شكراً ${name}، تم استلام استشارتك وسيتم الرد عليك قريباً.`
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

      // تسجيل الرد التلقائي في قاعدة البيانات
      const { error: insertError } = await supabase
        .from('auto_reply_log')
        .insert({
          consultation_id: 'auto-reply-' + Date.now(),
          user_email: email,
          sent_at: new Date().toISOString()
        });

      if (insertError) {
        console.error("Failed to log auto-reply:", insertError);
      }

      return new Response(JSON.stringify({
        success: true,
        message: "Auto-reply sent successfully"
      }), {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });

    } catch (emailError) {
      console.error("MailerSend API error:", emailError);
      return new Response(JSON.stringify({ success: false, error: "فشل إرسال البريد: " + (emailError?.message ?? emailError) }), {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

  } catch (error) {
    console.error("Error in handler:", error);
    return new Response(JSON.stringify({
      success: false,
      error: error instanceof Error ? error.message : "حدث خطأ أثناء معالجة الطلب"
    }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
};

serve(handler);