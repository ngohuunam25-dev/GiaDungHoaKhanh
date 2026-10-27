// Không import googleapis

async function getGoogleAccessToken(clientEmail: string, privateKey: string) {
  const header = { alg: "RS256", typ: "JWT" };
  const now = Math.floor(Date.now() / 1000);
  const claimSet = {
    iss: clientEmail,
    scope: "https://www.googleapis.com/auth/spreadsheets",
    aud: "https://oauth2.googleapis.com/token",
    exp: now + 3600,
    iat: now,
  };

  const base64UrlEncode = (str: string) =>
    btoa(str).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");

  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedClaimSet = base64UrlEncode(JSON.stringify(claimSet));
  const tokenToSign = `${encodedHeader}.${encodedClaimSet}`;

  // Import Private Key bằng Web Crypto API (Tương thích 100% với Cloudflare Workers)
  const pemHeader = "-----BEGIN PRIVATE KEY-----";
  const pemFooter = "-----END PRIVATE KEY-----";
  const pemContents = privateKey
    .replace(pemHeader, "")
    .replace(pemFooter, "")
    .replace(/\s/g, "");

  const binaryDerString = atob(pemContents);
  const binaryDer = new Uint8Array(binaryDerString.length);
  for (let i = 0; i < binaryDerString.length; i++) {
    binaryDer[i] = binaryDerString.charCodeAt(i);
  }

  const key = await crypto.subtle.importKey(
    "pkcs8",
    binaryDer.buffer,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"],
  );

  const signature = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    key,
    new TextEncoder().encode(tokenToSign),
  );

  const encodedSignature = base64UrlEncode(
    String.fromCharCode(...new Uint8Array(signature)),
  );

  const jwt = `${tokenToSign}.${encodedSignature}`;

  // Gọi lấy Access Token từ Google OAuth2 Endpoint
  const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });

  if (!tokenResponse.ok) {
    const errorText = await tokenResponse.text();
    throw new Error(`Lỗi lấy Token Google: ${errorText}`);
  }

  const tokenData = (await tokenResponse.json()) as { access_token: string };
  return tokenData.access_token;
}

export async function appendOrderToSheet(row: (string | number)[]) {
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
  let privateKey = process.env.GOOGLE_PRIVATE_KEY;
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;

  if (!clientEmail || !privateKey || !spreadsheetId) {
    throw new Error("Thiếu biến môi trường Google Sheets API");
  }

  // Xử lý xuống dòng trong Private Key từ Cloudflare Environment Variables
  privateKey = privateKey.replace(/\\n/g, "\n");

  // 1. Lấy Access Token
  const accessToken = await getGoogleAccessToken(clientEmail, privateKey);

  // 2. Gọi Google Sheets REST API v4
  const range = "Orders!A:H";
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(
    range,
  )}:append?valueInputOption=USER_ENTERED`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      values: [row],
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error("Google Sheets API Error Details:", errorBody);
    throw new Error(`Google Sheets Append thất bại: ${response.statusText}`);
  }

  return await response.json();
}
