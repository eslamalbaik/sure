import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

async function getZohoAccessToken() {
  const ZOHO_CLIENT_ID = "1000.S2IMTRW1R3TUZ2VK2GYHGCSMCWD9CN";
  const ZOHO_CLIENT_SECRET = "86a6675006543af63597850f462996d85728485326";
  const ZOHO_REFRESH_TOKEN = "1000.0944ec97354197ca5ea96cc64a40ac8b.b761659b74107c3fa9c3d695673e3e2e";

  const response = await fetch("https://accounts.zoho.com/oauth/v2/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: ZOHO_REFRESH_TOKEN!,
      client_id: ZOHO_CLIENT_ID!,
      client_secret: ZOHO_CLIENT_SECRET!,
    }),
  });

  const data = await response.json();
  if (data.error) throw new Error(`Zoho auth error: ${data.error}`);
  return data.access_token;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const accessToken = await getZohoAccessToken();

    const { name, email, fileNumber, mobile, question, lastVisit, attachmentUrls } = await req.json();

    const ATTACHMENTS_FIELD_ALIAS = "AttachmentsLinks";
    const ZOHO_FORM_LINK_NAME = "medical";

    const zohoData = {
      Name: name,
      Email: email,
      FileNumber: fileNumber,
      Phone: mobile,
      LastVisit: lastVisit,
      Question: question,
      [ATTACHMENTS_FIELD_ALIAS]: attachmentUrls.join("\n"),
    };

    const zohoApiEndpoint = `https://forms.zoho.com/api/v2/forms/${ZOHO_FORM_LINK_NAME}/submissions`;

    const zohoResponse = await fetch(zohoApiEndpoint, {
      method: "POST",
      headers: {
        Authorization: `Zoho-oauthtoken ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: zohoData }),
    });

    const zohoResult = await zohoResponse.json();

    if (zohoResult.code && zohoResult.code !== 3000) {
      throw new Error(`Zoho API Error: ${zohoResult.message}`);
    }

    return new Response(JSON.stringify({ message: "Submission to Zoho successful", zohoResult }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ message: "Error submitting to Zoho", error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
