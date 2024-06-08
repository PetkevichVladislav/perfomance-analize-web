import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const data = await request.json();

  await new Promise((resolve) => setTimeout(() => resolve(data), 5000));
  return Response.json(data);
}
