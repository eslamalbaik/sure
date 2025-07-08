// import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

// const corsHeaders = {
//   "Access-Control-Allow-Origin": "*",
//   "Access-Control-Allow-Headers":
//     "authorization, x-client-info, apikey, content-type",
// };

// const MAILERSEND_API_KEY = "mlsn.6c3c2212f1de8b4b35bb684074aada2f21654748e3ea5cf7d95e6dd979553dcf";

// interface NotificationRequest {
//   name: string;
//   email: string;
//   consultation_type: string;
//   message: string;
// }

// // تحسين دالة إرسال البريد مع إضافة المزيد من التحقق ومعالجة الأخطاء
// const sendMailerSendEmail = async (
//   to: string[],
//   subject: string,
//   html: string,
//   from?: string,
//   fromName?: string
// ) => {
//   if (!MAILERSEND_API_KEY) {
//     throw new Error("MAILERSEND_API_KEY is not configured");
//   }

//   // التحقق من صحة المدخلات
//   if (!Array.isArray(to) || to.length === 0) {
//     throw new Error("يجب تحديد مستلم واحد على الأقل");
//   }

//   const validEmails = to.filter(email => 
//     /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
//   );

//   if (validEmails.length === 0) {
//     throw new Error("لا توجد عناوين بريد إلكتروني صالحة للمستلمين");
//   }

//   const senderEmail = from || "eslamahmad2000t@gmail.com";
//   if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(senderEmail)) {
//     throw new Error("عنوان البريد الإلكتروني للمرسل غير صالح");
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
//           name: fromName || "د. عبدالله السبيعي"
//         },
//         to: validEmails.map(email => ({ email })),
//         subject,
//         html,
//         text: html.replace(/<[^>]*>/g, "") // إضافة نسخة نصية للبريد
//       })
//     });

//     if (!response.ok) {
//       const errorData = await response.json().catch(() => ({}));
//       console.error("تفاصيل خطأ MailerSend:", {
//         status: response.status,
//         error: errorData
//       });
//       throw new Error(`فشل إرسال البريد: ${errorData.message || response.statusText}`);
//     }

//     return await response.json();
//   } catch (error) {
//     console.error("خطأ في الشبكة أثناء إرسال البريد:", error);
//     throw new Error("فشل إرسال البريد بسبب مشكلة في الشبكة");
//   }
// };

// const handler = async (req: Request): Promise<Response> => {
//   if (req.method === "OPTIONS") {
//     return new Response(null, { headers: corsHeaders });
//   }

//   try {
//     const { name, email, consultation_type, message }: NotificationRequest = await req.json();

//     // التحقق من صحة البيانات الواردة
//     if (!name || !email || !consultation_type || !message) {
//       throw new Error("جميع الحقول مطلوبة: الاسم، البريد الإلكتروني، نوع الاستشارة، الرسالة");
//     }

//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
//       throw new Error("عنوان البريد الإلكتروني للمستلم غير صالح");
//     }

//     console.log('محاولة إرسال إشعارات ل:', { name, email, consultation_type });

//     // إرسال إيميل إشعار للإدارة
//     const adminEmailResponse = await sendMailerSendEmail(
//       ["eslamahmad2000t@gmail.com"],
//       `استشارة جديدة من ${name}`,
//       `
//         <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
//           <div style="background: #1a365d; color: white; padding: 20px; text-align: center;">
//             <h2 style="margin: 0;">استشارة جديدة</h2>
//           </div>
//           <div style="background: #f8f9fa; padding: 20px;">
//             <p><strong>الاسم:</strong> ${name}</p>
//             <p><strong>البريد الإلكتروني:</strong> ${email}</p>
//             <p><strong>نوع الاستشارة:</strong> ${consultation_type === 'medical' ? 'طبية' : 'شخصية'}</p>
//             <div style="background: white; padding: 15px; border-radius: 5px; margin: 15px 0;">
//               <p><strong>الرسالة:</strong></p>
//               <p style="white-space: pre-wrap;">${message}</p>
//             </div>
//             <div style="text-align: center; margin-top: 20px;">
//               <a href="https://extrabitfree.com/admin" style="background: #1a365d; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">الذهاب للوحة التحكم</a>
//             </div>
//           </div>
//         </div>
//       `,
//       "eslamahmad2000t@gmail.com",
//       "نظام إدارة الاستشارات"
//     );

