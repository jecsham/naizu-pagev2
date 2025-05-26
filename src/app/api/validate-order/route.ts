import { serverRequest } from '@/app/actions/request';

export async function POST(request: Request) {
  let { viewToken } = await request.json();

  if (!viewToken) {
    return Response.json({ success: false, message: 'Invalid viewToken' }, { status: 400 });
  }

  if (!/^[0-9a-f]{64}$/.test(viewToken)) {
    return Response.json({ success: false, message: 'Invalid viewToken' }, { status: 400 });
  }

  // call my actual server
  const response = await serverRequest(
    '/api/validate-order',
    'POST',
    {
      viewToken,
    },
    {},
    false
  );

  if (!response.ok) {
    // check if its 433
    if (response.status === 422) {
      return response;
    }
    return Response.json('Error creating order', { status: 500 });
  }

  return response;
}
