// import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
// import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.3';

// const MAILERSEND_API_KEY = "mlsn.6c3c2212f1de8b4b35bb684074aada2f21654748e3ea5cf7d95e6dd979553dcf";

// const corsHeaders = {
//   "Access-Control-Allow-Origin": "*",
//   "Access-Control-Allow-Headers":
//     "authorization, x-client-info, apikey, content-type",
// };

// const supabaseUrl = "https://btwbkfguvamrcwfxjurh.supabase.co";
// const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ0d2JrZmd1dmFtcmN3ZnhqdXJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE4MDA0MDYsImV4cCI6MjA2NzM3NjQwNn0.uNC-X9ofnASf4ndqNwlWmrfWdGecynCPVF9Le1eCGWk";

// const supabase = createClient(supabaseUrl, supabaseKey);

// const sendMailerSendEmail = async (to: string[], subject: string, html: string, from?: string) => {
//   if (!MAILERSEND_API_KEY) {
//     throw new Error("MAILERSEND_API_KEY is not configured");
//   }

//   // تحقق من أن عنوان البريد الإلكتروني المرسل صالح
//   const senderEmail = from || "eslamahmad2000t@gmail.com";
//   if (!senderEmail.includes("@")) {
//     throw new Error("Invalid sender email address");
//   }

//   // تحقق من أن هناك مستلمين على الأقل
//   if (!to || to.length === 0) {
//     throw new Error("No recipients specified");
//   }

//   // تحقق من صحة عناوين البريد الإلكتروني للمستلمين
//   const validRecipients = to.filter(email => email.includes("@"));
//   if (validRecipients.length === 0) {
//     throw new Error("No valid recipient email addresses");
//   }

//   try {
//     const response = await fetch("https://api.mailersend.com/v1/email", {
//       method: "POST",
//       headers: {
//         "Authorization": `Bearer ${MAILERSEND_API_KEY}`,
//         "Content-Type": "application/json",
//         "X-Requested-With": "XMLHttpRequest"
//       },
//       body: JSON.stringify({
//         from: {
//           email: senderEmail,
//           name: "نظام الردود التلقائية"
//         },
//         to: validRecipients.map(email => ({ email })),
//         subject,
//         html,
//         text: "لا يمكن التواصل مع الدكتور مباشرة عبر الرد على هذا الإيميل. يرجى تقديم استشارة جديدة لبدء محادثة جديدة."
//       })
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       console.error("MailerSend API error details:", errorData);
//       throw new Error(`MailerSend API error: ${response.status} - ${errorData.message || 'Unknown error'}`);
//     }

//     return await response.json();
//   } catch (error) {
//     console.error("Network error while sending email:", error);
//     throw new Error("Failed to send email due to network error");
//   }
// };

// const handler = async (req: Request): Promise<Response> => {
//   if (req.method === "OPTIONS") {
//     return new Response(null, { headers: corsHeaders });
//   }

//   try {
//     const { user_email, from_address } = await req.json();

//     if (!user_email || !user_email.includes("@")) {
//       throw new Error("Invalid recipient email address");
//     }

//     console.log('Auto-reply triggered for:', { user_email, from_address });

//     // التحقق من وجود رد تلقائي سابق
//     const { data: existingReply, error: queryError } = await supabase
//       .from('auto_reply_log')
//       .select('*')
//       .eq('user_email', user_email)
//       .limit(1);

//     if (queryError) {
//       throw new Error(`Supabase query error: ${queryError.message}`);
//     }

//     if (existingReply && existingReply.length > 0) {
//       console.log('Auto reply already sent to:', user_email);
//       return new Response(JSON.stringify({ message: "Auto reply already sent" }), {
//         status: 200,
//         headers: {
//           "Content-Type": "application/json",
//           ...corsHeaders,
//         },
//       });
//     }

//     const emailResponse = await sendMailerSendEmail(
//       [user_email],
//       "رد تلقائي - لا يمكن الرد على هذه الرسالة",
//       `
//         <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
//           <div style="background: #dc3545; color: white; padding: 20px; border-radius: 10px 10px 0 0; text-align: center;">
//             <h1 style="margin: 0; font-size: 20px;">⚠️ رد تلقائي</h1>
//           </div>
          
//           <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
//             <p style="font-size: 16px; margin-bottom: 20px;"><strong>عزيزي المراجع الكريم،</strong></p>
            
