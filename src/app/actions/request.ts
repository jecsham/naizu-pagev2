'use server';
export async function serverRequest(
  path: string,
  method: string = 'GET',
  body: any = null,
  next: RequestInit['next'] = {},
  cacheEnabled: boolean = true,
  headers: any = {}
) {
  let cache: any = 'force-cache';
  if (method !== 'GET' || !cacheEnabled) {
    cache = 'no-store';
  }

  const response = await fetch(process.env.NAIZU_SERVER_URL! + path, {
    method,
    next,
    headers: {
      'Content-Type': 'application/json',
      'X-Naizu-Api-Key': process.env.NAIZU_SERVER_API_KEY!,
      ...headers,
    },
    cache,
    body: body ? JSON.stringify(body) : null,
  });

  if (!response.ok) {
    if (response.status === 422) {
      return new Response(response.body, {
        status: 422,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    return Response.json({
      success: false,
      message: 'Error fetching data from naizu http server',
    });
  }

  return new Response(response.body);
}
