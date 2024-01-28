export const revalidate = 0;

import { NextRequest, NextResponse } from 'next/server';

import { POST_OPERATION_LOG } from '@/graphQL/mutations';

export async function POST(req: NextRequest) {
  const body = await req.json();

  const bodyRequest = {
    query: POST_OPERATION_LOG({
      jobId: 1,
      logDuration: 1,
      logStartTime: null,
      logEndTime: null,
      logQtyIn: 10,
      logQtyOut: 1,
      logStatus: 1,
      operation_id: 1,
    }),
  };

  try {
    const response = await fetch(process.env.HASURA_PROJECT_ENDPOINT as string, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET as string,
      },
      body: JSON.stringify(bodyRequest),
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
