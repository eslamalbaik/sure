// server.js (النسخة النهائية بجد)
const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:8080" }));

// --- دي الـ Secrets الصح (اللي إنت لسه جايبها) ---
const ZOHO_CLIENT_ID = "1000.KEE1HEL7Z7I2KWLNF7G9RUWU78XE9Z";
const ZOHO_CLIENT_SECRET = "4726a91ba7f6650bceabbf4a17df3f0c74dfc29ea0";
const ZOHO_REFRESH_TOKEN = "1000.c6a44d679da3f43ccf9f9dcb2bc145cb.eeb59c8fa0e62628b12df65e3e79a713";

async function getZohoAccessToken() {
  const response = await fetch("https://accounts.zoho.com/oauth/v2/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: ZOHO_REFRESH_TOKEN,
      client_id: ZOHO_CLIENT_ID,
      client_secret: ZOHO_CLIENT_SECRET,
    }),
  });

  const contentType = response.headers.get("content-type");
  if (!response.ok || !contentType || !contentType.includes("application/json")) {
    const errorText = await response.text();
    console.error("Zoho Auth Error: Server returned HTML/Error page.");
    console.error("Raw Response:", errorText);
    throw new Error(`Zoho auth server returned an error (Status: ${response.status}). Refresh token likely expired.`);
  }

  const data = await response.json();
  if (data.error) throw new Error(`Zoho auth error: ${data.error}`);

  // --- ده التعديل الأول: هنرجع الأوبجكت كله ---
  return data;
}

// --- ده التعديل المهم ---
app.post("/submit-to-zoho", async (req, res) => {
  try {
    // 1. هنجيب الأوبجكت كله (اللي فيه الـ token والـ domain)
    const zohoAuth = await getZohoAccessToken();
    const accessToken = zohoAuth.access_token;
    const apiDomain = zohoAuth.api_domain; // "https://www.zohoapis.com"

    const dataFromReact = req.body.zohoData;
    const ZOHO_FORM_LINK_NAME = "medical";

    // --- ده التعديل التاني: استخدمنا الـ apiDomain الصح ---
    const zohoApiEndpoint = `${apiDomain}/forms/api/v2/forms/${ZOHO_FORM_LINK_NAME}/submissions`; // 2. هنبعتها لزوهو

    const zohoResponse = await fetch(zohoApiEndpoint, {
      method: "POST",
      headers: {
        Authorization: `Zoho-oauthtoken ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: dataFromReact }),
    });

    const zohoResult = await zohoResponse.json();

    if (zohoResult.code && zohoResult.code !== 3000) {
      // لو فيه إيرور، اطبعه
      console.error("Zoho API Data Error:", zohoResult);
      throw new Error(`Zoho API Error: ${zohoResult.message}`);
    }

    res.status(200).json({ message: "Submission to Zoho successful", zohoResult });
  } catch (error) {
    console.error("Full Error Trace:", error);
    res.status(500).json({ message: "Error submitting to Zoho", error: error.message });
  }
});
// --- نهاية التعديل ---

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Zoho Proxy Server running on http://localhost:${PORT}`);
});
