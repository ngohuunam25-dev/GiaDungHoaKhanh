import { google } from "googleapis";

export async function appendOrderToSheet(row: (string | number)[]) {
  const auth = new google.auth.JWT({
    email: process.env.GOOGLE_CLIENT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEET_ID!,
    range: "Orders!A:H", // tên tab "Orders"
    valueInputOption: "USER_ENTERED",
    requestBody: { values: [row] },
  });
}
