export const revalidate = 0;

import { NextRequest, NextResponse } from 'next/server';
import { PUT_STATION_STATUS } from '@/graphQL/mutations';

export async function PUT(req: NextRequest) {
  const id = Number(req.nextUrl.pathname.split('/').slice(-1)[0]);
  const { statusCode } = await req.json();

  try {
    const response = await fetch(process.env.HASURA_PROJECT_ENDPOINT as string, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET as string,
      },
      body: JSON.stringify({
        query: PUT_STATION_STATUS({ id, statusCode }),
      }),
    }).then((data) => data.json());

    if (response.error) {
      return NextResponse.json(
        { message: `Can't get data from database`, error: response.error },
        { status: 500 }
      );
    } else return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: `Can't get data from database`, error },
      { status: 500 }
    );
  }
}
