export const revalidate = 0;

import { NextRequest, NextResponse } from 'next/server';

import { POST_OPERATION_LOG } from '@/graphQL/mutations';
import { OperationStatuses } from '@/graphQL/types';

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
  
  try {
    const response = await fetch(process.env.HASURA_PROJECT_ENDPOINT as string, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET as string,
      },
      body: JSON.stringify(bodyRequest), //fetch operations statuses
    }).then((data) => data.json()).then((data) => {
      let status = OperationStatuses.FINISHED;

      data.forEach((item) = {
        if (item.status === OperationStatuses.IN_PROGRESS) {
          status = OperationStatuses.IN_PROGRESS //break
        } 
        if (item.status === OperationStatuses.QUEUED) {
          status = OperationStatuses.QUEUED //break
        } 
      })
      return status
    }).then((status) => {
      //update job_status
      fetch(process.env.HASURA_PROJECT_ENDPOINT as string, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET as string,
        },
        body: JSON.stringify(bodyRequest)})
    }).then()

  } catch (error) {
    return NextResponse.json(
      { message: `Can't get data from database`, error },
      { status: 500 }
    );
  }
}
