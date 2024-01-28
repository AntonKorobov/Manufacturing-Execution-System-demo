export const revalidate = 0;

import { NextRequest, NextResponse } from 'next/server';
import { PUT_JOB_OPERATION_QTY_OUT, PUT_JOB_OPERATION_STATUS } from '@/graphQL/mutations';

export async function PUT(req: NextRequest) {
  const id = Number(req.nextUrl.pathname.split('/').slice(-1)[0]);
  const body = await req.json();

  //TODO
  const bodyRequest = { query: '' };
  if (body.qty !== undefined) {
    bodyRequest.query = PUT_JOB_OPERATION_QTY_OUT({ id, qty: body.qty });
  }
  if (body.statusCode !== undefined) {
    bodyRequest.query = PUT_JOB_OPERATION_STATUS({ id, statusCode: body.statusCode });
  }

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