//     // إرسال إيميل تأكيد للمراجع
//     const confirmationEmailResponse = await sendMailerSendEmail(
//       [email],
//       "تم استلام استشارتك بنجاح",
//       `
//         <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
//           <div style="background: #1a365d; color: white; padding: 30px; text-align: center;">
//             <h1 style="margin: 0;">د. عبدالله السبيعي</h1>
//             <p style="margin: 10px 0 0 0; opacity: 0.9;">استشاري الطب النفسي</p>
//           </div>
//           <div style="background: #f8f9fa; padding: 30px;">
//             <p style="font-size: 16px;"><strong>عزيزي/عزيزتي ${name}،</strong></p>
//             <div style="background: #d4edda; border: 1px solid #c3e6cb; padding: 15px; border-radius: 5px; margin: 20px 0;">
//               <p style="margin: 0; color: #155724;">✅ تم استلام استشارتك بنجاح وسيتم الرد عليها في أقرب وقت ممكن.</p>
//             </div>
//             <p>نوع الاستشارة: <strong>${consultation_type === 'medical' ? 'طبية' : 'شخصية'}</strong></p>
//             <p>سيتم إرسال الرد على نفس هذا البريد الإلكتروني.</p>
//             <div style="background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin: 20px 0;">
//               <p style="margin: 0; color: #856404;">
//                 <strong>ملاحظة:</strong> يرجى عدم الرد على هذا الإيميل. سيتم إرسال رد الطبيب على إيميل منفصل.
//               </p>
//             </div>
//             <div style="text-align: center; margin-top: 30px;">
//               <p style="color: #6c757d; font-size: 12px;">
//                 د. عبدالله السبيعي - استشاري الطب النفسي<br>
//                 هذه رسالة تلقائية، يرجى عدم الرد عليها
//               </p>
//             </div>
//           </div>
//         </div>
//       `,
//       "eslamahmad2000t@gmail.com",
//       "د. عبدالله السبيعي"
//     );

//     console.log('تم إرسال البريد بنجاح:', {
//       adminEmail: adminEmailResponse,
//       confirmationEmail: confirmationEmailResponse
//     });

//     return new Response(JSON.stringify({ 
//       success: true, 
//       message: "تم إرسال الإشعارات بنجاح",
//       adminEmail: { id: adminEmailResponse?.id, status: "sent" },
//       confirmationEmail: { id: confirmationEmailResponse?.id, status: "sent" }
//     }), {
//       status: 200,
//       headers: {
//         "Content-Type": "application/json",
//         ...corsHeaders,
//       },
//     });
//   } catch (error: any) {
//     console.error("حدث خطأ أثناء إرسال الإشعارات:", error);
//     return new Response(
//       JSON.stringify({ 
//         success: false,
//         error: "فشل إرسال الإشعارات",
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
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend("re_Nph5FYP1_7pvvMHrvkZmoosU1tEDGL9jJ");

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

    const emailResponse = await resend.emails.send({
      from: "نظام الاستشارات <onboarding@resend.dev>",
      to: ["onboarding@resend.dev"],
      subject: `استشارة جديدة من ${name}`,
      html: `
        <div dir="rtl" style="font-family: Arial, sans-serif;">
          <h2>استشارة جديدة</h2>
          <p><strong>الاسم:</strong> ${name}</p>
          <p><strong>البريد الإلكتروني:</strong> ${email}</p>
          <p><strong>نوع الاستشارة:</strong> ${consultation_type === 'medical' ? 'طبية' : 'شخصية'}</p>
          <p><strong>الرسالة:</strong></p>
          <p style="background: #f5f5f5; padding: 15px; border-radius: 5px;">${message}</p>
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