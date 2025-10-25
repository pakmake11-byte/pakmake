import { NextResponse } from 'next/server';
import { getStatsFromGoogleSheets } from '@/lib/google-sheets';

export const revalidate = Number(process.env.STATS_REVALIDATE_TIME) || 86400; // 24 hours

export async function GET() {
  try {
    const stats = await getStatsFromGoogleSheets();
    
    return NextResponse.json(
      { stats, lastUpdated: new Date().toISOString() },
      {
        headers: {
          'Cache-Control': `public, s-maxage=${revalidate}, stale-while-revalidate=${revalidate * 2}`,
        },
      }
    );
  } catch (error) {
    console.error('Error in stats API route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}