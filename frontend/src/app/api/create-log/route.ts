export const revalidate = 0;

import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest) {
  return NextResponse.json(req, { status: 200 });
}
