import { revalidateTag } from 'next/cache';

export async function POST(request: Request) {
  let key = request.headers.get('x-Rev-Key');
  if (!key || key !== process.env.NAIZU_REV_KEY) {
    return new Response('Invalid key', { status: 401 });
  }

  // revalidate next tags
  revalidateTag('products');
  return Response.json({
    success: true,
    message: 'revalidate successfully... hopefully... or honeypot? >:)',
  });
}
