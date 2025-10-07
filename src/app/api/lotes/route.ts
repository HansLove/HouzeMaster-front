// import { NextResponse } from 'next/server';
// import { GoogleSpreadsheet } from 'google-spreadsheet';
// import { JWT } from 'google-auth-library';

// let cache: any = null;
// let cacheAt = 0;
// const TTL_MS = 5 * 60 * 1000;

// export async function GET() {
//   try {
//     if (cache && Date.now() - cacheAt < TTL_MS) {
//       return NextResponse.json(cache, { headers: { 'Cache-Control': 's-maxage=300' } });
//     }

//     const auth = new JWT({
//       email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL!,
//       key: process.env.GOOGLE_SERVICE_ACCOUNT_KEY!.replace(/\\n/g, '\n'),
//       scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly']
//     });

//     const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID!, auth);
//     await doc.loadInfo();

//     // Seleccionar la pestaña por GID (más robusto que por título)
//     const gid = Number(process.env.GOOGLE_SHEET_GID);
//     const sheet =
//       (gid && doc.sheetsById[gid]) ||
//       doc.sheetsByTitle['lots'] ||         // fallback si cambias de pestaña
//       doc.sheetsByIndex[0];

//     const rows = await sheet.getRows();

//     const lots = rows.map((r: any) => ({
//       id: Number(r.get('id')),
//       status: String(r.get('status') || 'available'),
//       area_m2: Number(r.get('area_m2') || 0),
//       price_m2_mxn: Number(r.get('price_m2_mxn') || 0),
//       price_total_mxn: Number(r.get('price_total_mxn') || 0),
//       price_total_usd: Number(r.get('price_total_usd') || 0),
//       section: String(r.get('section') || ''),
//       last_update: String(r.get('last_update') || '')
//     })).filter(x => Number.isFinite(x.id));

//     cache = { lots, updatedAt: new Date().toISOString(), sheetTitle: sheet.title, sheetId: sheet.sheetId };
//     cacheAt = Date.now();

//     return NextResponse.json(cache, { headers: { 'Cache-Control': 's-maxage=300, stale-while-revalidate=60' } });
//   } catch (err) {
//     console.error('Sheets error:', err);
//     return NextResponse.json({ error: 'Failed to load lots' }, { status: 500 });
//   }
// }








import { NextResponse } from 'next/server';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const required = ['GOOGLE_SERVICE_ACCOUNT_EMAIL','GOOGLE_SERVICE_ACCOUNT_KEY','GOOGLE_SHEET_ID'];
    const missing = required.filter(k => !process.env[k]);
    if (missing.length) throw new Error(`Missing env: ${missing.join(', ')}`);

    const key = process.env.GOOGLE_SERVICE_ACCOUNT_KEY!;
    if (!key.includes('BEGIN PRIVATE KEY')) throw new Error('Private key format invalid (missing BEGIN)');
    // Advertencia amistosa si no ve \n (suele romper la clave)
    if (!key.includes('\\n')) console.warn('WARN: private key has no \\n — check .env format');

    const auth = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL!,
      key: key.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID!, auth);
    await doc.loadInfo().catch((e:any) => {
      throw new Error(`loadInfo failed: ${e?.message || e}`);
    });

    const gid = Number(process.env.GOOGLE_SHEET_GID || 0);
    const sheet =
      (gid && doc.sheetsById[gid]) ||
      doc.sheetsByTitle['lots'] ||
      doc.sheetsByIndex[0];

    if (!sheet) throw new Error('Sheet not found (check GOOGLE_SHEET_GID or the tab title)');

    const rows = await sheet.getRows().catch((e:any) => {
      throw new Error(`getRows failed: ${e?.message || e}`);
    });

    const lots = rows.map((r:any) => ({
      id: Number(r.get('id')),
      status: String(r.get('status') || 'available'),
      area_m2: Number(r.get('area_m2') || 0),
      price_m2_mxn: Number(r.get('price_m2_mxn') || 0),
      price_total_mxn: Number(r.get('price_total_mxn') || 0),
      price_total_usd: Number(r.get('price_total_usd') || 0),
      section: String(r.get('section') || ''),
      last_update: String(r.get('last_update') || '')
    })).filter(x => Number.isFinite(x.id));

    return NextResponse.json({
      ok: true,
      sheetTitle: sheet.title,
      sheetId: sheet.sheetId,
      count: lots.length,
      lotsPreview: lots.slice(0, 5)
    });
  } catch (err:any) {
    return NextResponse.json({ ok: false, error: String(err?.message || err) }, { status: 500 });
  }
}
