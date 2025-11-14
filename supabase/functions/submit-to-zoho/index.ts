import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { name, email, fileNumber, mobile, question, lastVisit, attachmentUrls } = await req.json();

    console.log(
      "📥 Received data:",
      JSON.stringify({ name, email, fileNumber, mobile, question, lastVisit, attachmentUrls }, null, 2)
    );

    const ZOHO_ACTION_URL = "https://crm.zoho.com/crm/WebToLeadForm";
    const ZOHO_XNQSJSDP = "e61e4a39d0716797531efaff40c744c5fd75fc2c1af8f69503b1482195a095e5";
    const ZOHO_XMLWTLD =
      "e98ccde8d1d67834250744ce4897a15058d3d09c6050285688a2863753878a0f222191003764f0a3c94ab5ee32c4f8c4";
    const ZOHO_ACTION_TYPE = "TGVhZHM=";

    const fullDescription = `الاستشارة: ${question}

--- تفاصيل إضافية ---
رقم الملف: ${fileNumber}
تاريخ آخر زيارة: ${lastVisit}

روابط المرفقات:
${attachmentUrls && attachmentUrls.length > 0 ? attachmentUrls.join("\n") : "لا توجد مرفقات"}`;

    const formData = new URLSearchParams();
    formData.append("xnQsjsdp", ZOHO_XNQSJSDP);
    formData.append("zc_gad", "");
    formData.append("xmIwtLD", ZOHO_XMLWTLD);
    formData.append("actionType", ZOHO_ACTION_TYPE);
    formData.append("returnURL", "null");
    formData.append("Email", email || "");
    formData.append("Mobile", mobile || "");
    formData.append("First Name", "");
    formData.append("Company", "Medical Consultation");
    formData.append("Last Name", name || "");
    formData.append("Description", fullDescription);
    formData.append("aG9uZXlwb3Q", "");

    console.log("📤 Sending to Zoho WebToLeadForm:", {
      "Last Name": name,
      Email: email,
      Mobile: mobile,
      Company: "Medical Consultation",
    });

    const zohoResponse = await fetch(ZOHO_ACTION_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    });

    const responseText = await zohoResponse.text();
    console.log("📥 Zoho Response Status:", zohoResponse.status);
    console.log("📥 Zoho Response Text:", responseText.substring(0, 500));

    if (zohoResponse.ok || zohoResponse.status === 200) {
      console.log("✅ Success! Data submitted to Zoho CRM");
      return new Response(
        JSON.stringify({
          message: "Submission to Zoho CRM successful",
          status: zohoResponse.status,
          response: responseText.substring(0, 200),
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    } else {
      throw new Error(`Zoho CRM Error: ${zohoResponse.status} - ${responseText.substring(0, 200)}`);
    }
  } catch (error: any) {
    console.error("❌ Error:", error);
    return new Response(JSON.stringify({ message: "Error submitting to Zoho CRM", error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
