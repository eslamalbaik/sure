
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.3';

const resend = new Resend("re_M3PU9ZZZ_GjjnBe16FeWVW7QrEf5CbKh8");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const supabaseUrl = "https://btwbkfguvamrcwfxjurh.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ0d2JrZmd1dmFtcmN3ZnhqdXJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE4MDA0MDYsImV4cCI6MjA2NzM3NjQwNn0.uNC-X9ofnASf4ndqNwlWmrfWdGecynCPVF9Le1eCGWk";

const supabase = createClient(supabaseUrl, supabaseKey);

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { user_email } = await req.json();

    // التحقق من وجود رد تلقائي سابق
    const { data: existingReply } = await supabase
      .from('auto_reply_log')
      .select('*')
      .eq('user_email', user_email)
      .limit(1);

    if (existingReply && existingReply.length > 0) {
      return new Response(JSON.stringify({ message: "Auto reply already sent" }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      });
    }

    const emailResponse = await resend.emails.send({
      from: "نظام الاستشارات <no-reply@extrabitfree.com>",
      to: [user_email],
      subject: "رد تلقائي - لا يمكن الرد على هذه الرسالة",
      html: `
        <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: #dc3545; color: white; padding: 20px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="margin: 0; font-size: 20px;">رد تلقائي</h1>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
            <p style="font-size: 16px; margin-bottom: 20px;"><strong>عزيزي المراجع الكريم،</strong></p>
            
            <div style="background: #fff3cd; border: 1px solid #ffeaa7; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0; font-size: 16px; color: #856404; line-height: 1.6;">
                <strong>لا يمكن التواصل مع الدكتور مباشرة. يرجى تقديم استشارة جديدة لبدء محادثة جديدة.</strong>
              </p>
            </div>
            
            <p style="color: #666; line-height: 1.6;">
              هذا الإيميل مخصص لإرسال الردود من الدكتور فقط ولا يتم مراقبته للردود الواردة.
              إذا كنت بحاجة لطرح سؤال جديد أو استشارة إضافية، يرجى زيارة الموقع وتقديم طلب جديد.
            </p>
            
            <div style="text-align: center; margin-top: 30px;">
              <a href="https://extrabitfree.com" style="background: #1a365d; color: white; padding: 12px 30px; border-radius: 6px; text-decoration: none; display: inline-block;">تقديم استشارة جديدة</a>
            </div>
            
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6;">
              <p style="color: #6c757d; font-size: 12px; margin: 0;">
                هذه رسالة تلقائية من نظام الاستشارات<br>
                د. عبدالله السبيعي - استشاري الطب النفسي
              </p>
            </div>
          </div>
        </div>
      `,
    });

    // تسجيل الرد التلقائي
    await supabase
      .from('auto_reply_log')
      .insert({
        consultation_id: 'auto-reply',
        user_email
      });

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error sending auto reply:", error);
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
