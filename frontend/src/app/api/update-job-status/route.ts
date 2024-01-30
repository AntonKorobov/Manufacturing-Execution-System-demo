export const revalidate = 0;

import { NextRequest, NextResponse } from 'next/server';

import { GET_JOB_OPERATIONS } from '@/graphQL/queries';
import { OperationStatuses, getJobOperationsResponse } from '@/graphQL/types';
import { PUT_JOB_STATUS } from '@/graphQL/mutations';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { job_id } = body.event.data.new;

  try {
    const response = getJobStations(job_id).then((data) => postJobStatus(data));

    if (response.errors) {
      return NextResponse.json(
        {
          message: `Can't get data from database`,
          error: response.errors,
        },
        { status: 500 }
      );
    } else
      return NextResponse.json(
        {
          message: 'Status has changed successfully',
          data: response,
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

async function getJobStations(jobId: number) {
  const response = await fetch(process.env.HASURA_PROJECT_ENDPOINT as string, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET as string,
    },
    body: JSON.stringify(GET_JOB_OPERATIONS({ jobId: jobId })), //fetch operations statuses
  }).then((data) => data.json());

  return response;
}

async function postJobStatus({
  operations,
  jobId,
}: {
  operations: getJobOperationsResponse;
  jobId: number;
}) {
  let newStatusCode = 4;

  for (let i = 0; i < operations.length; i++) {
    if (
      operations[i].operation_status.operation_status_name ===
      OperationStatuses.IN_PROGRESS
    ) {
      newStatusCode = 3;
      break;
    }
    if (
      operations[i].operation_status.operation_status_name === OperationStatuses.QUEUED
    ) {
      newStatusCode = 2;
      break;
    }
  }

  const response = await fetch(process.env.HASURA_PROJECT_ENDPOINT as string, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET as string,
    },
    body: JSON.stringify(PUT_JOB_STATUS({ id: jobId, statusCode: newStatusCode })),
  }).then((data) => data.json());

  return response;
}