//             <div style="background: #fff3cd; border: 1px solid #ffeaa7; padding: 20px; border-radius: 8px; margin: 20px 0;">
//               <p style="margin: 0; font-size: 16px; color: #856404; line-height: 1.6; text-align: center;">
//                 <strong>لا يمكن التواصل مع الدكتور مباشرة عبر الرد على هذا الإيميل</strong><br>
//                 <strong>يرجى تقديم استشارة جديدة لبدء محادثة جديدة</strong>
//               </p>
//             </div>
            
//             <div style="background: #d1ecf1; border: 1px solid #bee5eb; padding: 15px; border-radius: 8px; margin: 20px 0;">
//               <p style="margin: 0; color: #0c5460; line-height: 1.6;">
//                 <strong>كيفية التواصل:</strong><br>
//                 • قم بزيارة الموقع الإلكتروني<br>
//                 • أرسل استشارة جديدة<br>
//                 • أو اتصل بنا مباشرة
//               </p>
//             </div>
            
//             <p style="color: #666; line-height: 1.6; font-size: 14px;">
//               هذا الإيميل مخصص لإرسال الردود من الدكتور فقط ولا يتم مراقبته للردود الواردة.
//               إذا كنت بحاجة لطرح سؤال جديد أو استشارة إضافية، يرجى استخدام الطرق المذكورة أعلاه.
//             </p>
            
//             <div style="text-align: center; margin-top: 30px;">
//               <a href="https://extrabitfree.com" style="background: #1a365d; color: white; padding: 12px 30px; border-radius: 6px; text-decoration: none; display: inline-block; margin-right: 10px;">تقديم استشارة جديدة</a>
//               <a href="tel:+966123456789" style="background: #28a745; color: white; padding: 12px 30px; border-radius: 6px; text-decoration: none; display: inline-block;">اتصل بنا</a>
//             </div>
            
//             <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6;">
//               <p style="color: #6c757d; font-size: 12px; margin: 0;">
//                 هذه رسالة تلقائية من نظام الاستشارات<br>
//                 د. عبدالله السبيعي - استشاري الطب النفسي
//               </p>
//             </div>
//           </div>
//         </div>
//       `,
//       from_address || "eslamahmad2000t@gmail.com"
//     );

//     // تسجيل الرد التلقائي
//     const { error: insertError } = await supabase
//       .from('auto_reply_log')
//       .insert({
//         consultation_id: 'auto-reply-' + Date.now(),
//         user_email,
//         sent_at: new Date().toISOString()
//       });

//     if (insertError) {
//       throw new Error(`Failed to log auto-reply: ${insertError.message}`);
//     }

//     console.log('Auto-reply sent successfully via MailerSend:', emailResponse);

//     return new Response(JSON.stringify({ 
//       success: true,
//       message: "Auto-reply sent successfully",
//       details: emailResponse
//     }), {
//       status: 200,
//       headers: {
//         "Content-Type": "application/json",
//         ...corsHeaders,
//       },
//     });
//   } catch (error: any) {
//     console.error("Error sending auto reply:", error);
//     return new Response(
//       JSON.stringify({ 
//         error: "Failed to send auto-reply",
//         details: error.message 
//       }),
//       {
//         status: 500,
//         headers: { "Content-Type": "application/json", ...corsHeaders },
//       }
//     );
//   }
// };

// serve(handler);

import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.3';
import { Resend } from "https://esm.sh/resend@2.0.0";

const RESEND_API_KEY = "re_Nph5FYP1_7pvvMHrvkZmoosU1tEDGL9jJ"; // استبدل بمفتاح Resend API الخاص بك

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const supabaseUrl = "https://btwbkfguvamrcwfxjurh.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ0d2JrZmd1dmFtcmN3ZnhqdXJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE4MDA0MDYsImV4cCI6MjA2NzM3NjQwNn0.uNC-X9ofnASf4ndqNwlWmrfWdGecynCPVF9Le1eCGWk";

const supabase = createClient(supabaseUrl, supabaseKey);

