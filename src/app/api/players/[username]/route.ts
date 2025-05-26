import { serverRequest } from '@/app/actions/request';

export const revalidate = 10;

function isValidMinecraftName(name: string): boolean {
  const regex = /^[a-zA-Z0-9_]{1,16}$/;
  return regex.test(name);
}

export async function GET(request: Request, { params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;

  if (!username) {
    return Response.json({ success: false });
  }

  if (!isValidMinecraftName(username)) {
    return Response.json({ success: false });
  }

  const response = await serverRequest(`/api/players/${username}`, 'GET', null, {}, false);
  return response;
}
