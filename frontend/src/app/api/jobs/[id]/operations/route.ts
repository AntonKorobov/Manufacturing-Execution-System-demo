export const revalidate = 0;

import { NextRequest, NextResponse } from 'next/server';
import { GET_JOB_OPERATIONS } from '@/graphQL/queries';

export async function GET(req: NextRequest) {
  const id = Number(req.nextUrl.pathname.split('/')[3]);

  try {
    const response = await fetch(process.env.HASURA_PROJECT_ENDPOINT as string, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET as string,
      },
      body: JSON.stringify({
        query: GET_JOB_OPERATIONS({ jobId: id }),
      }),
    }).then((data) => data.json());

    if (response.errors)
      return NextResponse.json(
        { message: `Can't get data from database`, error: response.errors },
        { status: 500 }
      );
    else return NextResponse.json(response.data.job_operation, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: `Can't get data from database`, error },
      { status: 500 }
    );
  }
}
