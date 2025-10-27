import { NextResponse } from 'next/server'
import { getStatsFromGoogleSheets } from '@/lib/google-sheets'

const REVALIDATE_SECONDS = Number(process.env.STATS_REVALIDATE_TIME) || 86400 // 24h

export async function GET() {
  try {
    const stats = await getStatsFromGoogleSheets()

    return NextResponse.json(
      { stats, lastUpdated: new Date().toISOString() },
      {
        headers: {
          'Cache-Control': `public, s-maxage=${REVALIDATE_SECONDS}, stale-while-revalidate=${REVALIDATE_SECONDS * 2}`,
        },
      }
    )
  } catch (error) {
    console.error('Error in stats API route:', error)
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 })
  }
}
