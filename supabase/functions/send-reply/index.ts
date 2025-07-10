import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.50.3/+esm";
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type"
};
const MAILERSEND_API_KEY = "mlsn.d82758ef5e6d82ccbbcbc52a2167fa4bea477ef249cda21cc145d29b30d99d41";
const FROM_EMAIL = "no-reply@test-zkq340ey396gd796.mlsender.net";
const supabaseUrl = "https://btwbkfguvamrcwfxjurh.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ0d2JrZmd1dmFtcmN3ZnhqdXJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE4MDA0MDYsImV4cCI6MjA2NzM3NjQwNn0.uNC-X9ofnASf4ndqNwlWmrfWdGecynCPVF9Le1eCGWk";
const supabase = createClient(supabaseUrl, supabaseKey);
const handler = async (req)=>{
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: corsHeaders
    });
  }
  try {
    const { consultation_id, user_email, user_name, reply_message, consultation_type, is_follow_up } = await req.json();
    if (!user_email || !user_email.includes("@")) {
      return new Response(JSON.stringify({
        success: false,
        error: "عنوان البريد غير صالح"
      }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders
        }
      });
    }
    const subject = `${is_follow_up ? "رد متابعة" : "رد على استشارتك"} - منصة شور`;
    const html = `
      <div dir="rtl" style="font-family: Arial; max-width: 600px; margin: auto; padding: 20px;">
        <h2>عزيزي/عزيزتي ${user_name ?? "العميل"}،</h2>
        <p>${reply_message}</p>
        <hr />
        <p style="font-size: 12px; color: gray;">لا ترد على هذا البريد، لأنّه آلي.</p>
      </div>
    `;
    const mailerResponse = await fetch("https://api.mailersend.com/v1/email", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${MAILERSEND_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: {
          email: FROM_EMAIL,
          name: "منصة شور"
        },
        to: [
          {
            email: user_email,
            name: user_name
          }
        ],
        subject,
        html,
        text: reply_message
      })
    });
    if (!mailerResponse.ok) {
      const errorText = await mailerResponse.text();
      console.error("MailerSend Error:", errorText);
      return new Response(JSON.stringify({
        success: false,
        error: "MailerSend error: " + errorText
      }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders
        }
      });
    }
    if (!is_follow_up && consultation_id) {
      const { error: updateError } = await supabase.from("consultations").update({
        status: "reviewed",
        updated_at: new Date().toISOString()
      }).eq("id", consultation_id);
      if (updateError) {
        console.error("Supabase update error:", updateError);
        return new Response(JSON.stringify({
          success: false,
          error: "فشل تحديث الحالة"
        }), {
          status: 500,
          headers: {
            "Content-Type": "application/json",
            ...corsHeaders
          }
        });
      }
    }
    return new Response(JSON.stringify({
      success: true,
      message: "تم الإرسال بنجاح"
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders
      }
    });
  } catch (err) {
    console.error("Unhandled error:", err);
    return new Response(JSON.stringify({
      success: false,
      error: err instanceof Error ? err.message : "خطأ غير متوقع"
    }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders
      }
    });
  }
};
serve(handler);
