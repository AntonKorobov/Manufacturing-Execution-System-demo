export const revalidate = 0;

import { NextRequest, NextResponse } from 'next/server';
import { GET_STATIONS_QUERY } from '@/graphQL/queries';

export async function GET(req: NextRequest) {
  const LIMIT_ELEMENTS_ON_PAGE = 8;
  const page = Number(req.nextUrl.searchParams.get('page'));

  try {
    const response = await fetch(process.env.HASURA_PROJECT_ENDPOINT as string, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET as string,
      },
      body: JSON.stringify({
        query: GET_STATIONS_QUERY({ page, limit: LIMIT_ELEMENTS_ON_PAGE }),
      }),
    }).then((data) => data.json());

    if (response.error)
      return NextResponse.json(
        { message: `Can't get data from database`, error: response.error },
        { status: 500 }
      );
    else return NextResponse.json(response.data.stations, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: `Can't get data from database`, error },
      { status: 500 }
    );
  }
}