const sendResendEmail = async (to: string[], subject: string, html: string, from?: string) => {
  if (!RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is not configured");
  }

  // تحقق من أن عنوان البريد الإلكتروني المرسل صالح
  const senderEmail = from || "onboarding@resend.dev";
  if (!senderEmail.includes("@")) {
    throw new Error("Invalid sender email address");
  }

  // تحقق من أن هناك مستلمين على الأقل
  if (!to || to.length === 0) {
    throw new Error("No recipients specified");
  }

  // تحقق من صحة عناوين البريد الإلكتروني للمستلمين
  const validRecipients = to.filter(email => email.includes("@"));
  if (validRecipients.length === 0) {
    throw new Error("No valid recipient email addresses");
  }

  try {
    const resend = new Resend(RESEND_API_KEY);

    const { data, error } = await resend.emails.send({
      from: `نظام الردود التلقائية <${senderEmail}>`,
      to: validRecipients,
      subject,
      html,
      text: "لا يمكن التواصل مع الدكتور مباشرة عبر الرد على هذا الإيميل. يرجى تقديم استشارة جديدة لبدء محادثة جديدة."
    });

    if (error) {
      console.error("Resend API error details:", error);
      throw new Error(`Resend API error: ${error.message}`);
    }

    return data;
  } catch (error) {
    console.error("Network error while sending email:", error);
    throw new Error("Failed to send email due to network error");
  }
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { user_email, from_address } = await req.json();

    if (!user_email || !user_email.includes("@")) {
      throw new Error("Invalid recipient email address");
    }

    console.log('Auto-reply triggered for:', { user_email, from_address });

    // التحقق من وجود رد تلقائي سابق
    const { data: existingReply, error: queryError } = await supabase
      .from('auto_reply_log')
      .select('*')
      .eq('user_email', user_email)
      .limit(1);

    if (queryError) {
      throw new Error(`Supabase query error: ${queryError.message}`);
    }

    if (existingReply && existingReply.length > 0) {
      console.log('Auto reply already sent to:', user_email);
      return new Response(JSON.stringify({ message: "Auto reply already sent" }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      });
    }

    const emailResponse = await sendResendEmail(
      [user_email],
      "رد تلقائي - لا يمكن الرد على هذه الرسالة",
      `
        <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: #dc3545; color: white; padding: 20px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="margin: 0; font-size: 20px;">⚠️ رد تلقائي</h1>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
            <p style="font-size: 16px; margin-bottom: 20px;"><strong>عزيزي المراجع الكريم،</strong></p>
            
            <div style="background: #fff3cd; border: 1px solid #ffeaa7; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0; font-size: 16px; color: #856404; line-height: 1.6; text-align: center;">
                <strong>لا يمكن التواصل مع الدكتور مباشرة عبر الرد على هذا الإيميل</strong><br>
                <strong>يرجى تقديم استشارة جديدة لبدء محادثة جديدة</strong>
              </p>
            </div>
            
            <div style="background: #d1ecf1; border: 1px solid #bee5eb; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0; color: #0c5460; line-height: 1.6;">
                <strong>كيفية التواصل:</strong><br>
                • قم بزيارة الموقع الإلكتروني<br>
                • أرسل استشارة جديدة<br>
                • أو اتصل بنا مباشرة
              </p>
            </div>
            
            <p style="color: #666; line-height: 1.6; font-size: 14px;">
              هذا الإيميل مخصص لإرسال الردود من الدكتور فقط ولا يتم مراقبته للردود الواردة.
              إذا كنت بحاجة لطرح سؤال جديد أو استشارة إضافية، يرجى استخدام الطرق المذكورة أعلاه.
            </p>
            
            <div style="text-align: center; margin-top: 30px;">
              <a href="http://localhost:8081/" style="background: #1a365d; color: white; padding: 12px 30px; border-radius: 6px; text-decoration: none; display: inline-block; margin-right: 10px;">تقديم استشارة جديدة</a>
              <a href="tel:+966123456789" style="background: #28a745; color: white; padding: 12px 30px; border-radius: 6px; text-decoration: none; display: inline-block;">اتصل بنا</a>
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
      from_address || "onboarding@resend.dev"
    );

    // تسجيل الرد التلقائي
    const { error: insertError } = await supabase
      .from('auto_reply_log')
      .insert({
        consultation_id: 'auto-reply-' + Date.now(),
        user_email,
        sent_at: new Date().toISOString()
      });

    if (insertError) {
      throw new Error(`Failed to log auto-reply: ${insertError.message}`);
    }

    console.log('Auto-reply sent successfully via Resend:', emailResponse);

    return new Response(JSON.stringify({ 
      success: true,
      message: "Auto-reply sent successfully",
      details: emailResponse
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error sending auto reply:", error);
    return new Response(
      JSON.stringify({ 
        error: "Failed to send auto-reply",
        details: error.message 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);