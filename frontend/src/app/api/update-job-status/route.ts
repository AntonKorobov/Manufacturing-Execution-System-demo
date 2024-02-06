export const revalidate = 0;

import { NextRequest, NextResponse } from 'next/server';

import { GET_JOB_OPERATIONS_STATUSES } from '@/graphQL/queries';
import { Operation, OperationStatuses } from '@/graphQL/types';
import { PUT_JOB_STATUS } from '@/graphQL/mutations';

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const { job_id } = body.event.data.new;

  try {
    const response = await getJobStations(job_id).then((operations) => {
      const newStatusCode = calculateStatusCode(operations);
      return postJobStatus({ jobId: job_id, statusCode: newStatusCode });
    });

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
    body: JSON.stringify({
      query: GET_JOB_OPERATIONS_STATUSES({ jobId: jobId }),
    }),
  }).then((data) => data.json());

  return response.data.job_operation;
}

async function postJobStatus({
  statusCode,
  jobId,
}: {
  statusCode: number;
  jobId: number;
}) {
  const response = await fetch(process.env.HASURA_PROJECT_ENDPOINT as string, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET as string,
    },
    body: JSON.stringify({
      query: PUT_JOB_STATUS({ id: jobId, statusCode: statusCode }),
    }),
  }).then((data) => data.json());

  return response;
}

function calculateStatusCode(operations: Operation[]) {
  const stats: { [key in OperationStatuses]?: number } = {};

  const statuses = operations.reduce((prev, curr) => {
    prev[curr.operation_status.operation_status_name] = 1;
    return prev;
  }, stats);

  if (OperationStatuses.IN_PROGRESS in statuses) return 3;
  if (OperationStatuses.QUEUED in statuses) return 2;
  if (OperationStatuses.FINISHED in statuses) return 4;

  return 1;
}
