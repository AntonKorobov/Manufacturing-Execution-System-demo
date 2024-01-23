export const revalidate = 0;

import { NextRequest, NextResponse } from 'next/server';
import { GET_JOBS_QUERY } from '@/graphQL/queries';

export async function GET(event: NextRequest) {
  const page = Number(event.nextUrl.searchParams.get('page'));

  try {
    const response = await fetch(process.env.HASURA_PROJECT_ENDPOINT as string, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET as string,
      },
      body: JSON.stringify({
        query: GET_JOBS_QUERY({ page, limit: 8 }),
      }),
    }).then((data) => data.json());

    if (response.error)
      return NextResponse.json(
        { message: `Can't get data from database`, error: response.error },
        { status: 500 }
      );
    else return NextResponse.json(response.data.jobs, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: `Can't get data from database`, error },
      { status: 500 }
    );
  }
}
