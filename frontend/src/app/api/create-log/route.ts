export const revalidate = 0;

import { NextRequest, NextResponse } from 'next/server';

import { POST_OPERATION_LOG } from '@/graphQL/mutations';

import { createLogEventResponse } from './types';

export async function POST(req: NextRequest) {
  const body = await req.json();

  const { job_id, qty_in, qty_out, operation_id, updated_at } = body.event.data
    .new as createLogEventResponse;

  let newStatusId = body.event.data.new.job_operation_status_id;
  const bodyRequest = { query: '' };

  if (newStatusId === 3) {
    bodyRequest.query = POST_OPERATION_LOG({
      jobId: job_id,
      logStartTime: `"${updated_at}"`,
      logEndTime: null,
      logQtyIn: qty_in,
      logQtyOut: qty_out,
      logStatus: newStatusId,
      operationId: operation_id,
    });
  }
  if (newStatusId === 2) {
    if (qty_out >= qty_in) {
      newStatusId = 4;
    }
    bodyRequest.query = POST_OPERATION_LOG({
      jobId: job_id,
      logStartTime: null,
      logEndTime: `"${updated_at}"`,
      logQtyIn: qty_in,
      logQtyOut: qty_out,
      logStatus: newStatusId,
      operationId: operation_id,
    });
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

    if (response.errors) {
      return NextResponse.json(
        {
          message: `Can't get data from database`,
          error: response.errors,
          requestBody: bodyRequest,
        },
        { status: 500 }
      );
    } else
      return NextResponse.json(
        {
          message: 'log was created successfully',
          data: response,
          requestBody: bodyRequest.query,
        },
        { status: 200 }
      );
  } catch (error) {
    return NextResponse.json(
      { message: `Can't get data from database`, error },
      { status: 500 }
    );
  }
}
