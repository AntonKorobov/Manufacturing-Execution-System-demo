export const revalidate = 0;

import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();

  return NextResponse.json(body.event.data.new, { status: 200 });
}

export async function GET() {
  return NextResponse.json({ message: `success` }, { status: 200 });
}
