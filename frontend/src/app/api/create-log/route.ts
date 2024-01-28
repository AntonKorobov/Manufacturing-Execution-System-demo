export const revalidate = 0;

import { NextRequest, NextResponse } from 'next/server';

import { POST_OPERATION_LOG } from '@/graphQL/mutations';

export async function POST(req: NextRequest) {
  const body = await req.json();

  const {
    job_id,
    job_operation_qty_in,
    job_operation_qty_out,
    operation_id,
    updated_at,
  } = body.event.data.new;

  let newStatusId = body.event.data.new.job_operation_status_id;
  // const oldStatusId = body.event.data.old.job_operation_status_id;

  const bodyRequest = { query: '' };
  //Pressed START button
  if (newStatusId === 3) {
    bodyRequest.query = POST_OPERATION_LOG({
      jobId: job_id,
      logStartTime: updated_at,
      logEndTime: null,
      logQtyIn: job_operation_qty_in,
      logQtyOut: job_operation_qty_out,
      logStatus: newStatusId,
      operationId: operation_id,
    });
  }
  //Pressed STOP button
  if (newStatusId === 2) {
    if (job_operation_qty_out >= job_operation_qty_in) {
      newStatusId = 4;
    }
    bodyRequest.query = POST_OPERATION_LOG({
      jobId: job_id,
      logStartTime: null,
      logEndTime: updated_at,
      logQtyIn: job_operation_qty_in,
      logQtyOut: job_operation_qty_out,
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
      body: JSON.stringify({
        query: `mutation {insert_logs(objects: {job_id: 1, log_start_time: "2024-01-28T16:50:09.202787+00:00", log_end_time: null, log_qty_in: 2, log_qty_out: 1, log_status: 3, operation_id: 1}) { 
          returning {  
            log_status,
            log_end_time,
            log_start_time     
          }   
        }  
        }`,
      }),
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
