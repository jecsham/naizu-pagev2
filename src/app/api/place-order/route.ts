import { serverRequest } from '@/app/actions/request';

export async function POST(request: Request) {
  let { itemId, amount, playerUuid } = await request.json();

  if (!itemId || !amount || !playerUuid) {
    return new Response('Missing itemId or amount', { status: 400 });
  }

  // check if is valid uuid with dashes
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(playerUuid)) {
    return new Response('Invalid playerUuid', { status: 400 });
  }

  if (itemId == 'vip') {
    amount = 1;
  }

  if (itemId == 'custom') {
    if (!amount || isNaN(amount)) {
      return new Response('Invalid amount', { status: 400 });
    }
    if (amount < 1) {
      return new Response('Invalid amount', { status: 400 });
    }
  }
  // call my actual server
  const response = await serverRequest(
    '/api/place-order',
    'POST',
    {
      itemId,
      amount,
      playerUuid,
    },
    {},
    false
  );

  if (!response.ok) {
    return new Response('Error creating order', { status: 500 });
  }

  return response;
}
