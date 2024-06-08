import { NextRequest } from 'next/server';

interface Context {
  params: {
    id: string;
  };
}

export async function GET(_request: NextRequest, context: Context) {
  console.log(context.params.id);

  await new Promise((resolve) => setTimeout(() => resolve(''), 300));
  return Response.json({
    performance: {
      performance: 64,
      accessibility: 20,
      practices: 100,
      seo: 91,
    },
    metrics: { INP: 0, FCP: 550, LCP: 44600, TBT: 8450, CLS: 0.266 },
  });
}
