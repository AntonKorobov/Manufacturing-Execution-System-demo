export const revalidate = 0;

import { NextRequest, NextResponse } from 'next/server';

import { POST_OPERATION_LOG } from '@/graphQL/mutations';

export async function POST(req: NextRequest) {
  const body = await req.json();

  const {
    job_id,
    job_operation_duration,
    job_operation_qty_out,
    job_operation_status_id,
    operation_id,
  } = body.event.data.new;

  const bodyRequest = {
    query: POST_OPERATION_LOG({
      jobId: job_id,
      logDuration: 0, //last timestamp - current
      logStartTime: null,
      logEndTime: null,
      logQtyIn: 0,
      logQtyOut: job_operation_qty_out,
      logStatus: job_operation_status_id,
      operationId: operation_id,
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
    } else
      return NextResponse.json(
        { message: 'log was created successfully' },
        { status: 200 }
      );
  } catch (error) {
    return NextResponse.json(
      { message: `Can't get data from database`, error },
      { status: 500 }
    );
  }
}
