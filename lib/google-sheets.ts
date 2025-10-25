import { google } from 'googleapis';

interface StatsData {
  label: string;
  value: number;
  suffix: string;
}

export async function getStatsFromGoogleSheets(): Promise<StatsData[]> {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Sheet1!A2:C5', // Adjust range as needed
    });

    const rows = response.data.values;

    if (!rows || rows.length === 0) {
      throw new Error('No data found in Google Sheets');
    }

    return rows.map((row) => ({
      label: row[0] || '',
      value: parseFloat(row[1]) || 0,
      suffix: row[2] || '',
    }));
  } catch (error) {
    console.error('Error fetching Google Sheets data:', error);
    // Return fallback data
    return [
      { label: 'CO₂ Saved', value: 15240, suffix: ' tons' },
      { label: 'Storage Space Saved', value: 85, suffix: '%' },
      { label: 'Cost Savings Generated', value: 2.5, suffix: 'M $' },
      { label: 'Customers Served', value: 50, suffix: '+' }
    ];
  }
}